import { supabase } from '../supabase'

type User = {
    id: string
    name: string
    auth_id:string
}

async function createNewUser(authID: string): Promise<User | null> {
    try {
      const { data, error } = await supabase.rpc('create_user', {
        auth_id: authID,
    })
  
      if (error) {
        return null
      }
  
      const user = data[0] as User
      return user

    } catch (error) {
      console.error(error)
      return null
    }
  }
  
  export default createNewUser