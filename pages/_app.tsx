import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/NavBar'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { UserProvider } from '../context/useUser';
import { GroupsProvider } from '../context/useGroups'
import { MoviesProvider } from '../context/useMovies'

function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <UserProvider>
        <GroupsProvider>
          <MoviesProvider>
            <NavBar>
              <Component {...pageProps} />
            </NavBar>
          </MoviesProvider>
        </GroupsProvider>
      </UserProvider>
    </SessionContextProvider>
  )
}

export default MyApp
