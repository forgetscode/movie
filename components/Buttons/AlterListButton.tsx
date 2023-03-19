import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import addMovieToDatabase from "../../utils/mutations/addMovie";
import { createNewUserMovieList } from "../../utils/mutations/createUserMovieList";
import { createUserMovieMapping } from "../../utils/mutations/createUserMovieMapping";
import { removeUserMovieMapping } from "../../utils/mutations/removeUserMovieMapping";
import { getMoviesByListId } from "../../utils/queries/getMoviesByListId";
import getUserInfobyAuthId from "../../utils/queries/getUserInfoByAuthId";
import { supabase } from "../../utils/supabase";
import { notifyFailure, notifySuccess } from "../Toast";

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
  
type User = {
  id: string;
  name: string;
  auth_id: string;
};

interface UserMovieList {
  id: number;
  user_id: string;
}
  
interface Props {
    movie: Movie;
  }
  

  export const AlterListButton: React.FC<Props> = ({ movie }) => {
    const [inList, setInList] = useState(false);
    const [user, setUser] = useState<User | null>();
    const [userMovieList, setUserMovieList] = useState<any>();
    const [movies, setMovies ] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const session = useSession();

    useEffect(() => {
      const fetchData = async () => {
        if (session && session.user?.id) {
          const userData = await getUserInfobyAuthId(session.user.id);
          setUser(userData);
          if(user){
            createNewUserMovieList(userData!.id);
          }
          const { data, error } = await supabase
          .from("user_movie_list")
          .select("*")
          .eq("user_id", userData?.id)
          .limit(1);
  
          if (data && data.length > 0) {
            setUserMovieList(data);
            const movies = await getMoviesByListId(data[0].id)
            setMovies(movies);
            if (movies) {
              setInList(movies.some((m) => m.id === movie.id));
            }
          }
        }
        setLoading(false);
      };
      fetchData();
    }, [session, inList]);
    

    const handleAddToList = async () => {
      if (session && session.user?.id) {
        try{
          addMovieToDatabase(movie);
          const res = await createUserMovieMapping(movie.id, userMovieList[0].id);
          if (res === false){
            notifyFailure("Error adding to list");
          }
          setInList(true);
          notifySuccess("Added to list");
        }
        catch (error) {
          console.log(error);
        }
      }
    };
  
    const handleRemoveFromList = async () => {
      try{
        setInList(false);
        await removeUserMovieMapping(movie.id, userMovieList[0].id);
        notifySuccess("Removed from list");
      } catch (error) {
        notifyFailure("Error removing from list");
        console.log(error);
      }
    };
  
    const addButtonLabel = inList ? "Remove from list" : "Add to list";

    if (loading) {
      return( 
        <button className=" border-blue-500 text-blue-500 focus:ring-blue-500 hover:border-blue-600 hover:text-blue-600
        p-2 sm:px-6 sm:py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 text-transparent">
          Add to list
        </button>
      );
    }
    
    else{
      return (
          <button
              className={`${
              inList
                  ? "border-white text-white focus:ring-white hover:border-white hover:text-white"
                  : "border-blue-500 text-blue-500 focus:ring-blue-500 hover:border-blue-600 hover:text-blue-600"
              } p-2 sm:px-6 sm:py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              onClick={inList ? handleRemoveFromList : handleAddToList}
          >
              {addButtonLabel}
        </button>
      );
    }
  }