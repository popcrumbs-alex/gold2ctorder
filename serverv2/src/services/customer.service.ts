import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerCreationProps } from 'src/interfaces/customer.interface';
import { Customer } from '../mongo/schemas/customer.model';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}

  async createCustomer(
    customerInput: CustomerCreationProps,
  ): Promise<Customer> {
    try {
      //error handling fields
      for (let cstmerIndex in customerInput) {
        if (customerInput[cstmerIndex] === '') {
          throw new Error(`A ${customerInput[cstmerIndex]} is required`);
        }
      }

      const { firstName, lastName, email, order } = customerInput;

      const customerFields: Customer = {
        firstName,
        lastName,
        email,
        orders: [],
      };

      customerFields.orders.push(order);

      const newCustomer = new this.customerModel(customerFields);

      await newCustomer.save();

      return newCustomer;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
