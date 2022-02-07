import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Order } from 'src/mongo/schemas/order.model';
import { OrderService } from './order.service';
import * as mongoose from 'mongoose';

@Injectable()
export class TaskService {
  constructor(private readonly orderService: OrderService) {}
  private readonly logger = new Logger(TaskService.name);

  @Cron('45 * * * * *')
  handleCron() {
    console.log('Cron status update');
    this.logger.debug('Debug log at 45 seconds');
  }
  @Cron('45 * * * * *')
  async locatePendingOrders() {
    try {
      const pendingOrders = await this.orderService.loadPendingOrders();

      if (pendingOrders.Orders.length === 0) {
        this.logger.debug('No pending orders');
        return;
      }

      //if an order exceeds 15 min close it out and capture the payment
      [...pendingOrders.Orders].forEach(
        async (order: Order & { _id: mongoose.Schema.Types.ObjectId }) => {
          const currentTime = new Date();
          const past = new Date(order.orderStartTime.toString());
          const diff = Math.abs(currentTime.getTime() - past.getTime());
          const minutesPast = Math.floor(diff / 1000 / 60);
          console.log('minutes past', minutesPast);
          if (minutesPast > 15) {
            console.log(`order: ${order._id} has closed!`);
            await this.orderService.closeOrder({
              orderId: order._id.toString(),
            });
          }
        },
      );
    } catch (error) {
      console.error(error);
    }
  }
}
