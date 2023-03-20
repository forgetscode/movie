import { supabase } from "../supabase";


export const createGroupMovieListByGroupId = async (groupId: string) => {
  const { data, error } = await supabase.rpc('create_group_movie_list', { p_group_id: groupId });

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};