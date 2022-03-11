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
  StickyAuthResponse,
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
import axios from 'axios';
import states from 'src/reusable/states';
import { config } from 'dotenv';

config();

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly shopify: ShopifyService,
    private readonly paymentService: PaymentService,
    private readonly customerService: CustomerService,
  ) {}

  async getStickyIOCredentials(): Promise<StickyAuthResponse> {
    try {
      const authRequest = await axios({
        method: 'post',
        url: 'https://popbrands.sticky.io/api/v1/validate_credentials',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Basic ' +
            Buffer.from(
              process.env.STICKY_USERNAME + ':' + process.env.STICKY_PASSWORD,
            ).toString('base64'),
        },
      });

      if (!authRequest.data.response_code)
        throw new Error('Not a successful response');
      console.log('auth request', authRequest.data?.response_code);

      if (authRequest.data?.response_code !== '100')
        throw new Error('Not a successful request');

      return {
        message: 'Valid credentials',
        success: true,
        auth: authRequest.data.response_code,
      };
    } catch (error) {
      console.error('ERROR', error);
      return {
        message: 'Invalid credentials',
        success: false,
        auth: null,
      };
    }
  }

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
        sticky_campaign_id,
        sticky_shipping_id,
        creditCardType,
        affiliate_data,
      } = input;

      console.log('affiliate data?', JSON.parse(affiliate_data));

      const affiliateDataFormatted: {
        AFFID: string;
        C1: string;
        C2: string;
        C3: string;
      } = {
        AFFID: 'AFFID',
        C1: 'C1',
        C2: 'C2',
        C3: 'C3',
      };
      if (affiliate_data) {
        const affData = JSON.parse(affiliate_data);
        if (affData.affiliate_id)
          affiliateDataFormatted.AFFID = affData.affiliate_id;
        if (affData.sub1) affiliateDataFormatted.C1 = affData.sub1;
        if (affData.sub2) affiliateDataFormatted.C2 = affData.sub2;
        if (affData.sub3) affiliateDataFormatted.C3 = affData.sub3;
      }

      if (products.length === 0) {
        throw new Error('Must have products in order to purchase?');
      }

      //handle errors for incoming input
      for (let inputElement in input) {
        if (!input[inputElement]) {
          throw new Error(`A ${inputElement} is required`);
        }
      }

      const orderStartTime = new Date().toString();

      //stickyio requires, 2 character length state code
      const stateAbbr = await this.matchAddressStateWithCode(state);

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

          //send the order to shopify
          await this.closeOrder({ orderId: newPaypalOrder._id.toString() });

          return {
            message: 'Paypal Order Created',
            success: true,
            Order: newPaypalOrder,
          };
        case 'credit':
          //pass to stickyio order request endpoint
          const paymentRequest = await this.paymentService.authSale({
            ...input,
            creditCardNumber,
            cvc,
            expiry,
            firstName,
            lastName,
            email,
            city,
            state: stateAbbr || state,
            zip,
            address,
            sticky_campaign_id,
            sticky_shipping_id,
            products,
            creditCardType,
            affiliate_data: JSON.stringify(affiliateDataFormatted),
          });

          if (paymentRequest.statusMessage !== 'SUCCESS')
            throw new Error(paymentRequest.statusMessage);

          //create order in database
          const newOrder = new this.orderModel({
            ...input,
            orderType: 'credit',
            transactionId: paymentRequest.transactionId,
            orderStartTime: orderStartTime,
            ef_aff_id: ef_aff_id ? ef_aff_id : 'non-ef-order',
            paypal_transaction_id: paypal_transaction_id
              ? paypal_transaction_id
              : 'non-paypal-transaction',
            status: 'closed',
            sticky_order_id: paymentRequest.sticky_order_id,
            sticky_campaign_id,
            sticky_shipping_id,
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
      return {
        message: 'test',
        success: true,
        Order: null,
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

      //order types so far are paypal and credit
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
          //new product to be added to order
          const upsellProduct: {
            offer_id: number;
            product_id: number;
            billing_model_id: number;
            quantity: number;
            variant:
              | [
                  {
                    attribute_name: string;
                    attribute_value: string;
                  },
                ]
              | undefined;
          } = {
            offer_id: product.sticky_offer_id,
            product_id: product.sticky_product_id,
            billing_model_id: product.sticky_billing_model_id,
            quantity: product.sticky_quantity,
            variant: !product.sticky_variant_object
              ? undefined
              : [product.sticky_variant_object],
          };

          const data = JSON.stringify({
            previousOrderId: foundOrder.sticky_order_id,
            campaignId: foundOrder.sticky_campaign_id,
            shippingId: foundOrder.sticky_shipping_id,
            ipAddress: '198.4.3.2',
            offers: [upsellProduct],
            notes: 'This is a test order using new_upsell',
            AFID: 'AFID',
            SID: 'SID',
            AFFID: 'AFFID',
            C1: 'C1',
            C2: 'C2',
            C3: 'C3',
            AID: 'AID',
            OPT: 'OPT',
            utm_source: 'source',
            utm_medium: 'medium',
            utm_campaign: 'campaign',
            utm_content: 'content',
            utm_term: 'term',
          });

          console.log('data!', data);

          const updateOrderInSticky = await axios({
            method: 'POST',
            url: 'https://popbrands.sticky.io/api/v1/new_upsell',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${Buffer.from(
                process.env.STICKY_USERNAME + ':' + process.env.STICKY_PASSWORD,
              ).toString('base64')}`,
            },
            data: data,
          });

          console.log('updated order', updateOrderInSticky.data);

          if (updateOrderInSticky.data.provider_response_code !== '100') {
            throw new Error(updateOrderInSticky.data.decline_reason);
          }

          //add new product to current product array for order db
          const currentProductPrices = [...foundOrder.products, product].map(
            (product: Product) => product.price,
          );

          //Step 2 update transaction amount in db
          const newOrderTotal = this.calculateOrderTotal(currentProductPrices);
          //now add product to db
          foundOrder.products = [...foundOrder.products, product];

          foundOrder.orderTotal = newOrderTotal;
          //save in order to get current product total
          await foundOrder.save();

          return {
            message: 'Updated an order ',
            success: true,
            Order: foundOrder,
          };
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  //THIS ROUTE IS DEPRECATED
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

  //sticky requires state codes instead of full state names
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
