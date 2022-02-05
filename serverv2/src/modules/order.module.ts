import { Module } from '@nestjs/common';
import { OrderService } from 'src/services/order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/mongo/schemas/order.model';
import { ShopifyModule } from './shopify.module';
import { PaymentModule } from './payment.module';
import { OrderResolver } from 'src/graphql/resolvers/order.resolver';
import { CustomerModule } from './customer.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ShopifyModule,
    PaymentModule,
    CustomerModule,
  ],
  providers: [OrderService, Order, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
