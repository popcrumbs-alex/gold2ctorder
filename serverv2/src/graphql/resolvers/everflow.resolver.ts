import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EverFlowService } from 'src/services/everflow.service';
import { EverflowOrderTrackInput } from '../inputs/everflow.input';
import { EverflowOrderTrackResponse } from '../responses/everflow.response';

@Resolver()
export class EverflowResolver {
  constructor(private readonly everflowService: EverFlowService) {}

  @Mutation(() => EverflowOrderTrackResponse)
  async trackOrder(
    @Args('everflowOrderInput')
    everflowOrderTrackInput: EverflowOrderTrackInput,
  ) {
    return this.everflowService.orderConfirmTrack(everflowOrderTrackInput);
  }

  @Mutation(() => EverflowOrderTrackResponse)
  async trackUpsell(
    @Args('everflowOrderInput')
    everflowOrderTrackInput: EverflowOrderTrackInput,
  ) {
    return this.everflowService.upsellTrack(everflowOrderTrackInput);
  }
}
