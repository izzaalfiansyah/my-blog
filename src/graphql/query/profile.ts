import { gql } from "@apollo/client/core";
import { useQuery } from "@vue/apollo-composable";

const query = gql`
  query getProfile {
    profile {
      name
      email
      phone
    }
  }
`;

export const useProfileQuery = () => useQuery(query);
