// src/gatsby-plugin-apollo/client.js
import fetch from "isomorphic-fetch";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export const uri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/graphql"
    : "https://funnel-server.herokuapp.com/graphql";

// export const uri = "http://localhost:3000/graphql";

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
