import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { OrderModule } from './modules/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './services/task.service';
import { EverflowAPIModule } from './modules/everflowAPI.module';
import { ShopifyController } from './rest/controllers/shopify.controller';
import { WebsocketGateway } from './gateways/websockets.gateway';
import { PaymentService } from './services/payment.service';
import { PaymentModule } from './modules/payment.module';
import { ShopifyService } from './services/shopify.service';
import { ShopifyModule } from './modules/shopify.module';

config();
@Module({
  imports: [
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true,
      cors: {
        origin: [
          '*',
          'http://localhost:8000',
          'https://serene-jennings-9dcb5a.netlify.app',
          'offers.lucianarose.store',
          'https://funnel-server.herokuapp.com/',
        ],
        credentials: true,
      },
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      context: async ({ req, res }) => {
        console.log('req', req);
        return { req, res };
      },
    }),
    OrderModule,
    PaymentModule,
    EverflowAPIModule,
    ShopifyModule,
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController, ShopifyController],
  providers: [AppService, TaskService, WebsocketGateway],
})
export class AppModule {}
