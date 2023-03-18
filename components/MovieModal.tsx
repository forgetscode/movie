import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Card from './Card';
import ReactPlayer from 'react-player';
import { XIcon } from '@heroicons/react/outline'; 

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

interface Video {
  key: string;
  type: string;
}

interface Props {
  movie: Movie;
  onClose: () => void;
}

export function MovieModal({ movie, onClose }: Props) {
  let [isOpen, setIsOpen] = useState(true);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTrailer() {
      let mediaDefault = 'movie';
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : mediaDefault
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Video) => element.type === 'Trailer'
        );
        let trailer = null;
        if (index < 0) {
          trailer = 'dQw4w9WgXcQ&ab_channel=RickAstley';
        } else {
          trailer = data.videos?.results[index]?.key;
        }
        setTrailer(trailer);
        setIsLoading(false);
      }
    }

    fetchTrailer();
  }, [movie]);

  function handleClose() {
    setIsOpen(false);
    onClose();
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center max-h-5/6 max-w-5/6 sm:min-h-screen sm:max-w-[800px] mx-auto">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
        <div className="relative bg-zinc-900 rounded-lg w-full h-full flex flex-col justify-center items-center shadow-md shadow-zinc-900">
          <div className="absolute top-4 right-4 md:hidden">
            <button onClick={handleClose} className="p-1 rounded-full bg-gray-300 hover:bg-gray-400">
              <XIcon className="w-6 h-6 text-gray-800" />
            </button>
          </div>
          <div className="bg-zinc-900 w-full h-[400px] flex justify-center items-center rounded-t-lg pt-3 px-3">
            {isLoading ? (
              <div className="w-10 h-10 border-4 border-gray-300 rounded-full animate-spin"></div>
            ) : (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer}`}
                width="100%"
                height="100%"
                controls={true}
              />
            )}
          </div>
          <div className="w-full">
            <Card movie={movie} clickable={false} modal={true} />
          </div>
        </div>
      </div>
    </Dialog>
  );
}
