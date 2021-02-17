import React, { useState } from "react";
import { useGetPokemons } from "../utils/hookPokemon";

import LoadSpinner from "../components/LoadSpinner";
import PokemonDetailComp from "../components/PokemonDetailComp";

function PokemonDetail() {
  const [paramsRandomPokemon, setParamsRandomPokemon] = useState({
    limit: 1,
    offset: Math.floor(Math.random() * 100),
  });
  const { loading, error, data, refetch } = useGetPokemons(paramsRandomPokemon);

  if (loading) return <LoadSpinner />;
  if (error) return `Error! ${error.message}`;

  const handleOnRefetch = () => {
    setParamsRandomPokemon({
      ...paramsRandomPokemon,
      offset: Math.floor(Math.random() * 100),
    });
    refetch();
  };

  return (
    <PokemonDetailComp
      randomPokemon={data.pokemons.results[0].name}
      onRefetch={handleOnRefetch}
    />
  );
}

export default PokemonDetail;
