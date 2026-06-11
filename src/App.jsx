import "./App.css";
import { Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MediaDetails from "./pages/MediaDetails";
import TVShows from "./pages/TVShows";
// components
import Navbar from "./components/Navbar";
// context
import { MovieProvider } from "./context/MovieContext";
function App() {
  return (
    <MovieProvider>
      <Navbar />
      <main className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tv" element={<TVShows />} />
          <Route path="/:type/:id" element={<MediaDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
