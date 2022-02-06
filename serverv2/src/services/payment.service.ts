import { Inject, Injectable } from '@nestjs/common';
import {
  PaymentSaleOptions,
  RecurringPaymentOptions,
} from 'src/interfaces/payment.interface';
import axios from 'axios';
import { config } from 'dotenv';
import { UpdateTransactionInput } from 'src/graphql/inputs/payment.input';

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
      console.error(error);
      return error;
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
}
