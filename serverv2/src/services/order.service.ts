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
import states from 'src/reusable/states';

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
      console.log('order id', id);
      const foundOrder = await this.orderModel.findById(id);

      if (!foundOrder) {
        return {
          message: 'Could not locate an order',
          success: false,
          Order: null,
        };
      }
      return { message: 'Located order', success: true, Order: foundOrder };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async findOrderFromShopifyId(shopifyOrderId: string): Promise<OrderResponse> {
    try {
      const foundOrder = await this.orderModel.findOne({ shopifyOrderId });

      if (!foundOrder) {
        return {
          message: 'No shopify order found',
          success: true,
          Order: null,
        };
      }
      return {
        message: 'Found a shopify order',
        success: true,
        Order: foundOrder,
      };
    } catch (error) {
      console.error(error);
      return {
        message: error,
        success: true,
        Order: null,
      };
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
        ef_aff_id,
        paypal_transaction_id,
        orderType,
        paypal_payer_id,
        city,
        state,
        address,
        zip,
      } = input;

      if (products.length === 0) {
        throw new Error('Must have products in order to purchase?');
      }

      const lazyValidateEmail = new RegExp(/@/, 'g');

      if (!email.match(lazyValidateEmail))
        throw new Error('Please enter a valid email address');

      //handle errors for incoming input
      for (let inputElement in input) {
        if (!input[inputElement]) {
          throw new Error(`A ${inputElement} is required`);
        }
      }
      console.log('paypal transataction dsifsf', paypal_transaction_id);
      ///////////////////////////////////////////////////////////////////////
      const productPrices = products.map((product: Product) => product.price);

      const orderTotal = this.calculateOrderTotal(productPrices);
      ///////////////////////////////////////////////////////////

      const detectASubscriptionItem =
        [...products].filter((product: Product) => product.isRecurring).length >
        0;

      const orderStartTime = new Date().toString();

      //NOTE: must create new orders in shopify for each paypal payment
      switch (orderType) {
        case 'paypal':
          console.log('paypal order');
          //create a new order for every paypal order, each oto is a new order
          const newPaypalOrder = new this.orderModel({
            ...input,
            transactionId: 'paypal-order',
            orderStartTime: orderStartTime,
            ef_aff_id: ef_aff_id ? ef_aff_id : 'non-ef-order',
            paypal_transaction_id: paypal_transaction_id
              ? paypal_transaction_id
              : 'non-paypal-transaction',
            orderType: 'paypal',
          });

          await newPaypalOrder.save();
          //add the order to customer if it exists
          await this.customerService.createCustomer({
            firstName,
            lastName,
            email,
            order: newPaypalOrder,
          });
          //if order contains a sub create it in paypal
          if (detectASubscriptionItem) {
            await this.paymentService.addSubscriptionToPurchase({
              ...input,
              paypal_payer_id,
            });
          }
          //send the order to shopify
          await this.closeOrder({ orderId: newPaypalOrder._id.toString() });

          return {
            message: 'Paypal Order Created',
            success: true,
            Order: newPaypalOrder,
          };
        case 'credit':
          console.log('nmi payment');
          //pass to nmi payment gateway service for transaction
          const paymentRequest = await this.paymentService.authSale({
            creditCardNumber,
            cvv: cvc,
            expiry,
            firstName,
            lastName,
            amount: orderTotal,
            email,
            containsRecurringItem: detectASubscriptionItem,
            city,
            state,
            zip,
            address,
          });
          console.log('payment request', paymentRequest);
          if (paymentRequest.statusMessage !== 'SUCCESS') {
            throw new Error(paymentRequest.responseObject);
          }

          const newOrder = new this.orderModel({
            ...input,
            orderType: 'credit',
            transactionId: paymentRequest.transactionId,
            orderStartTime: orderStartTime,
            ef_aff_id: ef_aff_id ? ef_aff_id : 'non-ef-order',
            paypal_transaction_id: paypal_transaction_id
              ? paypal_transaction_id
              : 'non-paypal-transaction',
          });

          await newOrder.save();

          await this.customerService.createCustomer({
            firstName,
            lastName,
            email,
            order: newOrder,
          });

          return {
            message: 'Credit card transaction processed',
            success: true,
            Order: newOrder,
          };
        default:
          return {
            message: 'Could not create an order',
            success: false,
            Order: null,
          };
      }
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

      //for paypal, look for previous order to indicate next order will also be a paypal order
      //Step 1 find order in db
      const foundOrder = await this.orderModel.findById(orderId);

      if (!foundOrder) throw new Error('Could not locate a current order');

      //multiple payment gateway options
      switch (foundOrder.orderType) {
        case 'paypal':
          //Need to create a whole new order object for dumb paypal
          console.log('creating a new paypal order');

          //need to authorize new order for paypal
          const paypalPaymentRequest =
            await this.paymentService.createNewPaypalOrder({
              paypal_order_id: foundOrder.paypal_transaction_id,
              itemAmount: product.price,
            });
          //create new order in db

          if (!paypalPaymentRequest.success) {
            throw new Error('Paypal order creation unsuccessful');
          }

          //then save the updated order in db
          return {
            message: 'Updated paypal order',
            success: true,
            Order: foundOrder,
          };
        case 'credit':
          //if order exceeds time limit, prevent updating a closed order.
          //This is a temporary fix, possibly create new order instead?
          if (foundOrder.status === 'closed')
            throw new Error('Can not update a closed order');

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
          const updateTransaction = await this.paymentService.updateTransaction(
            {
              updatedOrderTotal: newOrderTotal,
              transactionId: Number(foundOrder.transactionId),
            },
          );

          if (!updateTransaction.newTransactionId)
            throw new Error('Transaction id does not exist');
          //the new transaction auth returns a new transactionid
          foundOrder.transactionId = updateTransaction.newTransactionId;
          //save the transaction id to the db
          await foundOrder.save();

          console.log('updated transaction', updateTransaction);

          return {
            message: 'Updated a credit transaction',
            success: true,
            Order: foundOrder,
          };
      }
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

      if (foundOrder.status === 'closed')
        throw new Error('Order has already been closed');

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

      console.log('found order', foundOrder.orderType, foundOrder);

      const provinceCode = await this.matchAddressStateWithCode(state);

      console.log('province cocde', provinceCode);

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
        province_code: provinceCode || '',
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
        note_attributes: [
          { name: foundOrder.funnel_name, value: firstName + lastName },
        ],
        tags: [foundOrder.funnel_name, foundOrder.orderType],
      };

      switch (foundOrder.orderType) {
        case 'paypal':
          const newShopifyPaypalOrder = await this.shopify.createOrder(
            orderObject,
          );

          if (!newShopifyPaypalOrder)
            throw new Error('Could not create an order in shopify');

          if (newShopifyPaypalOrder) {
            foundOrder.shopifyOrderId = newShopifyPaypalOrder.id;
            foundOrder.status = 'closed';
            await foundOrder.save();
          }

          return {
            message: 'Payment captured successfully',
            success: true,
            Order: foundOrder,
          };
        case 'credit':
          const closePaymentRequest = await this.paymentService.captureSale(
            Number(foundOrder.transactionId),
          );
          console.log('payment capture response', closePaymentRequest);
          if (closePaymentRequest.statusMessage !== 'SUCCESS')
            throw new Error('Error capturing transaction');

          const shopifyOrder = await this.shopify.createOrder(orderObject);

          if (shopifyOrder) {
            foundOrder.shopifyOrderId = shopifyOrder.id;
            foundOrder.status = 'closed';
          }

          foundOrder.status = 'closed';

          await foundOrder.save();
          return {
            message: 'Payment captured successfully',
            success: true,
            Order: foundOrder,
          };
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async manuallyCloseOrder(
    closeOrderInput: CloseOrderInput,
  ): Promise<OrderResponse> {
    try {
      const { orderId } = closeOrderInput;

      const foundOrder = await this.orderModel.findById(orderId);

      if (!foundOrder) throw new Error('Could not locate an order');

      if (foundOrder.status === 'closed')
        throw new Error('Order has already been closed');

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

      console.log('found order', foundOrder.orderType, foundOrder);

      const provinceCode = await this.matchAddressStateWithCode(state);

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
        province_code: provinceCode || '',
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
        note_attributes: [
          { name: foundOrder.funnel_name, value: firstName + lastName },
        ],
        tags: [foundOrder.funnel_name, foundOrder.orderType],
      };

      const shopifyOrder = await this.shopify.createOrder(orderObject);

      if (shopifyOrder) {
        foundOrder.shopifyOrderId = shopifyOrder.id;
        foundOrder.status = 'closed';
      }

      foundOrder.status = 'closed';

      await foundOrder.save();
      return {
        message: 'Order closed manually',
        success: true,
        Order: foundOrder,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async matchAddressStateWithCode(stateAddress: string) {
    return states
      .map((stateObj: { name: string; abbreviation: string }) =>
        stateObj.name.toLowerCase() === stateAddress.toLowerCase() ||
        stateObj.abbreviation.toLowerCase() === stateAddress.toLowerCase()
          ? stateObj.abbreviation
          : false,
      )
      .filter(Boolean)[0];
  }
}
