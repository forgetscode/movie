import React, { useState, useEffect } from 'react';
import { MinusIcon } from '@heroicons/react/solid';
import { Movie } from '../../typings';
import { notifyFailure, notifySuccess } from '../Toast';
import { removeGroupMovieMapping } from '../../utils/mutations/removeGroupMovieMapping';

type GroupListButtonProps = {
  movie: Movie;
  groupMovieListId: number
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  up?: boolean;
};

export function RemoveGroupListButton({ up = false, movie, groupMovieListId, setUpdate}: GroupListButtonProps) {
  const RemoveGroupListButton = async () => {
    try{
        const result = await removeGroupMovieMapping(movie.id, groupMovieListId);
        if (result === true){
            setUpdate((update) => !update); 
            notifySuccess('Removed.')
        }
        else{
            notifyFailure('Could not remove.')
        }
    }
    catch{
      notifyFailure('Could not remove.')
    }
  };

  return (
    <div className='-mt-6'>
        <p className='font-bold pb-1'>
            Remove
        </p>
      <button
        className="bg-black hover:bg-blue-800 text-white font-bold px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 rounded-lg"
        onClick={RemoveGroupListButton}
      >
        <MinusIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
