import { supabase } from "../../utils/supabase";

async function removeUserMovieMapping(movieId: number, userMovieListId: number): Promise<void> {
  const { error } = await supabase.rpc("remove_user_movie_mapping", { new_movie_id: movieId, new_user_movie_list_id: userMovieListId });
  if (error) {
    console.error("Error removing user movie mapping:", error.message);
    throw new Error("Error removing user movie mapping");
  } else {
    //console.log("User movie mapping removed successfully");
  }
}

export {removeUserMovieMapping}