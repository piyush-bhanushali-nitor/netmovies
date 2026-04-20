import { useState, useEffect } from 'react';
import { getMovieDetails, getMovieCredits } from '../api/tmdb';
import type { MovieDetails, Credits } from '../api/tmdb';

export const useMovieDetail = (id: number) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const [movieData, creditsData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id)
        ]);
        setMovie(movieData);
        setCredits(creditsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetail();
    }
  }, [id]);

  return { movie, credits, loading, error };
};