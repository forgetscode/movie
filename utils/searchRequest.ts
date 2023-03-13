const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

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

export const getMovieInfo = async (movies: string[]): Promise<Movie[]> => {
  const promises = movies.map(async (movie) => {
    const movieName = movie.split('(')[0].trim().replace(/ /g, '-').toLowerCase();
    console.log(movieName)
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${movieName}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      return data.results[0];
    }

    return null;
  });

  return Promise.all(promises);
}
