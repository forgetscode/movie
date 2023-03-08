import ImageWithFallback from "./ImageWithFallback"

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

interface Props {
    movie: Movie 
}

function Thumbnail({movie}: Props) {

  function createMovieSearchLink(movieTitle: string): string {
    return `https://www6.f2movies.to/search/${movieTitle.replace(/\s+/g, '-')}`;
  }
  
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200
      ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => window.open(createMovieSearchLink(movie.name || movie.title), '_blank', 'noopener')}>
      <div className="absolute w-full h-full opacity-0 hover:opacity-100 z-40">
        <p className="absolute inset-x-0 bottom-0 text-shadow-md text-bold text-md md:text-lg p-1 bg-gradient-to-r from-[#2a2a2a]/30 to-[#2a2a2a]/0 ">
          {movie.name ? movie.name: movie.title}
        </p>
      </div>
      <ImageWithFallback src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
          }`} fallbackSrc="https://www.svgrepo.com/show/24585/evernote.svg"
      />
    </div>
  )
}

export default Thumbnail