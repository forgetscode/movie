import React from "react";
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
}

function Card({movie}: Props) {
    console.log(movie)
    return (
        <div className="max-w-[800px] flex flex-col p-4 rounded-lg shadow-lg bg-gray-800">
            <div className="h-full pb-2 md:pb-0 flex flex-row items-center">
                <Thumbnail movie={movie} />
                <h1 className="text-3xl font-black mb-2 text-white text-center w-full h-full px-2">
                    {movie.title}
                </h1>
            </div>
            <div className="w-full mx-auto">
                <p className="text-gray-500 text-base py-5">{movie.overview}</p>
                <div className="flex flex-row space-x-2 justify-between pb-5">
                    <p className="text-blue-500 text-lg font-black">Rating: {movie.vote_average.toFixed(1)}/10</p>
                    <p className="text-white text-lg font-black">{movie.release_date?.slice(0, 4)}</p>
                </div>
                <hr className="border-b border-gray-600"/>
                <div className="flex space-x-4 pt-5 justify-between">
                    <div className="flex space-x-4">
                        <WatchButton movieTitle={movie.title}/>
                        <AlterListButton movie={movie} />
                    </div>
                    <div>
                        <GroupListButton />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;