import { supabase } from '../supabase'

type Group = {
  id: string;
  name: string;
  description: string;
  created_by: string;
};

async function createGroupByUser(name: string, description: string, created_by: string): Promise<Group> {
  const { data: newGroup, error: createGroupError } = await supabase.rpc('create_group', {
    name,
    description,
    created_by,
  });

  if (createGroupError) {
    console.error(createGroupError);
    throw new Error('Failed to create group');
  }

  return newGroup;
}

export default createGroupByUser;
