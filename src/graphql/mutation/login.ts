import { gql } from "@apollo/client/core";
import { useMutation } from "@vue/apollo-composable";

const query = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password })
  }
`;

export const useLoginMutation = () => useMutation(query);
