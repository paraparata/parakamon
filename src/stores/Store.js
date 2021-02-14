import React, { createContext, useReducer } from "react";
import Reducer, { ACTIONS } from "./Reducer";

const initialState = {
  currentTab: 1,
  tmpPokemon: "",
  ownedList: [],
  bags: [],
};
const Context = createContext(initialState);

function Store({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

export { Context, ACTIONS };
export default Store;
