const ACTIONS = {
  CHANGE_TAB: "change-tab",
  ADD_TMP: "add-tmp",
  ADD: "add",
  REMOVE: "remove",
};

const Reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_TAB:
      return {
        ...state,
        currentTab: action.payload,
      };

    case ACTIONS.ADD_TMP:
      return {
        ...state,
        tmpPokemon: action.payload,
      };

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
      return {
        ...state,
        ownedList: dataAddOwned,
        bags: [...state.bags, action.payload],
      };

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
      return {
        ...state,
        ownedList: dataRemoveOwned,
        bags: state.bags.filter(
          ({ nickname }) => nickname !== action.payload.nickname
        ),
      };

    default:
      return state;
  }
};

export { ACTIONS };
export default Reducer;
