import { setPersistState } from "../utils/persistUtil";

const STORAGE_KEY = "parakamon_data";
const ACTIONS = {
  CHANGE_TAB: "change-tab",
  ADD_TMP: "add-tmp",
  ADD: "add",
  REMOVE: "remove",
};

const Reducer = (state, action) => {
  let result;
  switch (action.type) {
    case ACTIONS.CHANGE_TAB:
      result = {
        ...state,
        currentTab: action.payload,
      };
      setPersistState(STORAGE_KEY, result);
      return result;

    case ACTIONS.ADD_TMP:
      result = {
        ...state,
        tmpPokemon: action.payload,
      };
      setPersistState(STORAGE_KEY, result);
      return result;

    case ACTIONS.ADD:
      let isOwnedAdd;
      state.ownedList.forEach((v) => {
        if (v.name === action.payload.name) {
          v.own += 1;
          isOwnedAdd = true;
        }
      });
      const dataAddOwned = isOwnedAdd
        ? [...state.ownedList]
        : [...state.ownedList, { name: action.payload.name, own: 1 }];
      result = {
        ...state,
        ownedList: dataAddOwned,
        bags: [...state.bags, action.payload],
      };
      setPersistState(STORAGE_KEY, result);
      return result;

    case ACTIONS.REMOVE:
      let isOwnedRemove;
      state.ownedList.forEach((v) => {
        if (v.name === action.payload.name) {
          if (v.own > 1) {
            v.own -= 1;
            isOwnedRemove = true;
          }
        }
      });
      const dataRemoveOwned = isOwnedRemove
        ? [...state.ownedList]
        : state.ownedList.filter(({ name }) => name !== action.payload.name);
      result = {
        ...state,
        ownedList: dataRemoveOwned,
        bags: state.bags.filter(
          ({ nickname }) => nickname !== action.payload.nickname
        ),
      };
      setPersistState(STORAGE_KEY, result);
      return result;

    default:
      return state;
  }
};

export { ACTIONS, STORAGE_KEY };
export default Reducer;
