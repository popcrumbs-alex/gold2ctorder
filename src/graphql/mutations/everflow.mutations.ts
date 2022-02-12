import { gql } from "@apollo/client";

export const EF_TRACK_ORDER = gql`
  mutation trackOrder($everflowOrderInput: EverflowOrderTrackInput!) {
    trackOrder(everflowOrderInput: $everflowOrderInput) {
      message
      success
    }
  }
`;

export const EF_TRACK_UPSELL = gql`
  mutation trackUpsell($everflowOrderInput: EverflowOrderTrackInput!) {
    trackUpsell(everflowOrderInput: $everflowOrderInput) {
      message
      success
    }
  }
`;
