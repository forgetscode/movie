import React, { useRef } from 'react'
import Thumbnail from './Thumbnail'

interface Props {
    title: string 
    movies: Movie[]
}

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

function RowNoScroll({title, movies} : Props) {

  const rowRef = useRef<HTMLDivElement>(null)

  return (
    <div className='h-40 space-y-0.5 md:space-y-2'>
      <h2 className='w-56 cursor-pointer text-sm font-semibold 
      text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl'>
        {title}
      </h2>
      <div className='group relative md:-ml-2'>
        <div ref={rowRef} className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide
        md:space-x-2.5 md:p-2">
          {movies?.map((movie:Movie) => (
            <Thumbnail key={movie.id} movie={movie}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RowNoScroll