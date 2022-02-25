import { Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { WebsocketGateway } from 'src/gateways/websockets.gateway';
import { OrderService } from 'src/services/order.service';
import { PaymentService } from 'src/services/payment.service';

@Controller('Shopify')
export class ShopifyController {
  constructor(
    private readonly gateway: WebsocketGateway,
    private readonly orderService: OrderService,
    private readonly paymentService: PaymentService,
  ) {}
  @Post('orders')
  async receive(@Req() request: Request, @Res() response: Response) {
    try {
      const { customer, line_items } = request.body;

      const formattedRecentOrder = {
        name: `${customer.first_name} ${customer.last_name}`,
        product: line_items[0].name,
        location: customer?.default_address.city,
      };

      await this.gateway.handleRecentOrder(formattedRecentOrder);

      return response.status(200);
    } catch (error) {
      console.error(error);
      return response.status(200);
    }
  }
  @Post('refunds')
  async handleRefunds(@Req() request: Request, @Res() response: Response) {
    try {
      console.log(
        'request and respone',
        request.body,
        'id:',
        request.body.order_id,
      );
      const { order_id, transactions } = request.body;

      if (!order_id) {
        console.log('no order id');
        return response.status(200);
      }

      if (transactions.length === 0) {
        console.log('no transactions');
        return response.status(200);
      }

      const foundOrder = await this.orderService.findOrderFromShopifyId(
        request.body.order_id.toString(),
      );

      if (!foundOrder.success) {
        console.log('could not locate an order');
        return response.status(200);
      }

      if (!foundOrder.Order) {
        console.log('could not locate an order');
        return response.status(200);
      }

      switch (foundOrder.Order.orderType) {
        case 'paypal':
          //handle paypal refunds
          console.log('paypal refund');
          return response.status(200);

        case 'credit':
          console.log('nmi refund');
          if (request.body.transactions.length === 0) {
            console.log('no refund transactions');
            return response.status(200);
          }

          console.log('refunds', request.body.refund_line_items);

          const refundAmount = request.body.transactions.reduce(
            (prev, next) => {
              console.log('prv', prev, 'next', next.amount);
              return prev + parseFloat(next.amount);
            },
            0,
          );

          const refundRequest =
            await this.paymentService.refundCreditTransaction({
              transactionId: foundOrder.Order.transactionId,
              amount: refundAmount.toFixed(2),
            });

          if (!refundRequest.success) {
            console.log(refundRequest.message);
            return response.status(200);
          }

          console.log(foundOrder.message);
          return response.status(200);
      }

      console.log('found order', foundOrder.Order);
    } catch (error) {
      console.error(error);
      return response.status(200);
    }
  }
}
