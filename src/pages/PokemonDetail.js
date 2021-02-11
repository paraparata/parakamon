import React, { useState } from "react";

import svgPokeball from "../assets/pokeball.svg";

function PokemonDetail() {
  const [activePoke, setActivePoke] = useState(false);

  return (
    <div className="container h-full flex-grow flex flex-col bg-green-200">
      <div className="flex-grow">
        <h1>PokemonDetail</h1>
      </div>
      <div className="flex-grow-0">
        <div className="flex justify-center">
          <button
            type="button"
            className={`px-2 py-2 rounded-full border bg-white shadow-xl ${
              activePoke ? "shadow-inner" : ""
            }`}
            onClick={() => console.log("Catch!!")}
            onTouchStart={() => setActivePoke(true)}
            onTouchEnd={() => setActivePoke(false)}
          >
            <img
              className="w-24 h-24 ss:w-12 ss:h-12 object-contain"
              src={svgPokeball}
              alt="pokeball"
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
