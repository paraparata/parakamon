import React, { useState, useContext } from "react";
import { Context, ACTIONS } from "../stores/Store";
import { useGetPokemon } from "../utils/hookPokemon";

import ButtonCircle from "../components/shared/ButtonCircle";
import CardPokemon from "../components/shared/CardPokemon";
import LoadSpinner from "../components/LoadSpinner";
import ModalDetail from "../components/ModalDetail";
import ModalNewPokemon from "../components/ModalNewPokemon";

import svgPokeball from "../assets/pokeball.svg";
import svgInfoCard from "../assets/credit-card-2-front.svg";
import svgArrow from "../assets/arrow-clockwise.svg";
import audioSucceedFile from "../assets/catch-succeed.mp3";
import audioFailedFile from "../assets/catch-failed.mp3";

const HINT = "Press Pokeball To Catch The Pokemon!";
const CATCH_SUCCESS = "You Got A New Pokemon!";
const CATCH_FAILED = "Try Again";
const POKEMON_ANIM = ["wiggle", "blitz", "animate-bounce"];
const initialCatchResult = {
  text: HINT,
  anim: POKEMON_ANIM[0],
};

const audioSucceed = new Audio();
const audioFailed = new Audio();
audioSucceed.src = audioSucceedFile;
audioFailed.src = audioFailedFile;
audioSucceed.volume = 0.5;
audioFailed.volume = 0.5;

function PokemonDetailComp({ randomPokemon, onRefetch }) {
  const [activePoke, setActivePoke] = useState(false);
  const [catchResult, setCatchResult] = useState(initialCatchResult);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [stateNickname, setStateNickname] = useState("");
  const [notAvalNickname, setNotAvalNickname] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFirstDetailTab, setIsFirstDetailTab] = useState(true);

  const { state, dispatch } = useContext(Context);
  const paramsPokemon = !!state.tmpPokemon ? state.tmpPokemon : randomPokemon;
  const { loading, error, data } = useGetPokemon({
    name: paramsPokemon,
  });

  if (loading)
    return (
      <div className="h-full flex-grow flex justify-center items-center">
        <LoadSpinner />{" "}
      </div>
    );
  if (error) return `Error! ${error.message}`;

  const handleSavePokemon = () => {
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
    setCatchResult(initialCatchResult);
    setIsNewOpen(false);
  };
  const handleOnClickPokeball = () => {
    const randomNumber = Math.floor(Math.random() * 20);
    if (!!!(randomNumber % 2)) {
      audioSucceed.play();
      setCatchResult({ text: CATCH_SUCCESS, anim: POKEMON_ANIM[2] });
      setTimeout(() => {
        setIsNewOpen(true);
      }, 1200);
    } else {
      audioFailed.play();
      setCatchResult({ text: CATCH_FAILED, anim: POKEMON_ANIM[1] });
      setTimeout(() => {
        setCatchResult(initialCatchResult);
      }, 1200);
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
  const handleOnCloseNewPokemon = () => {
    setCatchResult(initialCatchResult);
    setIsNewOpen(false);
  };

  return (
    <>
      <div className="flex-grow flex flex-col justify-center items-center">
        <CardPokemon
          name={data.pokemon.name}
          types={data.pokemon.types}
          img={data.pokemon.sprites.front_default}
          imgWidth="w-56 ss:w-28"
          imgHeight="h-56 ss:h-28"
          pokemonAnim={catchResult.anim}
        />
      </div>
      <div className="mb-8 flex-grow-0">
        <div className="mb-2 flex justify-center">
          <span className="text-xs text-gray-400">{catchResult.text}</span>
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

      <ModalDetail
        show={isDetailOpen}
        data={data.pokemon}
        isFirstTab={isFirstDetailTab}
        onClickMoves={handleOnClickMoves}
        onClickAbilities={handleOnClickAbilities}
        onClose={() => setIsDetailOpen(false)}
      />

      <ModalNewPokemon
        title={CATCH_SUCCESS}
        show={isNewOpen}
        data={data.pokemon}
        nicknameState={(e) => setStateNickname(e.target.value)}
        warning={notAvalNickname}
        onSave={handleSavePokemon}
        onClose={handleOnCloseNewPokemon}
      />
    </>
  );
}

export default PokemonDetailComp;
