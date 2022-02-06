import { gql } from "@apollo/client";
import { graphql } from "gatsby";

export const TEST_ENDPOINT = gql`
  query test {
    test
  }
`;

export const LOAD_ORDER = gql`
  query findOrder($id: string!) {
    findOrder(id: $id)
  }
`;
