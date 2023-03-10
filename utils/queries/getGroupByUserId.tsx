import { supabase } from '../supabase';

type Group = {
    group_id: string;
    group_name: string;
    group_description: string;
  };
  

async function getGroupsByUserId(userId: string): Promise<Group[] | null> {
    const { data, error } = await supabase.rpc('get_groups_by_user_id', {
        query_id: userId,
    });

    if (error) {
        console.error(error);
        return null;
    }

    return data as Group[];
}

export default getGroupsByUserId;
