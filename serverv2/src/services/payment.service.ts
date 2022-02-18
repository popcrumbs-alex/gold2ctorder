import { Inject, Injectable } from '@nestjs/common';
import {
  PaymentSaleOptions,
  RecurringPaymentOptions,
} from 'src/interfaces/payment.interface';
import axios from 'axios';
import { config } from 'dotenv';
import {
  UpdatePaypalOrderInput,
  UpdateTransactionInput,
} from 'src/graphql/inputs/payment.input';
import { PaypalOrderUpdateResponse } from 'src/graphql/responses/payment.response';

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

  async authSale(saleInput: PaymentSaleOptions): Promise<{
    statusMessage: string;
    transactionId: string;
    responseObject: any;
  }> {
    const {
      firstName,
      lastName,
      creditCardNumber,
      cvv,
      expiry,
      amount,
      containsRecurringItem,
    } = saleInput;

    try {
      const saleResponse = await axios({
        url: `${this.nmiAPIString}security_key=${process.env.NMI_KEY}&type=auth&ccnumber=${creditCardNumber}&ccexp=${expiry}&first_name=${firstName}&last_name=${lastName}&amount=${amount}&cvv=${cvv}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const responseObject: any = this.formatPaymentGatewayResponse(
        saleResponse.data,
      );

      console.log(
        'sale response!',
        saleResponse.data,
        responseObject['response_code'],
      );

      if (responseObject['response_code'] !== '100')
        throw new Error(responseObject['responsetext']);

      if (containsRecurringItem) {
        await this.handleRecurringItem({
          ...saleInput,
          sourceTransactionId: responseObject.transactionid,
        });
      }

      return {
        statusMessage: 'SUCCESS',
        transactionId: responseObject.transactionid,
        responseObject,
      };
    } catch (error) {
      console.error('payment request error:', error);
      return {
        statusMessage: error,
        transactionId: '',
        responseObject: error,
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
        url: `${process.env.PAYPAL_URL}/v2/checkout/orders/${orderID}/authorize`,
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
      const { itemAmount, paypal_order_id } = input;

      console.log('auth thsikdd', process.env.PAYPAL_SECRET);

      const authorization = await this.paypalAuthRequest();

      if (!authorization.success) throw new Error(authorization.message);

      console.log('auth!', authorization);
      const paypalRequest = await axios({
        url: `${process.env.PAYPAL_URL}/v2/checkout/orders`,
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

  async paypalAuthRequest(): Promise<{
    message: string;
    success: boolean;
    response: any;
  }> {
    try {
      const authRequest = await axios({
        url: `${process.env.PAYPAL_URL}/v1/oauth2/token`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username:
            'ASyQ9pmZvoxvuzRZxVYCh44dHTljctKvuh_DqYwOkM0iM_2WcQv3s8HA1Ebu15hPINO7JIgfsYBar2Bt',
          password: process.env.PAYPAL_SECRET,
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
}
