import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation createOrder($createOrderInput: CreateOrderInput!) {
    createOrder(createOrderInput: $createOrderInput) {
      success
      message
      Order {
        firstName
        lastName
        address
        city
        orderTotal
        _id
        shopifyOrderId
        transactionId
        products {
          displayPrice
          price
          title
        }
      }
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation updateOrder($updateOrderInput: UpdateOrderInput!) {
    updateOrder(updateOrderInput: $updateOrderInput) {
      success
      message
      Order {
        firstName
        lastName
        address
        city
        orderTotal
        products {
          displayPrice
          price
          title
        }
      }
    }
  }
`;
