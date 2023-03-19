import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import { Loading } from '../components/Loader';
import getUserInfobyAuthId from '../utils/queries/getUserInfoByAuthId';
import Head from 'next/head';
import { createNewUserMovieList } from '../utils/mutations/createUserMovieList';
import { getMoviesByListId } from '../utils/queries/getMoviesByListId';
import { supabase } from '../utils/supabase';
import Card from '../components/Card';

export interface Movie {
  title: string
  backdrop_path: string
  media_type?: string
  release_date?: string
  first_air_date: string
  genre_ids: number[]
  id: number
  name: string
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}

type User = {
    id: string;
    name: string;
    auth_id: string;
  };

const MyList: NextPage = () => {
  const session = useSession();
  const router = useRouter();
  const [inList, setInList] = useState(false);
  const [user, setUser] = useState<User | null>();
  const [userMovieList, setUserMovieList] = useState<any>();
  const [movies, setMovies ] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (session && session.user?.id) {
        const userData = await getUserInfobyAuthId(session.user.id);
        setUser(userData);
        if(user){
          createNewUserMovieList(userData!.id);
        }
        const { data, error } = await supabase
        .from("user_movie_list")
        .select("*")
        .eq("user_id", userData?.id)
        .limit(1);

        if (data && data.length > 0) {
          setUserMovieList(data);
          const movies = await getMoviesByListId(data[0].id)
          setMovies(movies);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [session, inList]);

  useEffect(() => {
    if (!loading && !session) {
      router.push('/');
    }
  }, [loading, session, router]);

  if (loading || !user || !movies) {
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
          {movies.length === 0 ? (
            <p className='text-3xl font-black text-center'>There are no movies in your list.</p>
          ) : (
            movies.map((movie: Movie) => (
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
