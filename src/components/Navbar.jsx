import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { searchMulti } from "../services/api";

function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    try {
      const results = await searchMulti(q);
      const first = results?.[0];
      if (!first) return;
      navigate(
        first.media_type === "tv"
          ? `/tv/${first.id}`
          : `/${"movie"}/${first.id}`,
      );
    } catch {
      // ignore search errors in navbar
    }
  };

  return (
    <nav
      id="navbar"
      className="fixed top-0 z-50 w-full h-16 md:h-20 px-4 md:px-16 bg-black text-zinc-200 flex justify-between items-center gap-4"
    >
      <div id="navbar-brand">
        <Link to="/">
          <h1 className="text-[16px] font-semibold tracking-wide lg:text-2xl">
            Movie Review
          </h1>
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
        <form onSubmit={onSubmit} className="w-full max-w-xl px-4">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-500 transition-colors duration-200">
              <i className="fa-solid fa-magnifying-glass text-sm" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies & TV series..."
              className="w-full h-12 pl-11 pr-28 rounded-2xl bg-zinc-900/40 backdrop-blur-md border border-zinc-800 text-zinc-100 placeholder-zinc-500 outline-none transition-all duration-300 ease-in-out focus:bg-zinc-900/80 focus:border-zinc-700 focus:ring-2 focus:ring-red-600/20 focus:shadow-[0_0_20px_-3px_rgba(220,38,38,0.15)]"
            />

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-[10px] text-zinc-400 opacity-60 group-focus-within:opacity-0 transition-opacity duration-200">
                <span>⌘</span>K
              </kbd>

              <button
                type="submit"
                className="h-8 px-4 rounded-xl bg-red-600 text-xs font-bold text-white tracking-wide uppercase cursor-pointer transition-all duration-200 hover:bg-red-500 active:scale-95"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      <div id="navbar-links" className="flex lg:text-xl">
        <Link to="/" className="w-25 text-center">
          <h3>Movies</h3>
        </Link>
        <Link to="/tv" className="w-25 text-center">
          <h3>TV Shows</h3>
        </Link>
        <Link to="/favorites" className="w-25 text-center">
          <h3>Favorites</h3>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
