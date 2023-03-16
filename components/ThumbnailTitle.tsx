import { useState } from "react";
import ImageWithFallback from "./ImageWithFallback";
import { MovieModal } from "./MovieModal";

export interface Movie {
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface Props {
  movie: Movie;
}

function ThumbnailTitle({ movie }: Props) {
  const [showModal, setShowModal] = useState(false);

  function createMovieSearchLink(movieTitle: string): string {
    return `https://www6.f2movies.to/search/${movieTitle.replace(/\s+/g, "-")}`;
  }

  function handleThumbnailClick() {
    setShowModal(true);
  }

  function handleModalClose() {
    setShowModal(false);
  }

  return (
    <>
      <div
        className="relative h-28 min-w-[180px] cursor-pointer transition duration-200
      ease-out md:h-36 md:min-w-[260px] md:hover:scale-105 z-20"
        onClick={handleThumbnailClick}
      >
        <div className="absolute w-full h-full opacity-100 z-40">
          <p className="absolute inset-x-0 bottom-0 text-shadow-md text-bold text-md md:text-lg p-1 bg-gradient-to-r from-[#2a2a2a]/80 to-[#2a2a2a]/30 ">
            {movie.name ? movie.name : movie.title}
          </p>
        </div>
        <ImageWithFallback
          src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`}
          fallbackSrc="https://www.svgrepo.com/show/24585/evernote.svg"
        />
      </div>
      {showModal && (
        <MovieModal movie={movie} onClose={handleModalClose} />
      )}
    </>
  );
}

export default ThumbnailTitle;
