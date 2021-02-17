import React from "react";

import svgVolumeMute from "../assets/volume-mute.svg";
import svgVolumeUp from "../assets/volume-up.svg";
import svgInfoCircle from "../assets/info-circle.svg";

function AppBar({ title, volumeState, onInfoClick, onMusicClick }) {
  return (
    <header className="shadow-inset-b fixed w-full px-6 py-4 flex justify-between items-center bg-yellow-300 shadow-md">
      <button type="button" onClick={onInfoClick}>
        <img
          className="w-6 h-6 ss:w-5 ss:h-5 object-contain"
          src={svgInfoCircle}
          alt="info"
        ></img>
      </button>
      <span className="heading text-sm font-bold text-blue-500 tracking-tighter">
        {title}
      </span>
      <button type="button" onClick={onMusicClick}>
        <img
          className="w-7 h-7 ss:w-5 ss:h-5 object-contain"
          src={volumeState ? svgVolumeUp : svgVolumeMute}
          alt="music-button"
        ></img>
      </button>
    </header>
  );
}

export default AppBar;
