import React from "react";

function CardThumbnail({
  image,
  capitalizeTitle = true,
  title,
  subtitle = "",
  detail,
  handleClick = () => {},
  children,
}) {
  return (
    <div className="w-full px-2 py-2 rounded bg-white shadow focus:shadow-inner focus:ring focus:ring-blue-100">
      <div
        className="px-1 py-1 flex justify-center items-center"
        onClick={handleClick}
      >
        <img
          className="w-20 h-20 ss:w-12 ss:h-12 object-contain"
          src={image}
          alt={title}
        ></img>
      </div>
      <div className="flex flex-col text-center">
        <span
          className={`text-sm font-medium ${capitalizeTitle && "capitalize"}`}
        >
          {title}
        </span>
        {subtitle && (
          <span className="text-gray-400 text-xs capitalize">{subtitle}</span>
        )}
        <span className="text-sm ">{detail}</span>
      </div>
      {children}
    </div>
  );
}

export default CardThumbnail;
