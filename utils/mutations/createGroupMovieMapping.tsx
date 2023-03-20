import { supabase } from "../supabase";

export async function addGroupMovieListMapping(movieId:number, groupMovieListId:number): Promise<Boolean> {
    const { data, error } = await supabase.rpc('add_movie_to_group', {
      p_movie_id: movieId,
      p_group_movie_list_id: groupMovieListId,
    });
    if (error) {
      console.error('Error adding group movie list mapping:', error);
    } else {
      //console.log('Group movie list mapping added successfully');
    }
    return data;
  }
  