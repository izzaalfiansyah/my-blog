import { gql } from "@apollo/client/core";
import { useQuery } from "@vue/apollo-composable";

export const usePostsQuery = () =>
  useQuery(gql`
    query getPosts {
      posts {
        title
        slug
        description
        createdAt
        createdPlace
      }
    }
  `);
