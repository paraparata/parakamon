import React from "react";

import CardThumbnail from "../components/shared/CardThumbnail";
import svgPikachu from "../assets/pikachu.svg";

function PokemonList() {
  const pokemons = [
    "saha",
    "naha",
    "kumaha",
    "turo",
    "landu",
    "suntar",
    "saha",
    "naha",
    "kumaha",
    "turo",
    "landu",
    "suntar",
    "saha",
    "naha",
    "kumaha",
    "turo",
    "landu",
    "suntar",
    "saha",
    "naha",
    "kumaha",
    "turo",
    "landu",
    "suntar",
    "saha",
    "naha",
    "kumaha",
    "turo",
    "landu",
    "suntar",
  ];

  const handleOnPokemonClick = (id) => {
    console.log("Go to pokemon profile!", id);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {pokemons.map((pokemon, index) => {
        return (
          <div key={index}>
            <CardThumbnail
              image={svgPikachu}
              title={pokemon}
              detail="Owned: 3"
              handleClick={() => handleOnPokemonClick(index)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default PokemonList;
