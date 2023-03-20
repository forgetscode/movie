import { supabase } from "../supabase";
import { Movie } from '../../typings';

export async function getMoviesByGroupMovieListId(groupMovieListId: number): Promise<Movie[] | null> {
  try {
    const { data, error } = await supabase.rpc('get_movies_by_group_movie_list_id', {
      p_group_movie_list_id: groupMovieListId,
    });

    if (error) {
      console.error('Error fetching movies:', error.message);
      return null;
    }

    if (!data) {
      console.warn('No movies found for the given group movie list ID');
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return null;
  }
}
