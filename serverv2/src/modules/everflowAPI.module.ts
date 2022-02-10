import { Module } from '@nestjs/common';
import { EverflowResolver } from 'src/graphql/resolvers/everflow.resolver';
import { EverFlowService } from 'src/services/everflow.service';

@Module({
  providers: [EverflowResolver, EverFlowService],
  exports: [EverFlowService],
})
export class EverflowAPIModule {}
