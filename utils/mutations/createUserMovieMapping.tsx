import { supabase } from "../../utils/supabase";

async function createUserMovieMapping(movieId: number, userMovieListId: number): Promise<void | Boolean> {
  const { error } = await supabase.rpc("create_user_movie_mapping", 
  { new_movie_id: movieId, new_user_movie_list_id: userMovieListId });
  if (error) {
    console.error("Error creating user movie mapping:", error.message);
    return false;
  } else {
    console.log("User movie mapping created successfully");
  }
}

export {createUserMovieMapping}