import { useEffect, useState } from "react";
import { getTopTrending } from "../services/tmdb";
import { Link } from "react-router-dom";

export default function TrendingRow() {
  const [heroMovie, setHeroMovie] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadTrending() {
      const data = await getTopTrending();
      setHeroMovie(data[0]);
      setMovies(data);
    }

    loadTrending();
  }, []);

  return (
    <div className="mb-12 md:px-2">
      {heroMovie && (
        <div className="mb-14 rounded-3xl overflow-hidden relative bg-[#e0e0e0] shadow-[10px_10px_25px_#bebebe,-10px_-10px_25px_#ffffff]">
          <img
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt={heroMovie.title}
            className="w-full h-80 md:h-105 object-cover"
          />

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>

          {/* content */}
          <div className="absolute bottom-6 left-6 text-white max-w-xl">
            <h1 className="text-2xl md:text-4xl font-bold mb-3">
              #{1} Trending: {heroMovie.title}
            </h1>

            <p className="text-sm md:text-base opacity-90 line-clamp-3 mb-4 hidden md:block">
              {heroMovie.overview}
            </p>

            <div className="flex items-center gap-4">
              <Link
                to={`/movie/${heroMovie.id}`}
                className="px-5 py-2 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
              >
                View Details
              </Link>

              <span className="text-sm">
                ⭐ {heroMovie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        🔥 Top 10 Trending
      </h2>

      <div className="flex gap-6 overflow-x-auto p-4 scrollbar-hide">
        {movies.map((movie, index) => {
          const imageUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image";

          return (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="max-w-50 md:max-w-70 shrink-0"
            >
              <div
                className="relative rounded-2xl bg-[#e0e0e0] p-2 shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:scale-105 transition 
        duration-300"
              >
                <img
                  src={imageUrl}
                  alt={movie.title}
                  className="rounded-xl aspect-2/3 object-cover"
                />

                {/* ranking number */}
                <span className="absolute -left-3 -top-3 text-4xl font-black text-gray-400">
                  {index + 1}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
