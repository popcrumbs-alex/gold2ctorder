import { Inject, Injectable } from "@nestjs/common";
import {
  PaymentSaleOptions,
  RecurringPaymentOptions,
} from "src/interfaces/payment.interface";
import axios from "axios";
import { config } from "dotenv";

config();

@Injectable()
export class PaymentService {
  constructor(@Inject("PAYMENT") private readonly nmiAPIString) {}

  async getApiString() {
    return this.nmiAPIString;
  }

  formatPaymentGatewayResponse(response: string) {
    const removeEqualSigns = response.replace(/=/g, ":");
    const removeAmpersands = removeEqualSigns.split("&");
    //place keys and values into new object
    const responseObject = {};

    removeAmpersands.forEach((responsePiece: string) => {
      let splitByColon = responsePiece.split(":");
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
        ? "0" + (tenDaysFromNowObject.getMonth() + 1)
        : tenDaysFromNowObject.getMonth() + 1
    }${
      tenDaysFromNowObject.getDate() < 10
        ? "0" + tenDaysFromNowObject.getDate()
        : tenDaysFromNowObject.getDate()
    }`;
    return formattedDate;
  }

  async handleRecurringItem(saleInput: RecurringPaymentOptions) {
    const { firstName, lastName, sourceTransactionId } = saleInput;

    try {
      //trial period for recurring is 10 days from current time
      const startDate = this.retrieveTenDaysFromCurrentTime();

      const saleResponse = await axios({
        url: `${this.nmiAPIString}security_key=${process.env.NMI_KEY}&recurring=add_subscription&start_date=${startDate}&plan_id=${process.env.RECURRING_PLAN_ID}&first_name=${firstName}&last_name=${lastName}&source_transaction_id=${sourceTransactionId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const responseObject = this.formatPaymentGatewayResponse(
        saleResponse.data
      );

      console.log("recurring response", responseObject);

      if (responseObject["response_code"] !== "100")
        throw new Error(responseObject["responsetext"]);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async sale(saleInput: PaymentSaleOptions) {
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
        url: `${this.nmiAPIString}security_key=${process.env.NMI_KEY}&type=sale&ccnumber=${creditCardNumber}&ccexp=${expiry}&first_name=${firstName}&last_name=${lastName}&amount=${amount}&cvv=${cvv}`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const responseObject: any = this.formatPaymentGatewayResponse(
        saleResponse.data
      );

      if (containsRecurringItem) {
        await this.handleRecurringItem({
          ...saleInput,
          sourceTransactionId: responseObject.transactionid,
        });
      }

      console.log(
        "sale response!",
        saleResponse.data,
        responseObject["response_code"]
      );

      if (responseObject["response_code"] !== "100")
        throw new Error(responseObject["responsetext"]);

      return "SUCCESS";
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
