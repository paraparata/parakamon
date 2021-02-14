import { Route, Switch } from "react-router-dom";
import Store from "./stores/Store";

import AppBar from "./components/AppBar";
import BottomNavBar from "./components/BottomNavBar";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import MyPokemonList from "./pages/MyPokemonList";
import "./App.css";

import svgBackpack from "./assets/backpack.svg";
import svgCamera from "./assets/camera.svg";
import svgPikachu from "./assets/pikachu.svg";

const tabs = [
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

function App() {
  return (
    <Store>
      <div className="w-screen min-h-screen flex flex-col overflow-x-hidden overflow-y-scroll">
        <AppBar title="Pokemon Journey" tabs={tabs} />
        <main
          className="mb-24 ss:mb-20 w-full px-2 py-2 flex-grow flex flex-col"
          role="main"
        >
          <Switch>
            <Route path="/" exact component={PokemonDetail} />
            <Route path="/pokemon-list" exact component={PokemonList} />
            <Route path="/my-pokemon" exact component={MyPokemonList} />
          </Switch>
        </main>
        <BottomNavBar tabs={tabs} />
      </div>
    </Store>
  );
}

export default App;
