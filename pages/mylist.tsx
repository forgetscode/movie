import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import { Loading } from '../components/Loader';
import Head from 'next/head';
import { useMovies } from '../context/useMovies';
import { useUser } from '../context/useUser';
import { Movie } from '../typings';
import { notifyFailure } from '../components/Toast';
import ListCard from '../components/ListCard';

const MyList: NextPage = () => {
  const session = useSession();
  const router = useRouter();
  const { movies, loadingMovies } = useMovies();
  const { user, loading } = useUser();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [sortedMovies, setSortedMovies] = useState<Movie[] | null>(null);
  const [sortBy, setSortBy] = useState('first_air_date');

  useEffect(() => {
    if (!loading && !session) {
      router.push('/').then(() => {
        setHasRedirected(true);
      });
    }
  }, [loading, session, router]);

  useEffect(() => {
    if (hasRedirected) {
      notifyFailure("Must be signed in.");
    }
  }, [hasRedirected]);

  useEffect(() => {
    if (movies) {
      const sorted = [...movies].sort((a, b) => {
        if (sortBy === 'first_air_date') {
          return new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime();
        } else if (sortBy === 'vote_average') {
          return b.vote_average - a.vote_average;
        } else if (sortBy === 'popularity') {
          return b.popularity - a.popularity;
        }
        return 0;
      });
      setSortedMovies(sorted);
    }
  }, [movies, sortBy]);

  if (loading || loadingMovies || !session) {
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
        <div className="flex flex-col items-center justify-between w-full pb-8">
          <p className="text-5xl font-black text-center pb-16">Your List</p>
          <div className='flex flex-row space-x-3'>
            <p className='font-black text-2xl'>Sort by:</p>
            <select
            className="border bg-white text-black border-gray-300 p-2 rounded-md"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="first_air_date">Release Date</option>
            <option value="vote_average">Vote Average</option>
            <option value="popularity">Popularity</option>
          </select>
          </div>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full px-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 500px))',
            justifyContent: 'center',
          }}
        >
          {sortedMovies && sortedMovies?.length === 0 ? (
            <p className="text-3xl font-black text-center">There are no movies in your list.</p>
          ) : (
            sortedMovies?.map((movie: Movie) => (
              <div className="pb-8" key={movie.id}>
                <ListCard movie={movie} />
              </div>
            ))
          )}
        </div>
      </main>
    </div>
    );
};

export default MyList;