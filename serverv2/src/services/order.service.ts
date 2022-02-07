import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CloseOrderInput,
  CreateOrderInput,
  UpdateOrderInput,
} from 'src/graphql/inputs/order.input';
import {
  OrderResponse,
  PendingOrdersResponse,
} from '../graphql/responses/order.response';
import {
  CustomerType,
  OrderObjectParams,
  ShippingAddress,
} from 'src/interfaces/order.interface';
import { Order, OrderDocument, Product } from 'src/mongo/schemas/order.model';
import { PaymentService } from './payment.service';
import { ShopifyService } from './shopify.service';
import { CustomerService } from './customer.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly shopify: ShopifyService,
    private readonly paymentService: PaymentService,
    private readonly customerService: CustomerService,
  ) {}

  async loadPendingOrders(): Promise<PendingOrdersResponse> {
    try {
      const foundOrders = await this.orderModel.find();

      const pendingOrders = [...foundOrders].filter((order: Order) => {
        return order.status === 'pending';
      });

      return {
        message: 'Found pending orders',
        success: true,
        Orders: pendingOrders,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async loadOrder(id: string): Promise<OrderResponse> {
    try {
      const foundOrder = await this.orderModel.findById(id);

      return { message: 'Located order', success: true, Order: foundOrder };
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  calculateOrderTotal(prices: number[]): number {
    return Number(
      prices
        .reduce((accumulator, nextNum) => accumulator + nextNum, 0)
        .toFixed(2),
    );
  }

  async createOrder(input: CreateOrderInput): Promise<OrderResponse> {
    try {
      const {
        firstName,
        lastName,
        email,
        products,
        creditCardNumber,
        expiry,
        cvc,
      } = input;

      if (products.length === 0) {
        throw new Error('Must have products in order to purchase?');
      }

      //handle errors for incoming input
      for (let inputElement in input) {
        if (!input[inputElement]) {
          throw new Error(`A ${inputElement} is required`);
        }
      }

      ///////////////////////////////////////////////////////////////////////
      const productPrices = products.map((product: Product) => product.price);

      const orderTotal = this.calculateOrderTotal(productPrices);
      ///////////////////////////////////////////////////////////

      const detectASubscriptionItem =
        [...products].filter((product: Product) => product.isRecurring).length >
        0;

      console.log('is there a subscription item?', detectASubscriptionItem);

      //pass to nmi payment gateway service for transaction
      const paymentRequest = await this.paymentService.authSale({
        creditCardNumber,
        cvv: cvc,
        expiry,
        firstName,
        lastName,
        amount: orderTotal,
        containsRecurringItem: detectASubscriptionItem,
      });
      if (paymentRequest.statusMessage !== 'SUCCESS') {
        throw new Error(paymentRequest.responseObject);
      }

      const orderStartTime = new Date().toString();

      const newOrder = new this.orderModel({
        ...input,
        transactionId: paymentRequest.transactionId,
        orderStartTime: orderStartTime,
      });

      await newOrder.save();

      await this.customerService.createCustomer({
        firstName,
        lastName,
        email,
        order: newOrder,
      });

      return {
        message: 'Transaction processed',
        success: true,
        Order: newOrder,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async updateOrder(
    updateOrderInput: UpdateOrderInput,
  ): Promise<OrderResponse> {
    try {
      const { product, orderId } = updateOrderInput;

      //Step 1 find order in db
      const foundOrder = await this.orderModel.findById(orderId);

      if (!foundOrder) throw new Error('Could not locate a current order');

      //add new product to current product array
      const currentProductPrices = [...foundOrder.products, product].map(
        (product: Product) => product.price,
      );

      //Step 2 update transaction amount
      const newOrderTotal = this.calculateOrderTotal(currentProductPrices);
      //now add product to db
      foundOrder.products = [...foundOrder.products, product];

      foundOrder.orderTotal = newOrderTotal;
      //save in order to get current product total
      await foundOrder.save();

      console.log('updated order', foundOrder.products);
      //step 3 update transaction auth amount in payment gatewat
      const updateTransaction = await this.paymentService.updateTransaction({
        updatedOrderTotal: newOrderTotal,
        transactionId: Number(foundOrder.transactionId),
      });

      if (!updateTransaction.newTransactionId)
        throw new Error('Transaction id does not exist');
      //the new transaction auth returns a new transactionid
      foundOrder.transactionId = updateTransaction.newTransactionId;
      //save the transaction id to the db
      await foundOrder.save();

      console.log('updated transaction', updateTransaction);

      return { message: 'Hello', success: true, Order: foundOrder };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async closeOrder(closeOrderInput: CloseOrderInput): Promise<OrderResponse> {
    try {
      const { orderId } = closeOrderInput;

      const foundOrder = await this.orderModel.findById(orderId);

      if (!foundOrder) throw new Error('Could not locate an order');

      //return products selected as formatted shopify line items
      const lineItems = await this.shopify.getProducts(foundOrder.products);

      const {
        firstName,
        lastName,
        city,
        address,
        email,
        state,
        zip,
        orderTotal,
      } = foundOrder;

      //Create shopify specific order objects
      const customer: CustomerType = {
        first_name: firstName,
        last_name: lastName,
        email,
      };
      //Create shopify specific order objects
      const shipping_address: ShippingAddress = {
        address1: address,
        address2: '',
        city,
        country: 'United States',
        country_code: 'US',
        country_name: 'United States',
        company: '',
        first_name: firstName,
        last_name: lastName,
        name: firstName + ' ' + lastName,
        phone: '',
        province: state,
        province_code: '',
        zip,
      };
      //Create shopify specific order objects
      const orderObject: OrderObjectParams = {
        customer,
        shipping_address,
        billing_address: shipping_address,
        total_tax: 0,
        financial_status: 'paid',
        tax_lines: [{ price: 0, rate: 'n/a', title: 'Tax' }],
        transactions: [
          {
            kind: 'sale',
            status: 'success',
            amount: orderTotal,
          },
        ],
        line_items: lineItems,
        note_attributes: [{ name: 'Test Order', value: firstName + lastName }],
      };

      const shopifyOrder = await this.shopify.createOrder(orderObject);

      if (shopifyOrder) {
        foundOrder.shopifyOrderId = shopifyOrder.id;
        foundOrder.status = 'closed';
      }

      const closePaymentRequest = await this.paymentService.captureSale(
        Number(foundOrder.transactionId),
      );

      console.log('payment capture response', closePaymentRequest);
      if (closePaymentRequest.statusMessage !== 'SUCCESS')
        throw new Error('Error capturing transaction');

      foundOrder.status = 'closed';

      await foundOrder.save();

      return {
        message: 'Payment captured successfully',
        success: true,
        Order: foundOrder,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
