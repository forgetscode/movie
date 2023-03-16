import { useState } from "react";
import { notifySuccess } from "../Toast";

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
    movie: Movie;
  }
  

  export const AlterListButton: React.FC<Props> = ({ movie }) => {
    const [inList, setInList] = useState(false);
  
    const handleAddToList = async () => {
      setInList(true);
      notifySuccess("Added to list");
      // call Supabase RPC function to add movie to user's list
    };
  
    const handleRemoveFromList = async () => {
      setInList(false);
      notifySuccess("Removed from list");
      // call Supabase RPC function to remove movie from user's list
    };
  
    const addButtonLabel = inList ? "Remove from list" : "Add to list";
  
    return (
        <button
            className={`${
            inList
                ? "border-red-500 text-red-500 focus:ring-red-500 hover:border-red-600 hover:text-red-600"
                : "border-blue-500 text-blue-500 focus:ring-blue-500 hover:border-blue-600 hover:text-blue-600"
            } px-6 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            onClick={inList ? handleRemoveFromList : handleAddToList}
        >
            {addButtonLabel}
      </button>
    );
  }