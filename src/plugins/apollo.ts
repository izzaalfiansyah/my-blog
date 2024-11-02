import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import { GRAPHQL_HTTP_SERVER } from "../../config.json";

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_SERVER,
  headers: {},
});

export const apolloClient = new ApolloClient({
  cache,
  link: httpLink,
});
