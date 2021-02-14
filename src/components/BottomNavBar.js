import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context, ACTIONS } from "../stores/Store";

function BottomNavBar({ tabs }) {
  const { dispatch } = useContext(Context);
  const history = useHistory();

  const handleActive = (route, index) => {
    dispatch({ type: ACTIONS.CHANGE_TAB, payload: index });
    history.push(route);
  };

  return (
    <nav className="fixed bottom-0 w-full pb-4 flex bg-gradient-to-b from-transparent via-yellow-300 to-yellow-400">
      {tabs.map((tab, index) => {
        return (
          <div key={index} className="flex-1 flex justify-center">
            <button
              type="button"
              className="px-2 py-2 rounded-full border bg-white shadow-xl focus:ring focus:ring-blue-400 focus:shadow-inner"
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
