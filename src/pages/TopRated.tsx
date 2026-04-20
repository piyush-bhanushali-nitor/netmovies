import MovieList from '../components/MovieList';
import { useMovies } from '../hooks/useMovies';

const TopRated = () => {
  const { movies, loading, error } = useMovies('top_rated');

  return (
    <div>
      <h1>Top Rated Movies</h1>
      <MovieList movies={movies} loading={loading} error={error} />
    </div>
  );
};

export default TopRated;