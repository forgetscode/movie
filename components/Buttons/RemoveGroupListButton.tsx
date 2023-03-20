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
      <button
        className="px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 text-sm sm:text-base bg-black text-white rounded-lg hover:bg-opacity-50 shadow-md hover:ring-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
        onClick={RemoveGroupListButton}
      >
        Remove
      </button>
  );
}
