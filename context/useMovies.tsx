import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useUser } from './useUser';
import { supabase } from '../utils/supabase';
import { createNewUserMovieList } from '../utils/mutations/createUserMovieList';
import { getMoviesByListId }from '../utils/queries/getMoviesByListId';
import { MoviesContextType, UserMovieList } from '../typings';

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export function useMovies() {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context;
}

type MoviesProviderProps = {
  children: React.ReactNode;
};

export function MoviesProvider({ children }: MoviesProviderProps) {
    const [userMovieList, setUserMovieList] = useState<UserMovieList | null>(null);
    const [movies, setMovies] = useState<any | null>(null);
    const [loadingMovies, setLoadingMovies] = useState(true);
    const { user } = useUser();
    const [update, setUpdate] = useState<boolean>(false);

    const fetchMovies = useCallback(async () => {
    if (user) {
        try {
            console.log("fetching...")
            createNewUserMovieList(user.id);
            const { data, error } = await supabase
                .from('user_movie_list')
                .select('*')
                .eq('user_id', user.id)
                .limit(1);
                if (data && data.length > 0) {
                setUserMovieList({ id: data[0].id, user_id: data[0].user_id });
                const movies = await getMoviesByListId(data[0].id);
                setMovies(movies);
                }
        } catch (error) {
        console.error('Error fetching user movie data:', error);
        }
    }
    setLoadingMovies(false);
    }, [user]);

    useEffect(() => {
        fetchMovies();
    }, [user, update, fetchMovies]);

    const updateMovies = () => {
        setUpdate(prevState => !prevState);
    };

    return (
    <MoviesContext.Provider value={{ userMovieList, movies, loadingMovies, updateMovies }}>
        {children}
    </MoviesContext.Provider>
    );
}
