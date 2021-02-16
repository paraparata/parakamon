import React from "react";

function Button({
  title,
  color = "bg-yellow-300",
  textColor = "text-gray-700",
  optClass = "",
  onClick,
}) {
  return (
    <button
      type="button"
      className={`${optClass} px-2 py-1 rounded ${color} ${textColor} border focus:ring-2 focus:ring-offset-blue-400 shadow focus:shadow-inner font-medium`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
