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
        console.error(dbError)
        return null
    }

    if (data.length === 0) {
        console.error('User not found')
        return null
    }

    const user: User = data[0] as User

    return user
}

export default getUserInfobyAuthId