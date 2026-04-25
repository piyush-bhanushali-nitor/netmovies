import { useState, useEffect } from 'react';
import type { Video } from '../api/tmdb';

interface MoviePlayerProps {
  tmdbId: number;
  movieTitle: string;
  videos?: Video[];
}

const MoviePlayer = ({ tmdbId, movieTitle, videos }: MoviePlayerProps) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [playerColor, setPlayerColor] = useState('0dcaf0'); // Default cyan color

  // Generate the Vidking embed URL
  const getVidkingUrl = () => {
    const baseUrl = `https://www.vidking.net/embed/movie/${tmdbId}`;
    const params = new URLSearchParams({
      color: playerColor,
      autoPlay: 'true',
    });
    return `${baseUrl}?${params.toString()}`;
  };

  // Listen for messages from the Vidking player
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        if (typeof event.data === 'string') {
          const data = JSON.parse(event.data);
          if (data.type === 'PLAYER_EVENT') {
            console.log('Player event:', data.data);
          }
        }
      } catch (e) {
        // Not a JSON message, ignore
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const colorOptions = [
    { name: 'Default', value: '0dcaf0' },
    { name: 'Blue', value: '3b82f6' },
    { name: 'Netflix Red', value: 'e50914' },
    { name: 'YouTube Red', value: 'ff0000' },
    { name: 'Twitch Purple', value: '9146ff' },
    { name: 'Discord Blue', value: '5865f2' },
    { name: 'Spotify Green', value: '1db954' },
    { name: 'Orange', value: 'f97316' },
    { name: 'Pink', value: 'ec4899' },
  ];

  if (!showPlayer) {
    return (
      <div className="player-section">
        <h2>Watch Movie</h2>
        <div className="player-preview" onClick={() => setShowPlayer(true)}>
          <div className="player-thumbnail">
            {videos && videos.length > 0 ? (
              <img
                src={`https://img.youtube.com/vi/${videos[0].key}/maxresdefault.jpg`}
                alt={movieTitle}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://img.youtube.com/vi/${videos[0].key}/hqdefault.jpg`;
                }}
              />
            ) : (
              <div className="player-placeholder">
                <div className="play-icon">▶</div>
                <p>Click to watch</p>
              </div>
            )}
            <div className="play-button-overlay">
              <div className="play-button">▶</div>
            </div>
          </div>
          <div className="player-info">
            <h3>Stream with Vidking</h3>
            <p>Click to start streaming</p>
          </div>
        </div>
        
        <div className="color-picker">
          <span>Player Color:</span>
          <div className="color-options">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                className={`color-btn ${playerColor === color.value ? 'active' : ''}`}
                style={{ backgroundColor: `#${color.value}` }}
                onClick={() => setPlayerColor(color.value)}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="player-section">
      <div className="player-header">
        <h2>Now Playing: {movieTitle}</h2>
        <button className="close-player-btn" onClick={() => setShowPlayer(false)}>
          × Close
        </button>
      </div>
      <div className="video-player-container">
        <iframe
          src={getVidkingUrl()}
          width="100%"
          height="600"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          title={movieTitle}
        />
      </div>
      <div className="player-controls">
        <button onClick={() => setPlayerColor('0dcaf0')} className={playerColor === '0dcaf0' ? 'active' : ''}>
          Default
        </button>
        <button onClick={() => setPlayerColor('e50914')} className={playerColor === 'e50914' ? 'active' : ''}>
          Netflix
        </button>
        <button onClick={() => setPlayerColor('9146ff')} className={playerColor === '9146ff' ? 'active' : ''}>
          Purple
        </button>
        <button onClick={() => setShowPlayer(false)} className="close-btn">
          Close Player
        </button>
      </div>
    </div>
  );
};

export default MoviePlayer;