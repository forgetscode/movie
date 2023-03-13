import { supabase } from '../supabase';

type User = {
  id: string;
  name: string;
  auth_id: string;
};

type Group = {
  group_id: string;
  group_name: string;
  group_description: string;
};

async function leaveGroupByUser(userId: string, groupId: string): Promise<void> {
  const { error } = await supabase.rpc('leave_group_by_user', {
    userid: userId,
    groupid: groupId
  });

  if (error) {
    console.error(error);
    throw new Error('Failed to leave group');
  }
}

export default leaveGroupByUser;
