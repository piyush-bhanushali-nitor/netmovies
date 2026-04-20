const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!API_KEY) {
  throw new Error('TMDB API key not found. Please set VITE_TMDB_API_KEY in .env');
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
}

interface Credits {
  cast: CastMember[];
}

async function fetchFromTMDB(endpoint: string): Promise<any> {
  const url = `${API_BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }
  return response.json();
}

export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB('/trending/movie/week');
  return data.results;
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB('/movie/top_rated');
  return data.results;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const data = await fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}`);
  return data.results;
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  return fetchFromTMDB(`/movie/${id}`);
}

export async function getMovieCredits(id: number): Promise<Credits> {
  return fetchFromTMDB(`/movie/${id}/credits`);
}

export type { Movie, MovieDetails, CastMember, Credits };