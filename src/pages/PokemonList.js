import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context, ACTIONS } from "../stores/Store";
import { useGetPokemons } from "../utils/hookPokemon";

import Button from "../components/shared/Button";
import CardThumbnail from "../components/shared/CardThumbnail";
import LoadCardThumbnail from "../components/LoadCardThumbnail";

const findInOwnedList = (target, arr) => {
  const result = arr.find(({ name }) => name === target);
  if (result === undefined) {
    return { own: Number(0) };
  }
  return result;
};

function PokemonList() {
  const [paramsGetPokemons, setParamsGetPokemons] = useState({
    limit: 12,
    offset: 0,
  });
  const history = useHistory();
  const { state, dispatch } = useContext(Context);
  const { loading, error, data, refetch } = useGetPokemons(paramsGetPokemons);

  if (loading)
    return (
      <div className="grid grid-cols-3 gap-2">
        {Array.from(Array(paramsGetPokemons.limit).keys()).map((index) => {
          return <LoadCardThumbnail key={index} />;
        })}
      </div>
    );
  if (error) return `Error! ${error.message}`;

  const getFromLink = (link) => {
    if (link === null) return;

    const params = {
      offset: parseInt(
        link.slice(link.indexOf("offset") + 7, link.indexOf("&"))
      ),
      limit: parseInt(link.slice(link.indexOf("limit") + 6)),
    };
    setParamsGetPokemons({ ...paramsGetPokemons, ...params });
    refetch();
  };
  const handleOnPokemonClick = (name) => {
    dispatch({ type: ACTIONS.ADD_TMP, payload: name });
    history.push("/");
  };

  return (
    <>
      <div className="w-full pb-4 flex justify-center space-x-6">
        <Button
          title="Prev"
          onClick={() => getFromLink(data.pokemons.previous)}
        />
        <Button title="Next" onClick={() => getFromLink(data.pokemons.next)} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {data.pokemons.results.map((pokemon, index) => {
          const { own } = findInOwnedList(pokemon.name, state.ownedList);
          return (
            <div key={index}>
              <CardThumbnail
                image={pokemon.image}
                title={pokemon.name}
                detail={`Owned: ${own}`}
                handleClick={() => handleOnPokemonClick(pokemon.name)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PokemonList;
