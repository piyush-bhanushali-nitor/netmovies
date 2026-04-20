import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';
import type { Movie } from '../api/tmdb';

interface MovieListProps {
  movies: Movie[];
  loading?: boolean;
  error?: string;
}

const MovieList = ({ movies, loading, error }: MovieListProps) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (movies.length === 0) {
    return <div className="error">No movies found.</div>;
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
};

export default MovieList;