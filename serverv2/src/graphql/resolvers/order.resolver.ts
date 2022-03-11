import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from 'src/services/order.service';
import {
  CloseOrderInput,
  CreateOrderInput,
  FindOrderInput,
  UpdateOrderInput,
} from '../inputs/order.input';
import { OrderResponse, StickyAuthResponse } from '../responses/order.response';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => OrderResponse)
  async findOrder(@Args('findOrderInput') findOrderInput: FindOrderInput) {
    return this.orderService.loadOrder(findOrderInput.id);
  }

  @Query(() => StickyAuthResponse)
  async getStickyAuthCreds() {
    return this.orderService.getStickyIOCredentials();
  }

  @Mutation(() => OrderResponse)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    return this.orderService.createOrder(createOrderInput);
  }

  @Mutation(() => OrderResponse)
  async updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ) {
    return this.orderService.updateOrder(updateOrderInput);
  }

  @Mutation(() => OrderResponse)
  async closeOrder(@Args('closeOrderInput') closeOrderInput: CloseOrderInput) {
    return this.orderService.closeOrder(closeOrderInput);
  }
}
