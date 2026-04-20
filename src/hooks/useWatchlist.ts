import { useState, useEffect } from 'react';

const WATCHLIST_KEY = 'netmovies_watchlist';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<number[]>([]);

  useEffect(() => {
    // Load watchlist from localStorage on mount
    const stored = localStorage.getItem(WATCHLIST_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setWatchlist(parsed);
        }
      } catch (error) {
        console.error('Failed to parse watchlist from localStorage:', error);
      }
    }
  }, []);

  const addToWatchlist = (movieId: number) => {
    setWatchlist(prev => {
      if (!prev.includes(movieId)) {
        const newList = [...prev, movieId];
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newList));
        return newList;
      }
      return prev;
    });
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist(prev => {
      const newList = prev.filter(id => id !== movieId);
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newList));
      return newList;
    });
  };

  const isInWatchlist = (movieId: number) => {
    return watchlist.includes(movieId);
  };

  const toggleWatchlist = (movieId: number) => {
    if (isInWatchlist(movieId)) {
      removeFromWatchlist(movieId);
    } else {
      addToWatchlist(movieId);
    }
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatchlist
  };
};