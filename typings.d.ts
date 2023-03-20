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
};

export interface Element {
    type:
        | 'Bloopers'
        | 'Featurette'
        | 'Behind the Scenes'
        | 'Clip'
        | 'Trailer'
        | 'Teaser'
}
    
type MovieRecommendation = {
    result: {
        id: string;
        object: string;
        created: number;
        model: string;
        choices: {
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
        index: number;
        }[];
        usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
        };
    };
};

type User = {
    id: string;
    name: string;
    auth_id: string;
};

type Group = {
    group_id: string;
    group_name: string;
    group_description: string;
};

interface UserMovieList {
    id: number;
    user_id: string;
}

interface GroupMovieList {
    id: number;
    group_id: string;
  }

interface Video {
    key: string;
    type: string;
}
  

type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
};

type MoviesContextType = {
    userMovieList: UserMovieList | null;
    movies: Movie[] | null;
    loadingMovies: boolean;
    updateMovies: React.Dispatch<React.SetStateAction<boolean>>;
};
  
type GroupsContextType = {
    groups: Group[] | null;
    loadingGroups: boolean;
    updateGroups: () => void;
    groupMovieLists: GroupMovieList[] | null;
  };
  