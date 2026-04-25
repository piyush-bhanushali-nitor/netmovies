import { useState, useEffect } from 'react';
import { 
  getTrendingMovies, 
  getMoviesByGenre 
} from '../api/tmdb';
import type { Movie } from '../api/tmdb';

interface MovieSection {
  title: string;
  movies: Movie[];
  loading: boolean;
  error: string | undefined;
}

interface UseHomeMoviesResult {
  sections: MovieSection[];
  loading: boolean;
  error: string | undefined;
}

// Genre mapping for TMDB
const GENRES = {
  action: 28,
  comedy: 35,
  thriller: 53,
  horror: 27,
  romance: 10749,
  drama: 18,
  sciFi: 878,
  animation: 16,
};

export const useHomeMovies = (): UseHomeMoviesResult => {
  const [sections, setSections] = useState<MovieSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchAllSections = async () => {
      try {
        setLoading(true);
        setError(undefined);

        // Define all sections to fetch
        const sectionConfigs = [
          { key: 'trending', title: 'Trending', fetchFn: () => getTrendingMovies() },
          { key: 'comedy', title: 'Comedy', fetchFn: () => getMoviesByGenre(GENRES.comedy) },
          { key: 'action', title: 'Action', fetchFn: () => getMoviesByGenre(GENRES.action) },
          { key: 'thriller', title: 'Thriller', fetchFn: () => getMoviesByGenre(GENRES.thriller) },
          { key: 'horror', title: 'Horror', fetchFn: () => getMoviesByGenre(GENRES.horror) },
          { key: 'romance', title: 'Romance', fetchFn: () => getMoviesByGenre(GENRES.romance) },
          { key: 'drama', title: 'Drama', fetchFn: () => getMoviesByGenre(GENRES.drama) },
          { key: 'scifi', title: 'Sci-Fi', fetchFn: () => getMoviesByGenre(GENRES.sciFi) },
          { key: 'animation', title: 'Animation', fetchFn: () => getMoviesByGenre(GENRES.animation) },
        ];

        // Fetch all sections in parallel
        const results = await Promise.all(
          sectionConfigs.map(async (config) => {
            try {
              const movies = await config.fetchFn();
              return {
                title: config.title,
                movies,
                loading: false,
                error: undefined,
              };
            } catch (err) {
              return {
                title: config.title,
                movies: [],
                loading: false,
                error: err instanceof Error ? err.message : 'Failed to fetch',
              };
            }
          })
        );

        setSections(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchAllSections();
  }, []);

  return { sections, loading, error };
};