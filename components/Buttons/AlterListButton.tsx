import { useEffect, useState } from "react";
import addMovieToDatabase from "../../utils/mutations/addMovie";
import { createUserMovieMapping } from "../../utils/mutations/createUserMovieMapping";
import { removeUserMovieMapping } from "../../utils/mutations/removeUserMovieMapping";
import { notifyFailure, notifySuccess } from "../Toast";
import { useMovies } from "../../context/useMovies";
import { Movie } from "../../typings";
import { useUser } from "../../context/useUser";


interface Props {
    movie: Movie;
}

  export const AlterListButton: React.FC<Props> = ({ movie }) => {
    const [inList, setInList] = useState(false);
    const { user } = useUser()
    const {userMovieList, movies, loadingMovies, updateMovies} = useMovies();

    useEffect(() => {
      if (movies){
        if (movies.some((m) => m.id === movie.id)) {
          setInList(true);
        }
      }
    }, []);

    const handleAddToList = async () => {
      if(!user){
        notifyFailure("Must be signed in.");
      }
      if (userMovieList) {
        try{
          addMovieToDatabase(movie);
          const res = await createUserMovieMapping(movie.id, userMovieList?.id!);
          if (res === false){
            notifyFailure("Error adding to list");
          }
          setInList(true);
          updateMovies((update) => !update);
          notifySuccess("Added to list!");
        }
        catch (error) {
          console.log(error);
        }
      }
    };
  
    const handleRemoveFromList = async () => {
      if (userMovieList) {
        try{
          setInList(false);
          await removeUserMovieMapping(movie.id, userMovieList?.id!);
          updateMovies((update) => !update);
          notifySuccess("Removed from list");
        } catch (error) {
          notifyFailure("Error removing from list");
          console.log(error);
        }
      }
    };
  
    const addButtonLabel = inList ? "Remove from list" : "Add to list";

    if (loadingMovies) {
      return( 
        <button className=" border-blue-500 text-blue-500 focus:ring-blue-500 hover:border-blue-600 hover:text-blue-600
        px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 text-xs sm:text-base border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 text-transparent">
          Add to list
        </button>
      );
    }
    
    else{
      return (
          <button
              className={`${
              inList
                  ? "border-white text-white focus:ring-white hover:border-gray-400 hover:text-gray-400"
                  : "border-blue-500 text-blue-500 focus:ring-blue-500 hover:border-blue-600 hover:text-blue-600"
              }min-w-2 p-2 sm:px-5 sm:py-2 md:px-6 md:py-3 text-sm sm:text-base border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              onClick={inList ? handleRemoveFromList : handleAddToList}
          >
              {addButtonLabel}
        </button>
      );
    }
  }