import React from "react";

function CardThumbnail({ image, title, detail, handleClick }) {
  return (
    <button
      className="w-full px-2 py-2 rounded bg-white shadow focus:shadow-inner focus:ring focus:ring-blue-100"
      onClick={handleClick}
    >
      <div className="px-1 py-1 flex justify-center items-center">
        <img
          className="w-20 h-20 ss:w-12 ss:h-12 object-contain"
          src={image}
          alt={title}
        ></img>
      </div>
      <div className="flex flex-col text-center">
        <span className="text-sm font-medium capitalize">{title}</span>
        <span className="text-sm ">{detail}</span>
      </div>
    </button>
  );
}

export default CardThumbnail;
