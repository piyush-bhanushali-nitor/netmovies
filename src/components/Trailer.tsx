import { useState } from 'react';
import type { Video } from '../api/tmdb';

interface TrailerProps {
  videos: Video[];
}

const Trailer = ({ videos }: TrailerProps) => {
  const [showTrailer, setShowTrailer] = useState(false);

  // Find the best trailer (prioritize official trailer, then teaser)
  const getBestTrailer = () => {
    const youtubeVideos = videos.filter(video => video.site === 'YouTube');

    // First try to find official trailer
    const officialTrailer = youtubeVideos.find(
      video => video.type === 'Trailer' && video.official
    );

    if (officialTrailer) return officialTrailer;

    // Then try any trailer
    const anyTrailer = youtubeVideos.find(video => video.type === 'Trailer');
    if (anyTrailer) return anyTrailer;

    // Finally try teaser
    const teaser = youtubeVideos.find(video => video.type === 'Teaser');
    if (teaser) return teaser;

    // Return first YouTube video as fallback
    return youtubeVideos[0];
  };

  const trailer = getBestTrailer();

  if (!trailer) {
    return (
      <div className="trailer-section">
        <h2>Trailer</h2>
        <div className="trailer-placeholder">
          <div className="trailer-icon">🎬</div>
          <p>Trailer not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="trailer-section">
      <h2>Trailer</h2>
      {!showTrailer ? (
        <div className="trailer-preview" onClick={() => setShowTrailer(true)}>
          <div className="trailer-thumbnail">
            <img
              src={`https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`}
              alt={trailer.name}
              onError={(e) => {
                // Fallback to lower quality thumbnail
                const target = e.target as HTMLImageElement;
                target.src = `https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`;
              }}
            />
            <div className="play-button">
              <div className="play-icon">▶</div>
            </div>
          </div>
          <div className="trailer-info">
            <h3>{trailer.name}</h3>
            <p>Click to play trailer</p>
          </div>
        </div>
      ) : (
        <div className="trailer-player">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
            title={trailer.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button
            className="close-trailer"
            onClick={() => setShowTrailer(false)}
            aria-label="Close trailer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Trailer;