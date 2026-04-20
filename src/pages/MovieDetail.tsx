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

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-detail">
      <div
        className="movie-backdrop"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      />
      <div className="movie-content">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster-large"
        />
        <div className="movie-details-info">
          <h1>{movie.title}</h1>
          <div className="movie-meta">
            <span className="movie-rating">★ {movie.vote_average.toFixed(1)}</span>
            <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
            <span>{movie.runtime} min</span>
          </div>
          <div className="movie-genres">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>
          <p className="movie-overview">{movie.overview}</p>
          {credits && credits.cast.length > 0 && (
            <div className="cast-section">
              <h2>Cast</h2>
              <div className="cast-list">
                {credits.cast.slice(0, 10).map((actor) => (
                  <div key={actor.id} className="cast-member">
                    <div className="cast-name">{actor.name}</div>
                    <div className="cast-character">{actor.character}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;