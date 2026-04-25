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
  backdrop_path: string;
  vote_count: number;
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

interface Videos {
  results: Video[];
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
    const data = await fetchFromTMDB('/discover/movie?with_origin=IN&sort_by=popularity.desc&page=1');
  // const data = await fetchFromTMDB('/trending/movie/week');
  return data.results;
}

export async function getIndianMovies(): Promise<Movie[]> {
  // Fetch movies from India (popular Indian movies)
  const data = await fetchFromTMDB('/discover/movie?with_origin=IN&sort_by=popularity.desc&page=1');
  return data.results.slice(0, 20);
}

export async function getMoviesByGenre(genreId: number, region?: string): Promise<Movie[]> {
  let endpoint = `/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=1`;
  if (region) {
    endpoint += `&with_origin=${region}`;
  }
  const data = await fetchFromTMDB(endpoint);
  return data.results.slice(0, 20);
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

export async function getMovieVideos(id: number): Promise<Videos> {
  return fetchFromTMDB(`/movie/${id}/videos`);
}

export async function getSimilarMovies(id: number): Promise<Movie[]> {
  const data = await fetchFromTMDB(`/movie/${id}/similar`);
  return data.results;
}

export type { Movie, MovieDetails, CastMember, Credits, Video, Videos };