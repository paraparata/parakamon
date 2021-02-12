import React from "react";

function LoadCardThumbnail() {
  return (
    <div className="animate-pulse w-full px-2 py-2 rounded bg-white shadow">
      <div className="px-1 py-1 flex justify-center items-center">
        <div className="rounded-full bg-yellow-200 w-20 h-20 ss:w-12 ss:h-12"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-yellow-200 rounded"></div>
        <div className="h-4 bg-yellow-200 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export default LoadCardThumbnail;
