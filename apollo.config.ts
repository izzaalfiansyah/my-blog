import { GRAPHQL_HTTP_SERVER } from "./config.json";

export default {
  client: {
    service: {
      name: "my-blog",
      url: GRAPHQL_HTTP_SERVER,
    },
    includes: ["./src/**/*.vue", "./src/**/*.ts"],
  },
};
