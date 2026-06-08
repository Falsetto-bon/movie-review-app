import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./context/MovieContext";
function App() {
  return (
    <MovieProvider>
      <Navbar />
      <main className="pt-24">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
