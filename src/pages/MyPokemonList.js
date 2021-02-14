import React, { useContext } from "react";
import { Context, ACTIONS } from "../stores/Store";

import CardThumbnail from "../components/shared/CardThumbnail";
import Button from "../components/shared/Button";

function MyPokemonList() {
  const { state, dispatch } = useContext(Context);

  const handleOnRemove = (targetId, targetName, targetNickname) => {
    dispatch({
      type: ACTIONS.REMOVE,
      payload: { id: targetId, name: targetName, nickname: targetNickname },
    });
    console.log(state);
  };

  const renderData =
    state.bags.length !== 0 ? (
      <div className="grid grid-cols-3 gap-2">
        {state.bags.map((pokemon, index) => {
          return (
            <div key={index}>
              <CardThumbnail
                image={pokemon.sprites.front_default}
                title={pokemon.nickname}
                subtitle={pokemon.name}
                capitalizeTitle={false}
              >
                <Button
                  title="Remove"
                  color="bg-red-400"
                  textColor="text-white"
                  optClass="w-full mt-2 px-1 py-0 text-sm"
                  onClick={() =>
                    handleOnRemove(pokemon.id, pokemon.name, pokemon.nickname)
                  }
                />
              </CardThumbnail>
            </div>
          );
        })}
      </div>
    ) : (
      <div className="h-full flex-grow flex justify-center items-center">
        <p className="text-center text-sm text-gray-500">
          You have an empty bag Sir :(
          <br />
          Time to hunt your Pokemons!
        </p>
      </div>
    );

  return <>{renderData}</>;
}

export default MyPokemonList;
