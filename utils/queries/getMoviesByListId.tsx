import { supabase } from "../supabase";

export interface Movie {
    id: number;
    title: string;
    backdrop_path: string;
    media_type?: string;
    release_date?: string;
    first_air_date: string;
    genre_ids: string;
    name: string;
    origin_country: string;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
  }
  

export async function getMoviesByListId(movieListId: number): Promise<Movie[] | null> {
    try {
      const { data, error } = await supabase.rpc('get_movies_by_list_id', {
        p_movie_list_id: movieListId,
      });
  
      if (error) {
        console.error('Error fetching movies:', error.message);
        return null;
      }
  
      if (!data) {
        console.warn('No movies found for the given list ID');
        return null;
      }
  
      return data;
    } catch (error) {
      console.error('Error fetching movies:');
      return null;
    }
  }