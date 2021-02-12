import React from "react";

const styleTitleFont = {
  fontFamily: "'Fredoka One', cursive",
};

function AppBar({ title }) {
  return (
    <header className="px-4 py-3 ss:py-2 flex justify-between items-center bg-yellow-300 shadow-md">
      <span
        className="text-lg ss:text-base text-blue-700 tracking-tighter"
        style={styleTitleFont}
      >
        {title}
      </span>
      <span className="text-sm font-medium text-gray-700">Tab Name</span>
    </header>
  );
}

export default AppBar;
