import { Module } from '@nestjs/common';
import { PaymentService } from 'src/services/payment.service';

const paymentFactory = {
  provide: 'PAYMENT',
  useFactory: () => {
    return `https://seamlesschex.transactiongateway.com/api/transact.php
`;
  },
};

@Module({
  providers: [paymentFactory, PaymentService],
  exports: ['PAYMENT'],
})
export class PaymentModule {}
