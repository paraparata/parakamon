import React from "react";

import svgVolumeMute from "../assets/volume-mute-fill.svg";
import svgVolumeUp from "../assets/volume-up-fill.svg";
import svgInfo from "../assets/info-square-fill.svg";

function AppBar({ title, volumeState, onInfoClick, onMusicClick }) {
  return (
    <header className="fixed w-full px-6 py-4 flex justify-between items-center bg-yellow-300 shadow-md">
      <button type="button" onClick={onInfoClick}>
        <img
          className="w-5 h-5 ss:w-8 ss:h-8 object-contain"
          src={svgInfo}
          alt="info"
        ></img>
      </button>
      <span className="heading text-sm font-bold text-blue-500 tracking-tighter">
        {title}
      </span>
      <button type="button" onClick={onMusicClick}>
        <img
          className="w-6 h-6 ss:w-8 ss:h-8 object-contain"
          src={volumeState ? svgVolumeUp : svgVolumeMute}
          alt="music-button"
        ></img>
      </button>
    </header>
  );
}

export default AppBar;
