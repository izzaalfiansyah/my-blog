import { gql } from "@apollo/client/core";
import { useMutation } from "@vue/apollo-composable";

interface CreateVariables {
  title: string;
  description: string;
  content: string;
  emoji?: string;
  tags?: string[];
  coverImageUrl?: string;
  isPublished?: boolean;
}

interface UpdateVariables extends CreateVariables {
  id: any;
}

export const useCreatePostMutation = () =>
  useMutation<any, CreateVariables>(gql`
    mutation createPost(
      $title: String!
      $description: String!
      $content: String!
      $emoji: String
      $tags: [String!]
      $coverImageUrl: String
      $isPublished: Boolean
    ) {
      createPost(
        input: {
          title: $title
          description: $description
          content: $content
          emoji: $emoji
          tags: $tags
          coverImageUrl: $coverImageUrl
          isPublished: $isPublished
        }
      )
    }
  `);

export const useUpdatePostMutation = () =>
  useMutation<any, UpdateVariables>(
    gql`
      mutation updatePost(
        $id: String!
        $title: String!
        $description: String!
        $content: String!
        $emoji: String
        $tags: [String!]
        $coverImageUrl: String
        $isPublished: Boolean
      ) {
        updatePost(
          id: $id
          input: {
            title: $title
            description: $description
            content: $content
            emoji: $emoji
            tags: $tags
            coverImageUrl: $coverImageUrl
            isPublished: $isPublished
          }
        )
      }
    `
  );

export const useDeletePostMutation = () =>
  useMutation<any, { id: any }>(
    gql`
      mutation updatePost($id: String!) {
        deletePost(id: $id)
      }
    `
  );
