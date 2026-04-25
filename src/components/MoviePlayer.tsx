import { useState, useEffect } from 'react';
import type { Video } from '../api/tmdb';

interface MoviePlayerProps {
  tmdbId: number;
  movieTitle: string;
  videos?: Video[];
}

const MoviePlayer = ({ tmdbId, movieTitle }: MoviePlayerProps) => {
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

  return (
    <div className="player-section">
      <div className="player-header">
        <h2>Watch {movieTitle}</h2>
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
    </div>
  );
};

export default MoviePlayer;