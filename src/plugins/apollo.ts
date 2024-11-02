import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import { GRAPHQL_HTTP_SERVER } from "../../config.json";
import { Storage } from "../utils/storage";

const getHeaders = async () => {
  const headers: { [key: string]: any } = [];
  const token = await Storage.getToken();

  if (!!token) {
    headers["Authorization"] = "Bearer " + token;
  }

  return headers;
};

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_SERVER,
  headers: await getHeaders(),
});

export const apolloClient = new ApolloClient({
  cache,
  link: httpLink,
});
