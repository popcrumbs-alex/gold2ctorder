import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateOrderInput } from "src/graphql/inputs/order.input";
import { CreateOrderResponse } from "src/graphql/responses/order.response";
import {
  CustomerType,
  OrderObjectParams,
  ShippingAddress,
} from "src/interfaces/order.interface";
import { Order, OrderDocument, Product } from "src/mongo/schemas/order.model";
import { PaymentService } from "./payment.service";
import { ShopifyService } from "./shopify.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly shopify: ShopifyService,
    private readonly paymentService: PaymentService
  ) {}

  async test() {
    console.log("this is a test", this.paymentService.getApiString());
    return "this is a test";
  }
  async loadOrder(id: string): Promise<Order> {
    try {
      const foundOrder = await this.orderModel.findById(id);

      return foundOrder;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  calculateOrderTotal(prices: number[]): number {
    return prices.reduce((accumulator, nextNum) => accumulator + nextNum, 0);
  }

  async createOrder(input: CreateOrderInput): Promise<CreateOrderResponse> {
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

      if (products.length === 0) {
        throw new Error("Must have products in order to purchase?");
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

      console.log("is there a subscription item?", detectASubscriptionItem);

      const customer: CustomerType = {
        first_name: firstName,
        last_name: lastName,
        email,
      };

      const shipping_address: ShippingAddress = {
        address1: address,
        address2: "",
        city,
        country: "United States",
        country_code: "US",
        country_name: "United States",
        company: "",
        first_name: firstName,
        last_name: lastName,
        name: firstName + " " + lastName,
        phone: "",
        province: state,
        province_code: "",
        zip,
      };

      const orderObject: OrderObjectParams = {
        customer,
        shipping_address,
        billing_address: shipping_address,
        total_tax: 0,
        financial_status: "paid",
        tax_lines: [{ price: 0, rate: "n/a", title: "Tax" }],
        transactions: [
          {
            kind: "sale",
            status: "success",
            amount: orderTotal,
          },
        ],
        line_items: lineItems,
        note_attributes: [{ name: "Test Order", value: firstName + lastName }],
      };

      //pass to nmi payment gateway service for transaction
      const paymentRequest = await this.paymentService.sale({
        creditCardNumber,
        cvv: cvc,
        expiry,
        firstName,
        lastName,
        amount: orderTotal,
        containsRecurringItem: detectASubscriptionItem,
      });

      // console.log('payment request', paymentRequest);
      if (paymentRequest !== "SUCCESS") {
        throw new Error(paymentRequest);
      }

      //create order in shopify if payment is successful
      // await this.shopify.createOrder(orderObject);

      return {
        message: "Transaction processed",
        success: true,
        Order: { ...input, transactionId: "" },
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
