// src/gatsby-plugin-apollo/client.js
import fetch from "isomorphic-fetch";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const uri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/graphql"
    : "https://funnel-server.herokuapp.com/graphql";
console.log("uri", uri);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri,
    fetch,
    credentials: "same-origin",
  }),
});

export default client;
