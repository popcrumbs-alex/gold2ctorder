import { Module } from '@nestjs/common';
import { OrderService } from 'src/services/order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/mongo/schemas/order.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [OrderService, Order],
  exports: [OrderService],
})
export class OrderModule {}
