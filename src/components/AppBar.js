import React, { useContext } from "react";
import { Context } from "../stores/Store";

const styleTitleFont = {
  fontFamily: "'Fredoka One', cursive",
};

function AppBar({ title, tabs }) {
  const { state } = useContext(Context);

  return (
    <header className="px-4 py-3 ss:py-2 flex justify-between items-center bg-yellow-300 shadow-md">
      <span
        className="text-lg ss:text-base text-blue-700 tracking-tighter"
        style={styleTitleFont}
      >
        {title}
      </span>
      <span className="text-sm font-medium text-gray-700">
        {tabs[state.currentTab].name}
      </span>
    </header>
  );
}

export default AppBar;
