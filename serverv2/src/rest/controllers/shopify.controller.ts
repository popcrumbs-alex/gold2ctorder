import { Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { WebsocketGateway } from 'src/gateways/websockets.gateway';
import * as ws from 'websocket';

@Controller('Shopify')
export class ShopifyController {
  constructor(private readonly gateway: WebsocketGateway) {}
  @Post('orders')
  async receive(@Req() request: Request, @Res() response: Response) {
    const { customer, line_items } = request.body;

    const formattedRecentOrder = {
      name: `${customer.first_name} ${customer.last_name}`,
      product: line_items[0].name,
      location: customer?.default_address.city,
    };

    await this.gateway.handleRecentOrder(formattedRecentOrder);

    return response.status(200);
  }
}
