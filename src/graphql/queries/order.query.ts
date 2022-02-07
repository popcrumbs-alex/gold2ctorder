import { gql } from "@apollo/client";
import { graphql } from "gatsby";

export const TEST_ENDPOINT = gql`
  query test {
    test
  }
`;

export const LOAD_ORDER = gql`
  query findOrder($findOrderInput: FindOrderInput!) {
    findOrder(findOrderInput: $findOrderInput) {
      Order {
        products {
          price
          title
          displayPrice
        }
        orderTotal
      }
      message
      success
    }
  }
`;
