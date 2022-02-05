import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from 'src/services/order.service';
import { CreateOrderInput, UpdateOrderInput } from '../inputs/order.input';
import {
  CreateOrderResponse,
  UpdateOrderResponse,
} from '../responses/order.response';
import { OrderTypeDef } from '../schemas/order.schema';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => OrderTypeDef)
  async findOrder(id: string) {
    return this.orderService.loadOrder(id);
  }

  @Mutation(() => CreateOrderResponse)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    return this.orderService.createOrder(createOrderInput);
  }

  @Mutation(() => UpdateOrderResponse)
  async updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ) {
    return this.orderService.updateOrder(updateOrderInput);
  }
}
