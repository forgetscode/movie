const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchAnime: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=16,14`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
  fetchTvTrending: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  fetchTvTopRated: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchTvActionMovies: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10759`,
  fetchTvComedyMovies: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchTvHorrorMovies: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=9648`,
  fetchTvRomanceMovies: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchTvDocumentaries: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=99`,
}

export default requests