const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export async function getTrendingMovies(page = 1) {
  const res = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`,
  );
  const data = await res.json();
  return data.results;
}

export async function discoverMovies(page = 1) {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`,
  );

  const data = await res.json();
  return data.results;
}

// get details
export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
}

export async function searchMovies(query, page = 1) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
  );
  const data = await res.json();
  return data.results;
}

export async function getTopTrending() {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);

  const data = await res.json();

  return data.results.slice(0, 10);
}

export async function getMovieTrailer(movieId) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
  );

  const data = await res.json();

  const trailer = data.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );

  return trailer ? trailer.key : null;
}
