import { supabase } from '../supabase'

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

async function addMovieToDatabase(movie: Movie ): Promise<void> {
    const { error } = await supabase
    .from('movies')
    .insert(
      [
        {
          title: movie.title,
          backdrop_path: movie.backdrop_path,
          media_type: movie.media_type,
          release_date: movie.release_date,
          first_air_date: movie.first_air_date,
          genre_ids: movie.genre_ids,
          id: movie.id,
          name: movie.name,
          origin_country: movie.origin_country,
          original_language: movie.original_language,
          original_name: movie.original_name,
          overview: movie.overview,
          popularity: movie.popularity,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
        },
      ],
    );
  
    if (error && error.code !== '23505') {
      console.error('Error adding movie:', error);
      throw new Error('Failed to add movie');
    }
  }

  export default addMovieToDatabase;