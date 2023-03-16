import Head from 'next/head'
import { useState, useCallback, ChangeEvent, useEffect } from 'react'
import Row from '../components/Row';
import requests from '../utils/requests';
import Typed from 'react-typed';
import { Toaster } from 'react-hot-toast';
import { Loading } from '../components/Loader';
import { getMovieInfo } from '../utils/searchRequest';
import Card from '../components/Card';
import { MovieDBAPI } from '../utils/showMore';
import Thumbnail from '../components/Thumbnail';

type MovieRecommendation = {
  result: {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
      index: number;
    }[];
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
};

export interface Genre {
  id: number
  name: string
}

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

export interface Element {
type:
  | 'Bloopers'
  | 'Featurette'
  | 'Behind the Scenes'
  | 'Clip'
  | 'Trailer'
  | 'Teaser'
}

interface Props {
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}

const api = new MovieDBAPI();

const Home = ({    
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
  }:Props ) => {
  const [value, setValue] = useState<string>('');
  const [search, setSearch] = useState<Movie[] | null>(null);
  const [completion, setCompletion] = useState<string | string[]>('');
  const [movies, setMovies] = useState<Movie[]>([]);

  function parseCompletion(completion: string): string[] {
    const regex = /\d+\. (.+)/g;
    const matches = completion.matchAll(regex);
    const results: string[] = [];
    for (const match of matches) {
      results.push(match[1]);
    }
    return results;
  }
  
  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }, []);
  
  const handleButtonClick = useCallback(
    async () => {
      if (search){
        setSearch(null);
      }
      setCompletion('Loading...');
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: value }),
      });
      const data: MovieRecommendation = await response.json();
      setValue('');
      const content = data.result.choices[0].message.content;
      const movies = parseCompletion(content);
      const movieTitles = movies.map((movie) => movie.split('(')[0].trim());
      const movieData = await getMovieInfo(movieTitles);
      setSearch(movieData);
      if (movies.length === 1) {
        setCompletion(movies[0]);
      } else {
        setCompletion(movies);
      }
    }, [value]);
  
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleButtonClick();
      }
    }, [handleButtonClick]);

    const fetchMovies = async () => {
      const newMovies = await api.get20RandomMovies();
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    };

  return (
    <div className="relative h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Movie Night</title>
        <link rel="icon" href="https://www.svgrepo.com/show/468899/film-roll.svg" />
      </Head>
  
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center pt-12 duration-500">
        <Toaster/>
        <p className="px-6 font-extrabold text-transparent text-4xl md:text-6xl xl:text-8xl bg-clip-text bg-gradient-to-r from-sky-400 via-blue-600 to-purple-600 md:flex pb-16">Movie Night</p>
        <p className='pb-16  text-xl sm:text-3xl font-black'>
          What are you looking for?
        </p>
        <div className='pb-8'>
          <Typed
            className="text-white text-xl lg:text-3xl z-10 font-semibold"
            strings={["Comedies?", "Korean thrillers?", "Dogs in space...", "It's here, just type it in."]} typeSpeed={80} backSpeed={40}
            />
        </div>
        <div className="flex flex-col items-center justify-center gap-6 p-8">
          <input className="w-full sm:w-[240px] md:w-[400px] max-w-md px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent !text-black" type="text" value={value} onChange={handleInput} onKeyPress={handleKeyPress} />
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={handleButtonClick}>Submit</button>
          <ul className="list-disc pl-4 pt-16">
            {search && search.length > 0 && search.every(Boolean) ? (
              search.map((movie) => (
                <div key={movie.id} className='pb-8'>
                  <Card key={movie.id} movie={movie} />
                </div>
              ))
            ) : completion == 'Loading...' ? (
              <div className='pt-16 pb-8 flex'>
                <Loading/>
              </div> 
            ) : completion && completion !== 'Loading...' ? (
              <p className="text-center text-2xl pt-16">Inappropriate Conduct</p>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </main>

      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16 '>
        <section className='md:space-y-16'>
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>

      <footer className="">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <div className="relative mx-auto px-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {movies?.map((movie) => (
                <Thumbnail key={movie.id} movie={movie}/>
            ))}
          </div>
          <div className="flex justify-center pb-16">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={fetchMovies}>
              Show More
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const [
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  }
}
