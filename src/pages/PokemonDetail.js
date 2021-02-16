import React, { useState, useContext } from "react";
import { Context, ACTIONS } from "../stores/Store";
import { useGetPokemon, useGetPokemons } from "../utils/hookPokemon";

import Button from "../components/shared/Button";
import ButtonCircle from "../components/shared/ButtonCircle";
import CardPokemon from "../components/shared/CardPokemon";
import LoadSpinner from "../components/LoadSpinner";
import Modal from "../components/shared/Modal";

import svgPokeball from "../assets/pokeball.svg";
import svgInfoCard from "../assets/credit-card-2-front.svg";
import svgArrow from "../assets/arrow-clockwise.svg";

const HINT = "Press Pokeball To Catch The Pokemon!";
const CATCH_SUCCESS = "You Got A New Pokemon!";
const CATCH_FAILED = "Try Again";

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
    <PokemonDetailC
      randomPokemon={data.pokemons.results[0].name}
      onRefetch={handleOnRefetch}
    />
  );
}

function PokemonDetailC({ randomPokemon, onRefetch }) {
  const [activePoke, setActivePoke] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFirstDetailTab, setIsFirstDetailTab] = useState(true);
  const [catchSummary, setCatchSummary] = useState(HINT);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateNickname, setStateNickname] = useState("");
  const [notAvalNickname, setNotAvalNickname] = useState(false);

  const { state, dispatch } = useContext(Context);
  const paramsPokemon = !!state.tmpPokemon ? state.tmpPokemon : randomPokemon;
  const { loading, error, data } = useGetPokemon({
    name: paramsPokemon,
  });

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
  const handleOnDetail = () => {
    setIsDetailOpen(true);
  };
  const handleOnRefresh = () => {
    dispatch({ type: ACTIONS.ADD_TMP, payload: false });
    onRefetch();
  };
  const handleOnClickMoves = () => {
    setIsFirstDetailTab(true);
  };
  const handleOnClickAbilities = () => {
    setIsFirstDetailTab(false);
  };

  return (
    <>
      <div className="flex-grow flex flex-col justify-center items-center">
        <CardPokemon
          name={data.pokemon.name}
          types={data.pokemon.types}
          img={data.pokemon.sprites.front_default}
          imgWidth="w-56 ss:w-24"
          imgHeight="h-56 ss:h-24"
        />
      </div>
      <div className="mb-8 flex-grow-0">
        <div className="mb-2 flex justify-center">
          <span className="text-xs text-gray-400">{catchSummary}</span>
        </div>
        <div className="flex justify-around">
          <div className="flex justify-center items-center">
            <ButtonCircle icon={svgInfoCard} onClick={handleOnDetail} />
          </div>
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
          <div className="flex justify-center items-center">
            <ButtonCircle icon={svgArrow} onClick={handleOnRefresh} />
          </div>
        </div>
      </div>

      <Modal show={isDetailOpen}>
        <div className="mx-auto flex justify-center">
          <div className="w-11/12 px-4 py-4 flex flex-col justify-center rounded-lg bg-white border-2 border-yellow-500">
            <span className="heading mb-2 text-xs text-center text-yellow-500">
              Pokemon Detail
            </span>
            <hr className="mb-2 " />
            <CardPokemon
              name={data.pokemon.name}
              types={data.pokemon.types}
              img={data.pokemon.sprites.front_default}
              imgWidth="w-20 ss:w-14"
              imgHeight="h-20 ss:h-14"
            />
            <div className="w-full mx-auto my-4">
              <div className="w-full flex">
                <Button
                  title="Moves"
                  color={isFirstDetailTab ? "bg-yellow-400" : "bg-yellow-300"}
                  optClass="flex-1"
                  onClick={handleOnClickMoves}
                />
                <Button
                  title="Abilities"
                  color={!isFirstDetailTab ? "bg-yellow-400" : "bg-yellow-300"}
                  optClass="flex-1"
                  onClick={handleOnClickAbilities}
                />
              </div>
              <div className="w-full h-56 ss:h-36 flex flex-col rounded border-2 border-yellow-300 overflow-y-scroll">
                {isFirstDetailTab
                  ? data.pokemon.moves.map((move, index) => {
                      return (
                        <div key={index} className="text-center">
                          <span className="py-1 text-sm font-medium capitalize">
                            {move.move.name}
                          </span>
                          <hr />
                        </div>
                      );
                    })
                  : data.pokemon.abilities.map((ability, index) => {
                      return (
                        <div key={index} className="text-center">
                          <span className="py-1 text-sm font-medium capitalize">
                            {ability.ability.name}
                          </span>
                          <hr />
                        </div>
                      );
                    })}
              </div>
            </div>
            <Button
              title="Close"
              color="bg-white"
              textColor="text-red-500"
              onClick={() => setIsDetailOpen(false)}
            />
          </div>
        </div>
      </Modal>

      <Modal show={isModalOpen}>
        <div className="mx-auto flex justify-center">
          <div className="w-11/12 px-4 py-4 flex flex-col justify-center rounded-lg bg-white border-2 border-yellow-500">
            <span className="heading mb-2 text-center text-xs text-yellow-500">
              {CATCH_SUCCESS}
            </span>
            <hr className="mb-5 " />
            <span className="heading mb-5 flex justify-center text-sm font-semibold text-gray-700 capitalize">
              {data.pokemon.name}
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
