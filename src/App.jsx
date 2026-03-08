import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import Search from "./pages/Search.jsx";
import Navbar from "./components/Navbar.jsx";
import Snowfall from "react-snowfall";

function App() {
  return (
    <div className="min-h-screen bg-[#e0e0e0] text-gray-900">
      <Navbar />
      <Snowfall
        color="#c9c9c9"
        speed={[0.3, 0.7]}
        changeFrequency={100}
        snowflakeCount={80}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
