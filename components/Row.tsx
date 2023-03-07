import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import React, { useRef, useState } from 'react'
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

function Row({title, movies} : Props) {

  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction:string) => {
    setIsMoved(true)

    if (rowRef.current){
      const {scrollLeft, clientWidth} = rowRef.current
      const scrollMax = rowRef.current.scrollWidth - rowRef.current.clientWidth


      //loop back at max
      const scrollTo = (
        direction === "left" && scrollLeft != 0 ? scrollLeft - clientWidth :
        direction === "left" && scrollLeft === 0 ? scrollMax :
        Math.floor(scrollLeft) === scrollMax ? 0:
        scrollLeft + clientWidth
      )
      rowRef.current.scrollTo({left: scrollTo, behavior: "smooth"})
    }
  }

  return (
    <div className='h-40 space-y-0.5 md:space-y-2'>
      <h2 className='w-56 cursor-pointer text-sm font-semibold 
      text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl'>
        {title}
      </h2>
      <div className='group relative md:-ml-2'>
        <ChevronLeftIcon 
          className={`absolute top-0 bottom-0 left-2 z-50 m-auto h-9 w-9 
          cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && "hidden"}`}
          onClick={ () => handleClick("left")}/>

        <div ref={rowRef} className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide
        md:space-x-2.5 md:p-2">
          {movies?.map((movie:Movie) => (
            <Thumbnail key={movie.id} movie={movie}/>
          ))}
        </div>
        
        <ChevronRightIcon className={`absolute top-0 bottom-0 right-2 z-50 m-auto h-9 w-9 
        cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${movies.length < 3 && "hidden"}`}
        onClick={ () => handleClick("right")}/>
      </div>
    </div>
  )
}

export default Row