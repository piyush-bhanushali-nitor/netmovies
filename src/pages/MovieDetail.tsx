import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Trailer from '../components/Trailer';
import CastList from '../components/CastList';
import WatchlistButton from '../components/WatchlistButton';
import MovieList from '../components/MovieList';
import { useMovieDetail } from '../hooks/useMovieDetail';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id ? parseInt(id, 10) : 0;
  const { movie, credits, videos, similarMovies, loading, error } = useMovieDetail(movieId);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !movie) {
    return (
      <div className="movie-detail">
        <div className="error-page">
          <div className="error-icon">🎬</div>
          <h1>Movie Not Found</h1>
          <p>The movie you're looking for doesn't exist or has been removed.</p>
          <a href="/" className="back-link">← Back to Home</a>
        </div>
      </div>
    );
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
            <span>{movie.vote_count.toLocaleString()} votes</span>
          </div>
          <div className="movie-genres">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>
          <WatchlistButton movieId={movie.id} movieTitle={movie.title} />
          <p className="movie-overview">{movie.overview}</p>

          {videos && videos.results.length > 0 && (
            <Trailer videos={videos.results} />
          )}

          {credits && credits.cast.length > 0 && (
            <CastList cast={credits.cast} />
          )}

          {similarMovies.length > 0 && (
            <div className="similar-movies-section">
              <h2>More Like This</h2>
              <MovieList movies={similarMovies.slice(0, 12)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;