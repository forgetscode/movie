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
  
  export class MovieDBAPI {
    private readonly API_KEY: string = process.env.NEXT_PUBLIC_API_KEY!;
    private readonly API_BASE_URL: string = 'https://api.themoviedb.org/3';
    private readonly API_DISCOVER_MOVIE_URL: string = `${this.API_BASE_URL}/discover/movie`;
  
    private currentPage: number = 1;
    private watchedMovieIds: Set<number>;
  
    constructor() {
      // Load the watched movie IDs from local storage
      let storedIds = null;
      if (typeof localStorage !== 'undefined') {
        storedIds = localStorage.getItem('watchedMovieIds');
      }
      this.watchedMovieIds = new Set(storedIds ? JSON.parse(storedIds) : []);
    }
  
    public async get20RandomMovies(): Promise<Movie[]> {
      const params = new URLSearchParams({
        api_key: this.API_KEY,
        sort_by: `popularity.desc,${Math.random()}`, // add a random value to the sort_by parameter
        language: 'en-US',
        include_adult: 'false',
        include_video: 'false',
        'vote_average.gte': '6',
        'vote_count.gte': '1000',
        'release_date.lte': new Date().toISOString().split('T')[0], // only show movies released before today
        page: this.currentPage.toString(), // add a page parameter
      });
  
      const response = await fetch(`${this.API_DISCOVER_MOVIE_URL}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
      }
  
      const data = await response.json();
      const movies = data.results as Movie[];
  
      // If we've reached the end of the results, reset the page number and start again
      if (movies.length < 20) {
        this.currentPage = 1;
      } else {
        this.currentPage += 1;
      }
  
      // Filter out already watched movies
      const unwatchedMovies = movies.filter((movie) => !this.watchedMovieIds.has(movie.id));
  
      // If there are not enough unwatched movies, reset the watchedMovieIds set
      if (unwatchedMovies.length < 20) {
        this.watchedMovieIds.clear();
        unwatchedMovies.push(...movies);
      }
  
      // Get 20 random unwatched movies
      const randomMovies = this.getRandomItems(unwatchedMovies, 20);
  
      // Add the movie IDs to the watchedMovieIds set
      for (const movie of randomMovies) {
        this.watchedMovieIds.add(movie.id);
      }
  
      // Save the watched movie IDs to local storage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('watchedMovieIds', JSON.stringify(Array.from(this.watchedMovieIds)));
      }
  
      return randomMovies;
    }
  
    private getRandomItems<T>(items: T[], count: number): T[] {
      const shuffled = items.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
  }
  