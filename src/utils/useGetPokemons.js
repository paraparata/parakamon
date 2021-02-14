import { gql, useQuery } from "@apollo/client";

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

function useGetPokemons(variables) {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: variables,
  });

  return { loading, error, data };
}

export { useGetPokemons };
