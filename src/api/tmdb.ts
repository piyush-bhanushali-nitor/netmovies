

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


async function fetchFromProxy(path: string, params?: Record<string, string | number>): Promise<any> {
  let url = `/api${path}`;
  if (params) {
    const search = new URLSearchParams(params as Record<string, string>).toString();
    url += `?${search}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Proxy API error: ${response.status}`);
  }
  return response.json();
}


export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await fetchFromProxy('/movies/trending');
  return data.results;
}


export async function getIndianMovies(): Promise<Movie[]> {
  // Not implemented in proxy yet
  console.log('getIndianMovies called');
  return [];
}


export async function getMoviesByGenre(genreId: number, region?: string): Promise<Movie[]> {
  // Not implemented in proxy yet
  console.log('getMoviesByGenre called with genreId:', genreId, 'region:', region);
  return [];
}


export async function getTopRatedMovies(): Promise<Movie[]> {
  const data = await fetchFromProxy('/movies/top-rated');
  return data.results;
}


export async function searchMovies(query: string): Promise<Movie[]> {
  const data = await fetchFromProxy('/movies/search', { query });
  return data.results;
}


export async function getMovieDetails(id: number): Promise<MovieDetails> {
  return fetchFromProxy('/movies/details', { id });
}


export async function getMovieCredits(id: number): Promise<Credits> {
  return fetchFromProxy('/movies/credits', { id });
}


export async function getMovieVideos(id: number): Promise<Videos> {
  return fetchFromProxy('/movies/videos', { id });
}


export async function getSimilarMovies(id: number): Promise<Movie[]> {
  // Not implemented in proxy yet
  console.log('getSimilarMovies called with id:', id);
  return [];
}

export type { Movie, MovieDetails, CastMember, Credits, Video, Videos };