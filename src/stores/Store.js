import React, { createContext, useReducer } from "react";
import Reducer, { ACTIONS, STORAGE_KEY } from "./Reducer";
import { getPersistState } from "../utils/persistUtil";

const initialState = (() => {
  const savedState = getPersistState(STORAGE_KEY);
  if (!savedState) {
    return {
      currentTab: 1,
      tmpPokemon: "",
      ownedList: [],
      bags: [],
    };
  }
  return savedState;
})();
const Context = createContext(initialState);

function Store({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

export { Context, ACTIONS };
export default Store;
