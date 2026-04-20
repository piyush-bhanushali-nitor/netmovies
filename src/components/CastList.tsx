import { useState } from 'react';
import type { CastMember } from '../api/tmdb';

interface CastListProps {
  cast: CastMember[];
}

const CastList = ({ cast }: CastListProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayCast = showAll ? cast : cast.slice(0, 10);

  return (
    <div className="cast-section">
      <div className="cast-header">
        <h2>Cast</h2>
        {cast.length > 10 && (
          <button
            className="view-more-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `View All (${cast.length})`}
          </button>
        )}
      </div>
      <div className="cast-list">
        {displayCast.map((actor) => (
          <div key={actor.id} className="cast-member">
            <div className="cast-image">
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                  loading="lazy"
                />
              ) : (
                <div className="cast-placeholder">
                  <span>{actor.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <div className="cast-info">
              <div className="cast-name">{actor.name}</div>
              <div className="cast-character">{actor.character}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastList;