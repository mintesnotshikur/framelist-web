import { createContext, useContext, useState, useEffect } from "react";

// Create Context
const WatchlistContext = createContext();

// Provider component
export function WatchlistProvider({ children }) {
  // Load watchlist from localStorage on first render
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Save watchlist whenever it changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addMovie = (movie) => {
    setWatchlist((prev) => {
      if (!prev.find((m) => m.id === movie.id)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeMovie = (id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  // remove all movies from watchlist
  const clearWatchlist = () => {
    setWatchlist([]);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addMovie, removeMovie, clearWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

// Hook to use the context
export function useWatchlist() {
  return useContext(WatchlistContext);
}
