import { gql } from "@apollo/client/core";
import { useMutation } from "@vue/apollo-composable";

const createPostQuery = gql`
  mutation createPost(
    $title: String!
    $content: String!
    $emoji: String
    $tags: [String!]
    $coverImageUrl: String
    $isPublished: Boolean
  ) {
    createPost(
      input: {
        title: $title
        content: $content
        emoji: $emoji
        tags: $tags
        coverImageUrl: $coverImageUrl
        isPublished: $isPublished
      }
    )
  }
`;

export const createPostMutation = () => useMutation(createPostQuery);
