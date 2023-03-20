import { supabase } from "../supabase";
import { Movie } from '../../typings';

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