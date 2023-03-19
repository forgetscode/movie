import React, { useState } from "react";
import { AlterListButton } from "./Buttons/AlterListButton";
import { GroupListButton } from "./Buttons/GroupListButton";
import WatchButton from "./Buttons/WatchButton";
import Thumbnail from "./Thumbnail";

export interface Movie {
  title: string
  backdrop_path: string
  media_type?: string
  release_date?: string
  first_air_date: string
  genre_ids: number[]
  id: number
  name: string
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}

interface Props {
  movie: Movie 
  clickable?: boolean
  modal?: boolean
}

function Card({movie, clickable = true, modal = false}: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const overviewText = movie.overview.length > 300 ? (expanded ? movie.overview : `${movie.overview.slice(0, 300)}...`) : movie.overview;

  return (
    <div className="max-w-[800px] flex flex-col p-4 rounded-lg bg-zinc-900 shadow-lg shadow-gray-900">
      <div className="h-full pb-2 md:pb-0 flex flex-row items-center">
        <div className={`${clickable ? 'cursor-pointer' : ''}`} style={{ pointerEvents: clickable ? 'auto' : 'none' }}>
          <Thumbnail movie={movie} />
        </div>
        <h1 className="text-3xl font-black mb-2 text-white text-center w-full h-full px-2">
          {movie.title ? movie.title : movie.name}
        </h1>
      </div>
      <div className="w-full mx-auto">
        <p className="text-gray-500 text-base py-5">
          {overviewText}
          {movie.overview.length > 300 && (
            <button onClick={toggleExpansion} className="text-blue-500 hover:underline">
              {expanded ? "less" : "more"}
            </button>
          )}
        </p>
        <div className="flex flex-row space-x-2 justify-between pb-5">
          <p className="text-blue-500 text-lg font-black">Rating: {movie.vote_average.toFixed(1)}/10</p>
          <p className="text-white text-lg font-black">{movie.release_date?.slice(0, 4)}</p>
        </div>
        <hr className="border-b border-gray-600"/>
        <div className="flex space-x-4 pt-5 justify-between">
          <div className="flex space-x-4">
            <WatchButton movieTitle={movie.title ? movie.title : movie.name}/>
            <AlterListButton movie={movie} />
          </div>
          <div>
            <GroupListButton up={modal}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
