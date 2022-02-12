import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { EverflowOrderTrackInput } from 'src/graphql/inputs/everflow.input';
import { EverflowOrderTrackResponse } from 'src/graphql/responses/everflow.response';

@Injectable()
export class EverFlowService {
  constructor() {}

  async orderConfirmTrack(
    everflowOrderTrackInput: EverflowOrderTrackInput,
  ): Promise<EverflowOrderTrackResponse> {
    try {
      const { aff_id, amount } = everflowOrderTrackInput;

      if (!aff_id) {
        console.log('No Affiliate ID');
        return;
      }
      console.log('affiliate sub id', aff_id);

      const url = `https://www.poptrkr.com/?nid=577&transaction_id=${aff_id}&amount=${amount}`;

      const response = await axios({
        url,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-Eflow-API-Key': process.env.EF_API,
        },
      });

      console.log('tracking response', response.data);

      return {
        message: 'Successfully tracked order',
        success: true,
      };
    } catch (error) {
      return {
        message: error,
        success: false,
      };
    }
  }

  async upsellTrack(
    everflowOrderTrackInput: EverflowOrderTrackInput,
  ): Promise<EverflowOrderTrackResponse> {
    const { aff_id, amount } = everflowOrderTrackInput;

    if (!aff_id) {
      console.log('No Affiliate ID');
      return;
    }
    console.log('affiliate sub id', aff_id);

    const url = `https://www.poptrkr.com/?nid=577&aid=5&adv_event_id=9&transaction_id=${aff_id}&amount=${amount}`;

    const response = await axios({
      url,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-Eflow-API-Key': process.env.EF_API,
      },
    });

    console.log('tracking response', response.data);

    return {
      message: 'Successfully tracked order',
      success: true,
    };
  }
  catch(error) {
    return {
      message: error,
      success: false,
    };
  }
}
