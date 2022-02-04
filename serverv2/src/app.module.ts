import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { OrderModule } from './modules/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { PaymentModule } from './modules/payment.module';
config();
@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
    }),
    OrderModule,
    PaymentModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
