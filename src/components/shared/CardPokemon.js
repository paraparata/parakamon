import React from "react";

function CardPokemon({ name, types, img, imgWidth, imgHeight, pokemonAnim }) {
  return (
    <div className="px-2 py-2 flex flex-col items-center capitalize">
      <div className="mb-2">
        <span className="heading pb-2 flex justify-center text-sm font-semibold text-gray-700">
          {name}
        </span>
        <div className="flex justify-center space-x-2">
          {types.map((type, index) => {
            return (
              <span
                key={index}
                className="px-1 rounded border border-gray-600 text-gray-600 text-xs"
              >
                {type.type.name}
              </span>
            );
          })}
        </div>
      </div>
      <img
        className={`${pokemonAnim} ${imgWidth} ${imgHeight}`}
        src={img}
        alt={name}
      ></img>
    </div>
  );
}

export default CardPokemon;
