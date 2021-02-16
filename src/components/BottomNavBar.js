import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context, ACTIONS } from "../stores/Store";

const shadowInsetB = {
  boxShadow: "inset 0px -0.25rem 0px 0px #00000033",
};

function BottomNavBar({ tabs }) {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();

  const handleActive = (route, index) => {
    dispatch({ type: ACTIONS.CHANGE_TAB, payload: index });
    history.push(route);
  };

  return (
    <nav
      className="fixed bottom-0 w-full pt-3 pb-5 flex bg-yellow-300"
      style={shadowInsetB}
    >
      {tabs.map((tab, index) => {
        return (
          <div key={index} className="flex-1 flex justify-center">
            <button
              type="button"
              className={`px-2 py-2 rounded-full border bg-white shadow-xl ${
                state.currentTab === index && "ring ring-blue-400 shadow-inner"
              }`}
              onClick={() => handleActive(tab.route, index)}
            >
              <img
                className="w-10 h-10 ss:w-8 ss:h-8 object-contain"
                src={tab.icon}
                alt={tab.name}
              ></img>
            </button>
          </div>
        );
      })}
    </nav>
  );
}

export default BottomNavBar;
