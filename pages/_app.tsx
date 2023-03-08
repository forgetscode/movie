import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/NavBar'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <NavBar>
        <Component {...pageProps} />
      </NavBar>
    </SessionContextProvider>
  )
}

export default MyApp
