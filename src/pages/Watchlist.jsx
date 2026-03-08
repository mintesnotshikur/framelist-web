import { useState } from "react";
import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";
import ConfirmModal from "../components/ConfirmModal";

export default function Watchlist() {
  const [showConfirm, setShowConfirm] = useState(false);
  const { watchlist, clearWatchlist } = useWatchlist();

  if (watchlist.length === 0)
    return (
      <p className="text-center text-gray-600">
        No movies in your watchlist yet.
      </p>
    );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          My Watchlist
          <span className="text-sm text-gray-500 ml-2">
            ({watchlist.length} {watchlist.length === 1 ? "movie" : "movies"})
          </span>
        </h2>
        {/* neomorphic button */}
        <button
          onClick={() => setShowConfirm(true)}
          className="mb-6 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300 cursor-pointer"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {watchlist.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <ConfirmModal
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          clearWatchlist();
          setShowConfirm(false);
        }}
      />
    </div>
  );
}
