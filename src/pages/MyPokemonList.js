import React from "react";

import CardThumbnail from "../components/shared/CardThumbnail";
import svgPikachu from "../assets/pikachu.svg";

function MyPokemonList() {
  const ownedPokemons = [];
  const handleOnPokemonClick = (id) => {
    console.log("Go to pokemon profile!", id);
  };

  const renderData =
    ownedPokemons.length !== 0 ? (
      <div className="grid grid-cols-3 gap-2">
        {ownedPokemons.map((pokemon, index) => {
          return (
            <div key={index}>
              <CardThumbnail
                image={pokemon.image}
                title={pokemon.name}
                detail="Owned: 3"
                handleClick={() => handleOnPokemonClick(index)}
              />
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
