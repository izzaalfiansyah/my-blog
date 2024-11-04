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

export const usePostBySlugQuery = (variables: { slug: string }) =>
  useQuery(
    gql`
      query getPost($slug: String!) {
        postBySlug(slug: $slug) {
          id
          title
          description
          content
          emoji
          coverImageUrl
          tags
          createdPlace
          createdAt
          updatedAt
        }
      }
    `,
    variables
  );
