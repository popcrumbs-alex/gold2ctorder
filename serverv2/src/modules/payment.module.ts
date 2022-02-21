import { Module } from '@nestjs/common';
import { PaymentResolver } from 'src/graphql/resolvers/payment.resolver';
import { PaymentService } from 'src/services/payment.service';

const paymentFactory = {
  provide: 'PAYMENT',
  useFactory: () => {
    return `https://seamlesschex.transactiongateway.com/api/transact.php?`;
  },
};

@Module({
  providers: [paymentFactory, PaymentService, PaymentResolver],
  exports: ['PAYMENT', PaymentService],
})
export class PaymentModule {}
