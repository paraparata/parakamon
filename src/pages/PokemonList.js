import React from "react";

import CardThumbnail from "../components/shared/CardThumbnail";
import LoadCardThumbnail from "../components/LoadCardThumbnail";
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

const paramsGetPokemons = {
  limit: 10,
  offset: 9,
};

function PokemonList() {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: paramsGetPokemons,
  });

  if (loading)
    return (
      <div className="grid grid-cols-3 gap-2">
        {Array.from(Array(paramsGetPokemons.limit).keys()).map((index) => {
          return <LoadCardThumbnail key={index} />;
        })}
      </div>
    );
  if (error) return `Error! ${error.message}`;

  const handleOnPokemonClick = (id) => {
    console.log("Go to pokemon profile!", id);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {data.pokemons.results.map((pokemon, index) => {
        return (
          <div key={index}>
            <CardThumbnail
              image={pokemon.image}
              title={pokemon.name}
              detail="Owned: 3"
              handleClick={() => handleOnPokemonClick(pokemon.name)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default PokemonList;
