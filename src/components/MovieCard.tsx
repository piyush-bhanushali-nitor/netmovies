import { Link } from 'react-router-dom';
import { memo } from 'react';
import type { Movie } from '../api/tmdb';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = memo(({ movie }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-poster.jpg'; // placeholder if no poster

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <img
          src={posterUrl}
          alt={movie.title}
          className="movie-poster"
          loading="lazy"
        />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-year">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
          </p>
        </div>
      </div>
    </Link>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;