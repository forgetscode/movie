import React, { useState } from "react";
import { AlterListButton } from "./Buttons/AlterListButton";
import { RemoveGroupListButton } from "./Buttons/RemoveGroupListButton";
import WatchButton from "./Buttons/WatchButton";
import { Movie } from "../typings";
import ThumbnailTitle from "./ThumbnailTitle";

interface Props {
  movie: Movie 
  groupMovieListId: number
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  clickable?: boolean
  modal?: boolean
}

function GroupListCard({movie, groupMovieListId, clickable = true, modal = false, setUpdate}: Props) {
  return (
    <div className="min-w-[300px] max-w-[500px] flex flex-col p-4 rounded-lg bg-zinc-900 shadow-lg shadow-gray-900">
      <div className="h-full w-full pb-2 md:pb-0 flex flex-row items-center justify-center">
        <div className={`${clickable ? 'cursor-pointer' : ''}`} style={{ pointerEvents: clickable ? 'auto' : 'none' }}>
          <ThumbnailTitle movie={movie} />
        </div>
      </div>
      <div className="w-full mx-auto">
        <div className="flex flex-row space-x-2 justify-between py-5 px-4">
          <p className="text-blue-500 text-lg font-black">Rating: {movie.vote_average.toFixed(1)}/10</p>
          <p className="text-white text-lg font-black">{movie.release_date ?  movie.release_date?.slice(0, 4) : movie.first_air_date.slice(0, 4)}</p>
        </div>
        <hr className="border-b border-gray-600 px-4"/>
        <div className="flex flex-row px-4 pb-4 space-y-4 space-x-4 pt-5 justify-between">
            <div className="flex space-x-4">
                <WatchButton movieTitle={movie.title ? movie.title : movie.name}/>
                <AlterListButton movie={movie} />
            </div>
            <div>
                <RemoveGroupListButton up={modal} movie={movie} groupMovieListId={groupMovieListId} setUpdate={setUpdate}/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default GroupListCard;
