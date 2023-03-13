import { supabase } from '../supabase'

type User = {
    id: string
    name: string
    auth_id:string
}

async function getUserInfobyAuthId(authID: string): Promise<User | null> {
    const { data, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', authID)
        .limit(1)

    if (dbError) {
        if (dbError && dbError.message && dbError.message.includes('User not found')) {
            const user: User = {
                id: '-1',
                name: '',
                auth_id: ''
              };
              return user
        }
        else{
            return null
        }
       
    }

    if (data.length === 0) {
        const user: User = {
            id: '-1',
            name: '',
            auth_id: ''
          };
          return user
    }

    const user: User = data[0] as User

    return user
}

export default getUserInfobyAuthId