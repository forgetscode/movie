import React from "react";

interface Props {
  movieTitle: string;
}

export const WatchButton: React.FC<Props> = ({ movieTitle }) => {
  const url = `https://www6.f2movies.to/search/${movieTitle.replace(/\s+/g, '-')}`;

  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <button
      className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      onClick={handleClick}
    >
      Watch
    </button>
  );
};

export default WatchButton;