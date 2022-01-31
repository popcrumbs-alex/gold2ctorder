// src/gatsby-plugin-apollo/client.js
import fetch from "isomorphic-fetch";
import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: "https://ba55-96-239-26-185.ngrok.io/graphql",
    fetch,
    credentials: "same-origin",
  }),
});

export default client;
