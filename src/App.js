import React, { lazy, Suspense, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Store from "./stores/Store";

import AppBar from "./components/AppBar";
import BottomNavBar from "./components/BottomNavBar";
import LoadSpinner from "./components/LoadSpinner";
import ModalAbout from "./components/ModalAbout";
import "./App.css";

import svgBackpack from "./assets/backpack.svg";
import svgCamera from "./assets/camera.svg";
import svgPikachu from "./assets/pikachu.svg";
import audioBacksound from "./assets/parakamon-music.mp3";

const PokemonDetail = lazy(() => import("./pages/PokemonDetail"));
const PokemonList = lazy(() => import("./pages/PokemonList"));
const MyPokemonList = lazy(() => import("./pages/MyPokemonList"));

const TABS = [
  {
    name: "Pokemon List",
    icon: svgPikachu,
    route: "/pokemon-list",
  },
  {
    name: "Pokemon Detail",
    icon: svgCamera,
    route: "/",
  },
  {
    name: "My Pokemon List",
    icon: svgBackpack,
    route: "/my-pokemon",
  },
];

const audio = new Audio();
audio.src = audioBacksound;
audio.volume = 0.4;
audio.loop = true;

function App() {
  const [stateMusic, setStateMusic] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleAbout = () => {
    setIsAboutOpen(!isAboutOpen);
  };
  const handleMusic = () => {
    if (!stateMusic) {
      audio.play();
      setStateMusic(true);
    } else {
      audio.pause();
      audio.currentTime = 0;
      setStateMusic(false);
    }
  };

  return (
    <Store>
      <Suspense fallback={<LoadSpinner />}>
        <div className="w-screen min-h-screen flex flex-col">
          <AppBar
            title="Parakemon"
            volumeState={stateMusic}
            onInfoClick={handleAbout}
            onMusicClick={handleMusic}
          />
          <main
            className="mb-24 ss:mb-20 w-full px-2 py-2 flex-grow flex flex-col"
            role="main"
            style={{ marginTop: "48px" }}
          >
            <Switch>
              <Route path="/" exact component={PokemonDetail} />
              <Route path="/pokemon-list" exact component={PokemonList} />
              <Route path="/my-pokemon" exact component={MyPokemonList} />
            </Switch>
            <ModalAbout show={isAboutOpen} onClose={() => handleAbout()} />
          </main>
          <BottomNavBar tabs={TABS} />
        </div>
      </Suspense>
    </Store>
  );
}

export default App;
