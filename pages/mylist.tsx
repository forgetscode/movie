import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import { Loading } from '../components/Loader';
import Head from 'next/head';
import Card from '../components/Card';
import { useMovies } from '../context/useMovies';
import { useUser } from '../context/useUser';
import { Movie } from '../typings';

const MyList: NextPage = () => {
  const session = useSession();
  const router = useRouter();
  const { movies, loadingMovies } = useMovies();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !session) {
      router.push('/');
    }
  }, [loading, session, router]);

  if (loading || loadingMovies) {
    return (
      <div className="relative h-screen flex-col items-center justify-center py-2">
        <Head>
          <title>Movie Night</title>
          <link rel="icon" href="https://www.svgrepo.com/show/468899/film-roll.svg" />
        </Head>
        <main className="flex h-full w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <Loading />
        </main>
      </div>
    );
  }

  return (
    <div className="relative h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Movie Night</title>
        <link rel="icon" href="https://www.svgrepo.com/show/468899/film-roll.svg" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20">
        <p className="text-5xl font-black text-center pb-16">Your List</p>
          {movies && movies?.length === 0 ? (
            <p className='text-3xl font-black text-center'>There are no movies in your list.</p>
          ) : (
            movies?.map((movie: Movie) => (
              <div className="pb-16" key={movie.id}>
                <Card movie={movie} />
              </div>
            ))
          )}
      </main>
    </div>
  );
};

export default MyList;
