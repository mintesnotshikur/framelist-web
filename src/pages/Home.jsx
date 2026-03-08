import { useEffect, useState, useRef, useCallback } from "react";
import {
  discoverMovies,
  getTrendingMovies,
  searchMovies,
} from "../services/tmdb";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import TrendingRow from "../components/TrendingRow";
import filmIcon from "../assets/film.png";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search");

  const observer = useRef();
  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  // Reset when query changes
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  // Fetch movies
  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      let data = [];
      if (query) {
        data = await searchMovies(query, page);
      } else {
        data = await discoverMovies(page);
      }

      if (data.length === 0) setHasMore(false);
      setMovies((prev) => [...prev, ...data]);
      setLoading(false);
    }
    loadMovies();
  }, [page, query]);

  return (
    <div className="px-2">
      <div>
        {!query && <TrendingRow />}

        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          {query ? (
            `Search Results for "${query}"`
          ) : (
            <div className="flex items-center gap-2">
              <img src={filmIcon} alt="Film Icon" width={30} />{" "}
              <span>All Movies</span>
            </div>
          )}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {movies.map((movie, index) => {
          if (movies.length === index + 1) {
            return (
              <MovieCard ref={lastMovieRef} key={movie.id} movie={movie} />
            );
          } else {
            return <MovieCard key={movie.id} movie={movie} />;
          }
        })}

        {loading &&
          Array.from({ length: 6 }).map((_, idx) => (
            <MovieCardSkeleton key={`skeleton-${idx}`} />
          ))}
      </div>
    </div>
  );
}
