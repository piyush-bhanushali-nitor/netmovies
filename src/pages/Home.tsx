import MovieList from '../components/MovieList';
import { useMovies } from '../hooks/useMovies';

const Home = () => {
  const { movies, loading, error } = useMovies('trending');

  return (
    <div>
      <h1 className="page-title">Trending Now</h1>
      <MovieList movies={movies} loading={loading} error={error} />
    </div>
  );
};

export default Home;