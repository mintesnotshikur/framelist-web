import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { searchMovies } from "../services/tmdb";
import logo from "../assets/logo.png";
import bookmarkIconFilled from "../assets/bookmark-filled.png";
export default function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const itemRefs = useRef([]); // add this

  // Fetch results with debounce
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setHighlightIndex(-1);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      const data = await searchMovies(query);
      setResults(data.slice(0, 5));
      setHighlightIndex(-1);
      itemRefs.current = []; // reset refs
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Scroll into view when highlight changes
  useEffect(() => {
    if (highlightIndex >= 0 && itemRefs.current[highlightIndex]) {
      itemRefs.current[highlightIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightIndex]);

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setResults([]);
        setHighlightIndex(-1);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelect = (movieId) => {
    navigate(`/movie/${movieId}`);
    setQuery("");
    setResults([]);
    setHighlightIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < results.length) {
        // Navigate to highlighted result
        handleSelect(results[highlightIndex].id);
      } else if (query.trim() !== "") {
        // Navigate to Home page with search query
        navigate(`/?search=${encodeURIComponent(query.trim())}`);
        setQuery("");
        setResults([]);
      }
    }
  };

  return (
    // fiXed when scroll down with backdrop blur and shadow
    <nav className="flex flex-col md:flex-row justify-between items-center gap-4 font-semibold text-gray-800 sticky top-0 bg-[#e0e0e0] z-50 p-4 rounded-xl ">
      <div className="flex justify-between items-center gap-6 w-full md:w-auto">
        <Link to="/">
          <img
            src={logo}
            alt="Movie Explorer Logo"
            className="w-20 h-auto object-contain"
          />
        </Link>
        <Link to="/watchlist" className="md:hidden">
          <img
            src={bookmarkIconFilled}
            alt="Watchlist"
            className="w-13 h-13 object-contain"
          />
        </Link>
      </div>
      {/* Search bar with dropdown */}
      <div className="relative md:w-175 w-100" ref={dropdownRef}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search movies..."
          className="
            p-5 rounded-xl md:w-full w-100
            bg-[#e0e0e0] shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff]
            focus:outline-neutral-600 focus:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]
          "
        />

        {results.length > 0 && (
          <ul className="absolute top-12 left-0 right-0 bg-[#e0e0e0] shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] rounded-xl max-h-72 overflow-y-auto z-50">
            {results.map((movie, index) => (
              <li
                key={movie.id}
                ref={(el) => (itemRefs.current[index] = el)}
                onClick={() => handleSelect(movie.id)}
                className={`
                  flex items-center gap-3 px-2 py-1 cursor-pointer rounded-xl
                  ${highlightIndex === index ? "bg-gray-200" : ""}
                `}
                onMouseEnter={() => setHighlightIndex(index)}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                      : "https://via.placeholder.com/92x138?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-12 rounded-lg shrink-0"
                />
                <span className="truncate">
                  {movie.title} ({movie.release_date?.slice(0, 4)})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="hidden md:flex">
        <Link to="/watchlist">
          <img
            src={bookmarkIconFilled}
            alt="Watchlist"
            className="w-13 h-13 object-contain"
          />
        </Link>
      </div>
    </nav>
  );
}
