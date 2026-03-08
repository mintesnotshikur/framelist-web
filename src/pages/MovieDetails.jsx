import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails, getMovieTrailer } from "../services/tmdb";
import { useWatchlist } from "../context/WatchlistContext";

import bookmarkIcon from "../assets/bookmark.png";
import bookmarkIconFilled from "../assets/bookmark-filled.png";
import Loading from "../components/Loading";
import TrailerModal from "../components/TrailerModal";
import youtubeIcon from "../assets/youtube-icon.png";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { watchlist, addMovie, removeMovie } = useWatchlist();
  const isInWatchlist = watchlist.some((m) => m.id === Number(id));
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const navigate = useNavigate();

  async function handleTrailer() {
    const key = await getMovieTrailer(movie.id);

    if (key) {
      setTrailerKey(key);
      setShowTrailer(true);
    } else {
      alert("Trailer not available");
    }
  }

  useEffect(() => {
    async function fetchMovie() {
      const data = await getMovieDetails(id);
      setMovie(data);
    }
    fetchMovie();
  }, [id]);

  if (!movie) return <Loading />;

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="max-w-7xl mx-auto bg-[#e0e0e0] rounded-2xl md:mt-7 p-4 md:p-8 shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]">
      <div className="flex w-full gap-4 justify-between md:justify-start">
        <button
          className="px-4 py-2 bg-[#e0e0e0] rounded-xl shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] hover:shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] transition cursor-pointer mb-6"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <button
          className="px-4 py-2 bg-[#e0e0e0] rounded-xl shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] hover:shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] transition cursor-pointer mb-6"
          onClick={() =>
            isInWatchlist ? removeMovie(movie.id) : addMovie(movie)
          }
        >
          {isInWatchlist ? (
            <img
              src={bookmarkIconFilled}
              alt="Watchlist"
              className="w-7 h-7 object-contain"
            />
          ) : (
            <img
              src={bookmarkIcon}
              alt="Watchlist"
              className="w-7 h-7 object-contain"
            />
          )}
        </button>
        <button
          onClick={handleTrailer}
          className="px-4 py-2 bg-[#e0e0e0] rounded-xl shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] hover:shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] transition cursor-pointer mb-6"
        >
          <img
            src={youtubeIcon}
            alt="Youtube Trailer"
            className="w-7 h-7 object-contain inline-block mr-2"
          />
          Watch Trailer
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={imageUrl}
          alt={movie.title}
          className="rounded-xl w-75 md:w-64 object-cover shadow-lg self-center"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Release Date:</span>{" "}
            {movie.release_date}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Language:</span>{" "}
            {movie.spoken_languages[0]?.english_name}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Genres:</span>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Rating:</span> ⭐{" "}
            {movie.vote_average.toFixed(1)}
          </p>
          <p className="text-gray-800 mt-4">{movie.overview}</p>
        </div>
      </div>
      {showTrailer && (
        <TrailerModal
          trailerKey={trailerKey}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
}
