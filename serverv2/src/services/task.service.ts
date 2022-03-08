import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Order } from 'src/mongo/schemas/order.model';
import { OrderService } from './order.service';
import * as mongoose from 'mongoose';
import { config } from 'dotenv';
import { ShopifyService } from './shopify.service';
import { WebsocketGateway } from 'src/gateways/websockets.gateway';

config();

@Injectable()
export class TaskService {
  constructor(
    private readonly orderService: OrderService,
    private readonly shopifyService: ShopifyService,
    private readonly gateway: WebsocketGateway,
  ) {}
  private readonly logger = new Logger(TaskService.name);

  @Cron('45 * * * * *')
  handleCron() {
    console.log('Cron status update');
    this.logger.debug('Debug log at 45 seconds');
  }
  @Cron('45 * * * * *')
  async locatePendingOrders() {
    try {
      console.log('node_env:', process.env.NODE_ENV);

      if (process.env.NODE_ENV !== 'production') return;

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
  @Cron('45 * * * * *')
  async retrieveMostRecentOrders() {
    try {
      const order = await this.shopifyService.getRecentOrder();

      const { customer, line_items } = order[0];

      const formattedRecentOrder = {
        name: `${customer.first_name} ${customer.last_name}`,
        product: line_items[0].name,
        location: customer?.default_address.city,
      };

      console.log('orders!', formattedRecentOrder);

      await this.gateway.handleRecentOrder(formattedRecentOrder);
    } catch (error) {
      console.error('cron error', error);
      return error;
    }
  }
}
