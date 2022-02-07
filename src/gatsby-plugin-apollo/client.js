// src/gatsby-plugin-apollo/client.js
import fetch from "isomorphic-fetch";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: "https://funnel-server.herokuapp.com/graphql",
    fetch,
    credentials: "same-origin",
  }),
});

export default client;
