import { useWatchlist } from '../hooks/useWatchlist';

interface WatchlistButtonProps {
  movieId: number;
  movieTitle: string;
}

const WatchlistButton = ({ movieId, movieTitle }: WatchlistButtonProps) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const handleClick = () => {
    toggleWatchlist(movieId);
  };

  const inWatchlist = isInWatchlist(movieId);

  return (
    <button
      className={`watchlist-btn ${inWatchlist ? 'in-watchlist' : ''}`}
      onClick={handleClick}
      aria-label={inWatchlist ? `Remove ${movieTitle} from watchlist` : `Add ${movieTitle} to watchlist`}
    >
      <span className="watchlist-icon">
        {inWatchlist ? '✓' : '+'}
      </span>
      <span className="watchlist-text">
        {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
      </span>
    </button>
  );
};

export default WatchlistButton;