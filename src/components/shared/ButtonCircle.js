import React, { useState } from "react";

function ButtonCircle({ icon, onClick }) {
  const [isActive, setIsActive] = useState(false);

  const handleOnClick = () => {
    onClick();
  };

  return (
    <button
      type="button"
      className={`px-2 py-2 rounded-full border bg-yellow-300 shadow-lg ${
        isActive ? "shadow-inner" : ""
      }`}
      onClick={handleOnClick}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
    >
      <img
        className="w-8 h-8 ss:w-8 ss:h-8 object-contain"
        src={icon}
        alt="music-button"
      ></img>
    </button>
  );
}

export default ButtonCircle;
