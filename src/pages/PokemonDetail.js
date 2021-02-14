import React, { useState, useContext } from "react";
import { Transition } from "@headlessui/react";
import { Context, ACTIONS } from "../stores/Store";
import { useGetPokemon, useGetPokemons } from "../utils/hookPokemon";

import Button from "../components/shared/Button";
import CardPokemon from "../components/shared/CardPokemon";
import LoadSpinner from "../components/LoadSpinner";
import Modal from "../components/shared/Modal";
import svgPokeball from "../assets/pokeball.svg";

const HINT = "Press Pokeball To Catch The Pokemon!";
const CATCH_SUCCESS = "You Got A New Pokemon!";
const CATCH_FAILED = "Try Again";
const paramsRandomPokemon = {
  limit: 1,
  offset: Math.floor(Math.random() * 100),
};

function PokemonDetail() {
  const { loading, error, data } = useGetPokemons(paramsRandomPokemon);

  if (loading) return <LoadSpinner />;
  if (error) return `Error! ${error.message}`;

  return <PokemonDetailC randomPokemon={data.pokemons.results[0].name} />;
}

function PokemonDetailC({ randomPokemon }) {
  const [activePoke, setActivePoke] = useState(false);
  const [stateMenu, setStateMenu] = useState("main");
  const [catchSummary, setCatchSummary] = useState(HINT);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateNickname, setStateNickname] = useState("");
  const [notAvalNickname, setNotAvalNickname] = useState(false);
  const { state, dispatch } = useContext(Context);
  const paramsPokemon = !!state.tmpPokemon ? state.tmpPokemon : randomPokemon;
  const { loading, error, data } = useGetPokemon({ name: paramsPokemon });

  if (loading) return <LoadSpinner />;
  if (error) return `Error! ${error.message}`;

  const handleSubmitPokemon = () => {
    const checkNickname = state.bags.find(
      ({ nickname }) => nickname === stateNickname
    );
    if (checkNickname !== undefined) {
      setNotAvalNickname(true);
      return;
    }
    setNotAvalNickname(false);
    dispatch({
      type: ACTIONS.ADD,
      payload: { ...data.pokemon, nickname: stateNickname },
    });
    setCatchSummary(CATCH_SUCCESS);
    setIsModalOpen(false);
  };
  const handleOnClickPokeball = () => {
    const randomNumber = Math.floor(Math.random() * 20);
    if (!!!(randomNumber % 2)) {
      setIsModalOpen(true);
    } else {
      setCatchSummary(CATCH_FAILED);
    }
  };
  const handleOnClickMove = () => {
    setStateMenu("move");
  };
  const handleOnClickAbility = () => {
    setStateMenu("ability");
  };

  return (
    <>
      <Transition
        className="h-full flex-grow flex flex-col"
        show={stateMenu === "main"}
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
            <span className="text-xs text-gray-400">{catchSummary}</span>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className={`px-2 py-2 rounded-full border bg-white shadow-xl ${
                activePoke ? "shadow-inner" : ""
              }`}
              onClick={handleOnClickPokeball}
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
        show={stateMenu === "move"}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-400"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="grid grid-cols-3 gap-2">
          <Button title="Close" onClick={() => setStateMenu("main")} />
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
        show={stateMenu === "ability"}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-400"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="grid grid-cols-3 gap-2">
          <Button title="Close" onClick={() => setStateMenu("main")} />
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

      <Modal show={isModalOpen}>
        <div className="mx-auto flex justify-center">
          <div className="w-max px-4 py-4 flex flex-col justify-center rounded-lg bg-white border-2 border-yellow-400">
            <span className="mb-5 text-center text-lg font-semibold text-blue-500">
              {CATCH_SUCCESS}
            </span>
            <span className="mb-5 text-center text-gray-400 text-sm capitalize">
              ๑ {data.pokemon.name} ๑
            </span>
            <label
              htmlFor="nickname"
              className="mb-2 text-center font-medium text-gray-700"
            >
              Enter Pokemon's Nickname
            </label>
            <input
              type="text"
              name="nickname"
              id="nickname"
              className=" w-full mb-4 px-2 py-2 border border-yellow-400 rounded focus:ring focus:ring-blue-100 text-lg"
              placeholder="My Pokemon"
              onChange={(e) => setStateNickname(e.target.value)}
            />
            {notAvalNickname && (
              <span className="mb-3 text-red-500 text-sm">
                Nickname already in used
              </span>
            )}
            <Button
              title="Save"
              optClass="mb-2"
              onClick={handleSubmitPokemon}
            />
            <Button
              title="Close"
              color="bg-white"
              textColor="text-red-500"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PokemonDetail;
