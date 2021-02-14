import React from "react";
import Button from "./Button";

function CardPokemon({ name, image, types, onClickMove, onClickAbility }) {
  return (
    <div className="flex flex-col items-center capitalize">
      <div className="mb-2">
        <span className="flex justify-center text-xl font-bold">{name}</span>
        <div className="flex justify-center space-x-2">
          {types.map((type, index) => {
            return (
              <span
                key={index}
                className="px-1 rounded border border-gray-400 text-gray-400 text-xs"
              >
                {type.type.name}
              </span>
            );
          })}
        </div>
      </div>
      <img
        className="w-32 h-32 ss:w-24 ss:h-24 mb-8"
        src={image}
        alt={name}
      ></img>
      <div className="space-x-6">
        <Button title="Moves" onClick={onClickMove} />
        <Button title="Abilities" onClick={onClickAbility} />
      </div>
    </div>
  );
}

export default CardPokemon;
