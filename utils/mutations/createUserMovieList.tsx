import { supabase } from '../supabase'

async function createNewUserMovieList(userId: string): Promise<void> {

    const { data, error } = await supabase.rpc('create_user_movie_list', { new_user_id: userId });

    if (error) {
        console.log('Error creating user_movie_list:', error.message);
    } else {
    }
}

export { createNewUserMovieList };
