import { gql } from "@apollo/client";
import { graphql } from "gatsby";

export const TEST_ENDPOINT = gql`
  query test {
    test
  }
`;
