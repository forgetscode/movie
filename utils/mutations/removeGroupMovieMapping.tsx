import { supabase } from "../../utils/supabase";

async function removeGroupMovieMapping(movieId: number, groupMovieListId: number): Promise<Boolean> {
  const { data, error } = await supabase.rpc("remove_movie_from_group", { p_movie_id: movieId, p_group_movie_list_id: groupMovieListId });
  if (error) {
    console.error("Error removing group movie mapping:", error.message);
    throw new Error("Error removing group movie mapping");
  } else {
    //console.log("Group movie mapping removed successfully");
  }
  return data
}

export { removeGroupMovieMapping };
