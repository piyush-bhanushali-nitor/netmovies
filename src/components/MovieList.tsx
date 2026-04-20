import { memo } from 'react';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';
import type { Movie } from '../api/tmdb';

interface MovieListProps {
  movies: Movie[];
  loading?: boolean;
  error?: string;
}

const MovieList = memo(({ movies, loading, error }: MovieListProps) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (movies.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">🎬</div>
        <p>No movies found. Try adjusting your search.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  );
});

MovieList.displayName = 'MovieList';

export default MovieList;