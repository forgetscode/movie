import { supabase } from '../supabase'

type User = {
    id: string
    name: string
    auth_id:string
}

type Group = {
    group_id: string;
    group_name: string;
    group_description: string;
  };

async function joinGroupByUser(userId: string, groupId: string): Promise<void> {
  const { error } = await supabase.rpc('join_user_to_group', {
    userid: userId,
    groupid: groupId
  })

  if (error) {
    console.error(error)
    throw new Error('Failed to join user to group')
  }
}

export default joinGroupByUser;