import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { gql, useQuery } from "@apollo/client";

import CardPokemon from "../components/shared/CardPokemon";
import LoadSpinner from "../components/LoadSpinner";
import svgPokeball from "../assets/pokeball.svg";

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

const paramsGetPokemon = {
  name: "butterfree",
};

function PokemonDetail() {
  const [activePoke, setActivePoke] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState("main");
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: paramsGetPokemon,
  });

  if (loading) return <LoadSpinner />;
  if (error) return `Error! ${error.message}`;

  const handleOnClickMove = () => {
    console.log("Move");
    setIsModalOpen("move");
  };
  const handleOnClickAbility = () => {
    console.log("Ability");
    setIsModalOpen("ability");
  };

  return (
    <>
      <Transition
        className="h-full flex-grow flex flex-col"
        show={isModalOpen === "main"}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-400"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex-grow flex flex-col justify-center items-center">
          <CardPokemon
            name={data.pokemon.name}
            image={data.pokemon.sprites.front_default}
            types={data.pokemon.types}
            onClickMove={handleOnClickMove}
            onClickAbility={handleOnClickAbility}
          />
        </div>
        <div className="flex-grow-0">
          <div className="mb-2 flex justify-center">
            <span className="text-xs text-gray-400">
              Press Pokeball To Catch The Pokemon!
            </span>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className={`px-2 py-2 rounded-full border bg-white shadow-xl ${
                activePoke ? "shadow-inner" : ""
              }`}
              onClick={() => console.log(data)}
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
      </Transition>

      <Transition
        show={isModalOpen === "move"}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-400"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            className="px-2 py-1 rounded bg-yellow-300 border focus:ring-2 focus:ring-offset-blue-400 shadow focus:shadow-inner font-medium"
            onClick={() => setIsModalOpen("main")}
          >
            Close
          </button>
          {data.pokemon.moves.map((move, index) => {
            return (
              <div
                key={index}
                className="w-full px-2 py-2 flex justify-center items-center rounded bg-white shadow text-center"
              >
                <span className="text-sm font-medium capitalize">
                  {move.move.name}
                </span>
              </div>
            );
          })}
        </div>
      </Transition>

      <Transition
        show={isModalOpen === "ability"}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-400"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            className="px-2 py-1 rounded bg-yellow-300 border focus:ring-2 focus:ring-offset-blue-400 shadow focus:shadow-inner font-medium"
            onClick={() => setIsModalOpen("main")}
          >
            Close
          </button>
          {data.pokemon.abilities.map((ability, index) => {
            return (
              <div
                key={index}
                className="w-full px-2 py-2 flex justify-center items-center rounded bg-white shadow text-center"
              >
                <span className="text-sm font-medium capitalize">
                  {ability.ability.name}
                </span>
              </div>
            );
          })}
        </div>
      </Transition>
    </>
  );
}

export default PokemonDetail;
