import React from "react";

function CardThumbnail({ image, title, detail, handleClick }) {
  return (
    <button
      className="w-full px-2 py-2 rounded bg-white shadow focus:shadow-inner focus:ring focus:ring-blue-100"
      onClick={handleClick}
    >
      <div className="px-2 py-2 flex justify-center items-center">
        <img
          className="w-10 h-10 ss:w-8 ss:h-8 object-contain"
          src={image}
          alt={title}
        ></img>
      </div>
      <div className="flex flex-col text-center">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-sm ">{detail}</span>
      </div>
    </button>
  );
}

export default CardThumbnail;
