import { Injectable } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('orders')
  handleRecentOrder(@MessageBody() data: unknown): unknown {
    console.log('data!', data);
    this.server.emit('order', data);
    return data;
  }
}
