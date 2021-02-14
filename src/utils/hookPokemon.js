import { gql, useQuery } from "@apollo/client";

const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
      abilities {
        ability {
          name
        }
      }
    }
  }
`;
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

function useGetPokemon(variables) {
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: variables,
  });

  return { loading, error, data };
}

function useGetPokemons(variables) {
  const { loading, error, data, refetch } = useQuery(GET_POKEMONS, {
    variables: variables,
  });

  return { loading, error, data, refetch };
}

export { useGetPokemon, useGetPokemons };
