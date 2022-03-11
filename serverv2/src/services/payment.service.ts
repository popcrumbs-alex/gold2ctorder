import { Inject, Injectable } from '@nestjs/common';
import {
  PaymentSaleOptions,
  RecurringPaymentOptions,
} from 'src/interfaces/payment.interface';
import axios from 'axios';
import { config } from 'dotenv';
import {
  AddSubscriptionInput,
  CreatePaypalProductInput,
  GetPaypalProductInput,
  RefundCreditTransactionInput,
  RefundPaypalTransactionInput,
  UpdatePaypalOrderInput,
  UpdateTransactionInput,
} from 'src/graphql/inputs/payment.input';
import {
  AddSubscriptionResponse,
  CreatePaypalProductResponse,
  GetPaypalProductResponse,
  PaypalOrderUpdateResponse,
  RefundCreditTransactionResponse,
  RefundPaypalTransactionResponse,
} from 'src/graphql/responses/payment.response';
import { CreateOrderInput, ProductInput } from 'src/graphql/inputs/order.input';

config();

@Injectable()
export class PaymentService {
  constructor(@Inject('PAYMENT') private readonly nmiAPIString) {}

  async getApiString() {
    return this.nmiAPIString;
  }

  formatPaymentGatewayResponse(response: string) {
    const removeEqualSigns = response.replace(/=/g, ':');
    const removeAmpersands = removeEqualSigns.split('&');
    //place keys and values into new object
    const responseObject = {};

    removeAmpersands.forEach((responsePiece: string) => {
      let splitByColon = responsePiece.split(':');
      if (splitByColon[0])
        responseObject[splitByColon[0]] = splitByColon[1] || null;
    });
    return responseObject;
  }

  retrieveTenDaysFromCurrentTime() {
    const newDate = new Date();
    const daysToAdd = 10;
    const tenDaysFromNow = newDate.setDate(newDate.getDate() + daysToAdd);
    const tenDaysFromNowObject = new Date(tenDaysFromNow);
    const formattedDate = `${tenDaysFromNowObject.getFullYear()}${
      tenDaysFromNowObject.getMonth() + 1 < 10
        ? '0' + (tenDaysFromNowObject.getMonth() + 1)
        : tenDaysFromNowObject.getMonth() + 1
    }${
      tenDaysFromNowObject.getDate() < 10
        ? '0' + tenDaysFromNowObject.getDate()
        : tenDaysFromNowObject.getDate()
    }`;
    return formattedDate;
  }

