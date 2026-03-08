import { Link } from "react-router-dom";
import { forwardRef } from "react";

const MovieCard = forwardRef(({ movie }, ref) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Link to={`/movie/${movie.id}`}>
      <div
        ref={ref}
        className="
        rounded-2xl
        p-3
        bg-[#e0e0e0]
        shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]
        transition
        duration-300
        hover:scale-105
        active:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]
        flex flex-col
        "
      >
        <img
          src={imageUrl}
          alt={movie.title}
          className="rounded-xl mb-3 aspect-2/3 object-cover"
        />

        <h2 className="text-sm font-semibold mb-1 line-clamp-2 flex-1">
          {movie.title}
        </h2>
        <p className="text-xs text-gray-500">
          ⭐ {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </Link>
  );
});

export default MovieCard;
