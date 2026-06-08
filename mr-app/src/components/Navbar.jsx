import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav
      id="navbar"
      className="fixed top-0 z-50 w-full bg-black px-8 py-4 text-zinc-200 flex justify-between h-20 items-center"
    >
      <div id="navbar-brand">
        <Link to="/">
          <h1 className="text-[16px] font-semibold tracking-wide lg:text-2xl">
            Movie Review
          </h1>
        </Link>
      </div>
      <div id="navbar-links" className="flex lg:text-xl">
        <Link to="/" className="mr-4">
          <h3>Movies</h3>
        </Link>
        <Link to="/favorites">
          <h3>Favorites</h3>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