  async handleRecurringItem(saleInput: RecurringPaymentOptions) {
    const { firstName, lastName, sourceTransactionId } = saleInput;

    try {
      //trial period for recurring is 10 days from current time
      const startDate = this.retrieveTenDaysFromCurrentTime();

      const parseTransactionId = Number(sourceTransactionId);

      const saleResponse = await axios({
        url: `${this.nmiAPIString}security_key=${process.env.NMI_KEY}&recurring=add_subscription&start_date=${startDate}&plan_id=${process.env.RECURRING_PLAN_ID}&first_name=${firstName}&last_name=${lastName}&source_transaction_id=${parseTransactionId}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const responseObject = this.formatPaymentGatewayResponse(
        saleResponse.data,
      );

      console.log('recurring response', responseObject);

      if (responseObject['response_code'] !== '100')
        throw new Error(responseObject['responsetext']);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async authSale(saleInput: CreateOrderInput): Promise<{
    statusMessage: string;
    transactionId: string;
    sticky_order_id: string;
  }> {
    const {
      firstName,
      lastName,
      creditCardNumber,
      cvc,
      expiry,
      email,
      city,
      state,
      address,
      zip,
      sticky_campaign_id,
      sticky_shipping_id,
      creditCardType,
      products,
      affiliate_data,
    } = saleInput;

    try {
      //if affiliate data exists, configure it for the order
      const affData = JSON.parse(affiliate_data) || null;
      //value to determine to make subscription call to stickyio
      let hasRecurringProduct: boolean = false;
      //if there is arecurring product, configure this data
      const nextRecurringProductData: {
        quantity: number | undefined;
        product_id: number | undefined;
        new_recurring_product_id: number | undefined;
      } = {
        quantity: undefined,
        product_id: undefined,
        new_recurring_product_id: undefined,
      };

      const formattedProductArray = products.map((product: ProductInput) => {
        const obj: {
          offer_id: number;
          product_id: number;
          billing_model_id: number;
          quantity: number;
          trial:
            | {
                product_id: number | undefined;
              }
            | undefined;
          new_recurring_product_id: number | undefined;
        } = {
          offer_id: product.sticky_offer_id,
          product_id: product.sticky_product_id,
          billing_model_id: product.sticky_billing_model_id,
          quantity: product.sticky_quantity,
          trial: undefined,
          new_recurring_product_id: undefined,
        };

        //configure recurring object here
        //there is only one recurring product per funnel, so this will work for now
        if (product.sticky_trial_product_id !== undefined) {
          obj.trial = { product_id: product.sticky_product_id };
          obj.new_recurring_product_id =
            product.sticky_next_recurring_product_id;

          hasRecurringProduct = true;

          //recurring data object
          nextRecurringProductData.new_recurring_product_id =
            product.sticky_next_recurring_product_id;
          nextRecurringProductData.quantity = 1;
          nextRecurringProductData.product_id = product.sticky_product_id;
        }

        return obj;
      });

      const data = JSON.stringify({
        firstName,
        lastName,
        billingFirstName: firstName,
        billingLastName: lastName,
        billingAddress1: address,
        billingAddress2: '',
        billingCity: city,
        billingState: state,
        billingZip: zip,
        billingCountry: 'US',
        phone: '5555555555',
        email,
        tranType: 'Sale',
        creditCardType,
        creditCardNumber,
        expirationDate: expiry,
        CVV: cvc,
        ipAddress: '198.4.3.2',
        shippingId: sticky_shipping_id,
        campaignId: sticky_campaign_id,
        offers: formattedProductArray,
        billingSameAsShipping: 'YES',
        shippingAddress1: address,
        shippingAddress2: '',
        shippingCity: city,
        shippingState: state,
        shippingZip: zip,
        shippingCountry: 'US',
        ...affData,
      });

      const request = await axios({
        method: 'POST',
        url: 'https://popbrands.sticky.io/api/v1/new_order',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(
            process.env.STICKY_USERNAME + ':' + process.env.STICKY_PASSWORD,
          ).toString('base64')}`,
        },
        data,
      });

      //status wll only be 100 for successful purchase
      if (request.data.provider_response_code !== '100') {
        return {
          statusMessage: request.data.decline_reason,
          transactionId: '',
          sticky_order_id: '',
        };
      }

      console.log('next recurring product', nextRecurringProductData);

      //todo see if there is a recurring item in the order
      if (hasRecurringProduct) {
        const updateOrderWithNextRecurringItem = await axios({
          method: 'POST',
          url: 'https://popbrands.sticky.io/api/v1/subscription_order_update',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${Buffer.from(
              process.env.STICKY_USERNAME + ':' + process.env.STICKY_PASSWORD,
            ).toString('base64')}`,
          },
          data: JSON.stringify({
            order_id: request.data.order_id,
            ...nextRecurringProductData,
          }),
        });

        console.log(
          'update request success',
          updateOrderWithNextRecurringItem.data,
        );
      }

      return {
        statusMessage: 'SUCCESS',
        transactionId: request.data.transactionID,
        sticky_order_id: request.data.order_id,
      };
    } catch (error) {
      console.error('payment request error:', error);
      return {
        statusMessage: error,
        transactionId: '',
        sticky_order_id: '',
      };
    }
  }

  async updateTransaction(
    input: UpdateTransactionInput,
  ): Promise<{ newTransactionId: string }> {
    try {
      const { transactionId, updatedOrderTotal } = input;

      console.log('updated order total', updatedOrderTotal);
      //create a new authorized payment
      const request = await axios({
        url: `${this.nmiAPIString}security_key=${process.env.NMI_KEY}&type=auth&transactionid=${transactionId}&amount=${updatedOrderTotal}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const responseObject: any = this.formatPaymentGatewayResponse(
        request.data,
      );

      console.log('update response', responseObject);

      if (responseObject['response_code'] !== '100')
        throw new Error(responseObject['responsetext']);

      //void out previous authorized transaction
      const voidRequest = await axios({
        url: `${this.nmiAPIString}security_key=${process.env.NMI_KEY}&type=void&transactionid=${transactionId}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const voidResponseObject = this.formatPaymentGatewayResponse(
        voidRequest.data,
      );

      console.log('void request response!', voidResponseObject);

      return { newTransactionId: responseObject.transactionid };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async captureSale(transactionId: number): Promise<{
    statusMessage: string;
    transactionId: string;
    responseObject: any;
  }> {
    try {
      const saleResponse = await axios({
        url: `${this.nmiAPIString}security_key=${process.env.NMI_KEY}&type=capture&transactionid=${transactionId}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const responseObject: any = this.formatPaymentGatewayResponse(
        saleResponse.data,
      );

      console.log('sale response!', saleResponse.data, responseObject);

      if (responseObject['response_code'] !== '100')
        throw new Error(responseObject['responsetext']);

      return {
        statusMessage: 'SUCCESS',
        transactionId: responseObject.transactionid,
        responseObject,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async capturePaypalOrder({
    orderID,
    amount,
  }: {
    orderID: string;
    amount: number;
  }): Promise<PaypalOrderUpdateResponse> {
    try {
      const authorization = await this.paypalAuthRequest();

      const paypalRequest = await axios({
        url: `${
          process.env.NODE_ENV === 'production'
            ? process.env.PAYPAL_LIVE_URL
            : process.env.PAYPAL_URL
        }/v2/checkout/orders/${orderID}/authorize`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authorization.response}`,
        },
        data: {
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: amount.toFixed(2).toString(),
              },
            },
          ],
        },
      });
      console.log('paypal order capture', paypalRequest);
      return {
        message: 'Captured paypal order',
        success: true,
        paypal_transaction_id: '',
      };
    } catch (error) {
      console.error('error', error);
      return {
        message: error,
        success: false,
        paypal_transaction_id: '',
      };
    }
  }
  //TODO pretty sure paypal will not allow for an order update, will most likely have to create a new order every purchase
  async createNewPaypalOrder(
    input: UpdatePaypalOrderInput,
  ): Promise<PaypalOrderUpdateResponse> {
    try {
      const { itemAmount } = input;

      const authorization = await this.paypalAuthRequest();

      if (!authorization.success) throw new Error(authorization.message);

      console.log('new paypal order');
      const paypalRequest = await axios({
        url: `${
          process.env.NODE_ENV === 'production'
            ? process.env.PAYPAL_LIVE_URL
            : process.env.PAYPAL_URL
        }/v2/checkout/orders`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authorization.response}`,
        },
        data: {
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: itemAmount.toFixed(2).toString(),
              },
            },
          ],
        },
      });
      console.log('paypal update successfull', paypalRequest.data);

      return {
        message: 'Paypal Order Update Successful',
        success: true,
        paypal_transaction_id: paypalRequest.data.id,
      };
    } catch (error) {
      console.error(error);
      return {
        message: 'Error updating paypal order',
        success: false,
        paypal_transaction_id: '',
      };
    }
  }

  async createPaypalProduct(
    input: CreatePaypalProductInput,
  ): Promise<CreatePaypalProductResponse> {
    try {
      const authorization = await this.paypalAuthRequest();

      const createProductRequest = await axios({
        method: 'POST',
        url: `${
          process.env.NODE_ENV === 'production'
            ? process.env.PAYPAL_LIVE_URL
            : process.env.PAYPAL_URL
        }
/v1/catalogs/products`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authorization.response}`,
        },
        data: {
          ...input,
        },
      });

      return {
        message: 'Successfully created product in paypal',
        success: true,
        product: createProductRequest.data,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async getPaypalProduct(
    input: GetPaypalProductInput,
  ): Promise<GetPaypalProductResponse> {
    try {
      const { productId } = input;
      const authorization = await this.paypalAuthRequest();

      const productRequest = await axios({
        method: 'GET',
        url: `${
          process.env.NODE_ENV === 'production'
            ? process.env.PAYPAL_LIVE_URL
            : process.env.PAYPAL_URL
        }/v1/catalogs/products/${productId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authorization.response}`,
        },
      });

      return {
        message: 'Found a paypal product',
        success: true,
        product: productRequest.data,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async addSubscriptionToPurchase(
    input: AddSubscriptionInput,
  ): Promise<AddSubscriptionResponse> {
    try {
      const {
        address,
        firstName,
        lastName,
        email,
        state,
        zip,
        city,
        paypal_payer_id,
      } = input;
      const authorization = await this.paypalAuthRequest();

      const subRequest = await axios({
        method: 'POST',
        url: `${
          process.env.NODE_ENV === 'production'
            ? process.env.PAYPAL_LIVE_URL
            : process.env.PAYPAL_URL
        }/v1/billing/subscriptions`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authorization.response}`,
          'PayPal-Request-Id': 'SUBSCRIPTION-21092019-001',
        },

        data: {
          plan_id: 'P-16S76074SB539451CMIKQKZI',
          quantity: '1',
          subscriber: {
            name: {
              given_name: firstName,
              surname: lastName,
            },
            email_address: email,
            shipping_address: {
              name: {
                full_name: firstName + ' ' + lastName,
              },
              address: {
                address_line_1: address,
                address_line_2: '',
                admin_area_2: city,
                admin_area_1: state,
                postal_code: zip,
                country_code: 'US',
              },
            },
            payer_id: paypal_payer_id,
          },
        },
      });

      console.log('subrequest', subRequest.data);

      if (subRequest.data.id) {
        await axios({
          method: 'POST',
          url: `${
            process.env.NODE_ENV === 'production'
              ? process.env.PAYPAL_LIVE_URL
              : process.env.PAYPAL_URL
          }/v1/billing/subscriptions/${subRequest.data.id}/activate`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authorization.response}`,
            'PayPal-Request-Id': 'SUBSCRIPTION-21092019-001',
          },
          data: {
            reason: 'Start subscriptions',
          },
        });
      }

      return {
        message: 'Successfully added subscription to order',
        success: true,
        subscriptionPlan: subRequest.data,
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async refundPaypalTransaction(
    input: RefundPaypalTransactionInput,
  ): Promise<RefundPaypalTransactionResponse> {
    try {
      const { paypalTransactionId, amount } = input;
      const authorization = await this.paypalAuthRequest();

      const refundRequest = await axios({
        method: 'POST',
        url: `${
          process.env.NODE_ENV === 'production'
            ? process.env.PAYPAL_LIVE_URL
            : process.env.PAYPAL_URL
        }/v1/payments/capture/${paypalTransactionId}/refund `,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authorization.response}`,
        },
        data: {
          amount: {
            total: amount,
            currency: 'USD',
          },
        },
      });

      console.log('paypal refund request', refundRequest.data);
      return {
        message: 'Refund to paypal transaction, successful',
        success: true,
      };
    } catch (error) {
      console.error(error);
      return {
        message: error,
        success: false,
      };
    }
  }

  async paypalAuthRequest(): Promise<{
    message: string;
    success: boolean;
    response: any;
  }> {
    try {
      const authRequest = await axios({
        url: `${
          process.env.NODE_ENV === 'production'
            ? process.env.PAYPAL_LIVE_URL
            : process.env.PAYPAL_URL
        }/v1/oauth2/token`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username:
            process.env.NODE_ENV === 'production'
              ? process.env.PAYPAL_LIVE_CLIENT_ID
              : process.env.PAYPAL_CLIENT_ID,
          password:
            process.env.NODE_ENV === 'production'
              ? process.env.PAYPAL_LIVE_SECRET
              : process.env.PAYPAL_SECRET,
        },
        params: {
          grant_type: 'client_credentials',
        },
      });

      return {
        message: 'Successful paypal auth',
        success: true,
        response: authRequest.data.access_token,
      };
    } catch (error) {
      console.error(error);
      return {
        message: 'Could not get authorization',
        success: false,
        response: error,
      };
    }
  }
  async refundCreditTransaction(
    input: RefundCreditTransactionInput,
  ): Promise<RefundCreditTransactionResponse> {
    try {
      const { amount, transactionId } = input;

      console.log('amount', amount);

      const refundRequest = await axios({
        url: `${this.nmiAPIString}security_key=${process.env.NMI_KEY}&type=refund&transactionid=${transactionId}&amount=${amount}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log('refund request', refundRequest.data);
      return {
        message: 'Successfully refunded order',
        success: true,
      };
    } catch (error) {
      return {
        message: error,
        success: false,
      };
    }
  }
}
