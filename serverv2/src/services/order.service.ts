import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CloseOrderInput,
  CreateOrderInput,
  UpdateOrderInput,
} from 'src/graphql/inputs/order.input';
import { OrderResponse } from '../graphql/responses/order.response';
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

  async test({ req, res }) {
    return this.shopify.testGraphql({ req, res });
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
        address,
        city,
        products,
        state,
        zip,
        creditCardNumber,
        expiry,
        cvc,
      } = input;

      console.log('input', input);

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

      //return products selected as formatted shopify line items
      const lineItems = await this.shopify.getProducts(products);

      console.log('is there a subscription item?', detectASubscriptionItem);

      const customer: CustomerType = {
        first_name: firstName,
        last_name: lastName,
        email,
      };

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

      const orderObject: OrderObjectParams = {
        customer,
        shipping_address,
        billing_address: shipping_address,
        total_tax: 0,
        financial_status: 'pending',
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

      // console.log('payment request', paymentRequest);
      if (paymentRequest.statusMessage !== 'SUCCESS') {
        throw new Error(paymentRequest.responseObject);
      }

      //create order in shopify if payment is successful
      const newShopifyOrder = await this.shopify.createOrder(orderObject);

      console.log('new Shopify order', newShopifyOrder);

      const orderStartTime = new Date().toString();

      const newOrder = new this.orderModel({
        ...input,
        shopifyOrderId: newShopifyOrder.id,
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

      //TODO update shopiify order
      //step 4 get order in shopify and then update
      const orderToUpdateInShopify = await this.shopify.updatePendingOrder({
        order_id: foundOrder.shopifyOrderId,
        products: [...foundOrder.products],
      });

      console.log(
        'updated transaction',
        updateTransaction,
        orderToUpdateInShopify,
      );

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

      const closePaymentRequest = await this.paymentService.captureSale(
        Number(foundOrder.transactionId),
      );

      console.log('payment capture response', closePaymentRequest);
      if (closePaymentRequest.statusMessage !== 'SUCCESS')
        throw new Error('Error capturing transaction');

      foundOrder.status = 'closed';

      await foundOrder.save();
      //TODO need to update and close out shopify order as well to proceed with fulfillment

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
