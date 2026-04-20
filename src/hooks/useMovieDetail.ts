import { useState, useEffect } from 'react';
import { getMovieDetails, getMovieCredits, getMovieVideos, getSimilarMovies } from '../api/tmdb';
import type { MovieDetails, Credits, Videos, Movie } from '../api/tmdb';

export const useMovieDetail = (id: number) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [videos, setVideos] = useState<Videos | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const [movieData, creditsData, videosData, similarData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getMovieVideos(id),
          getSimilarMovies(id)
        ]);
        setMovie(movieData);
        setCredits(creditsData);
        setVideos(videosData);
        setSimilarMovies(similarData);
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

  return { movie, credits, videos, similarMovies, loading, error };
};