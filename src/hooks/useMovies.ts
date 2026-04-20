import { useState, useEffect } from 'react';
import { getTrendingMovies, searchMovies, getTopRatedMovies } from '../api/tmdb';
import type { Movie } from '../api/tmdb';

type MovieType = 'trending' | 'top_rated' | 'search';

export const useMovies = (type: MovieType = 'trending', query?: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(undefined);
        let data: Movie[];
        if (type === 'search' && query) {
          data = await searchMovies(query);
        } else if (type === 'top_rated') {
          data = await getTopRatedMovies();
        } else {
          data = await getTrendingMovies();
        }
        setMovies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [type, query]);

  return { movies, loading, error };
};