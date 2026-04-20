import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { useMovieDetail } from '../hooks/useMovieDetail';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id ? parseInt(id, 10) : 0;
  const { movie, credits, loading, error } = useMovieDetail(movieId);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !movie) {
    return <div className="error">{error || 'Movie not found'}</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
      )}
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}/10</p>
      <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
      <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
      <p><strong>Overview:</strong> {movie.overview}</p>
      {credits && credits.cast.length > 0 && (
        <div>
          <h2>Cast</h2>
          <ul>
            {credits.cast.slice(0, 10).map((actor: any) => (
              <li key={actor.id}>
                {actor.name} as {actor.character}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;