import React from "react";

import "./AppBar.css";

function AppBar({ title }) {
  return (
    <header className="py-3 ss:py-2 bg-yellow-300 shadow-md text-center text-lg ss:text-base text-blue-700">
      <span>{title}</span>
    </header>
  );
}

export default AppBar;
