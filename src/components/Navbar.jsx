import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaInstagram, FaSquareGithub, FaLinkedin, FaBars, FaXmark } from "react-icons/fa6";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", link: "Home" },
    { path: "/news", link: "News" },
    { path: "/olahraga", link: "Olahraga" },
    { path: "/bisnis", link: "Bisnis" },
    { path: "/bola", link: "Bola" },
    { path: "/teknologi", link: "Teknologi" },
  ];

  return (
    <header className='bg-black text-white fixed top-0 left-0 right-0'>
      <nav className='px-4 py-4 max-w-7xl mx-auto flex justify-between items-center'>
        <Link to="/" className='text-xl font-bold text-white'>
          Berita<span className='text-xl font-bold text-black bg-orange-500 rounded px-1 py-1'>HUB</span>
        </Link>

        <ul className='md:flex gap-12 text-lg hidden'>
          {navItems.map(({ path, link }) => (
            <li className='text-white' key={path}>
              <NavLink to={path}>{link}</NavLink>
            </li>
          ))}
        </ul>

        <div className='text-white lg:flex gap-4 items-center hidden'>
          <a href="#" className='hover:text-orange-500'><FaInstagram /></a>
          <a href="#" className='hover:text-orange-500'><FaSquareGithub /></a>
          <a href="#" className='hover:text-orange-500'><FaLinkedin /></a>

          {/* Login / Logout Button */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-6 py-2 font-medium rounded hover:bg-white hover:text-black transition-all"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-orange-500 px-6 py-2 font-medium rounded hover:bg-white hover:text-black transition-all"
            >
              Login
            </Link>
          )}
        </div>

        <div className='md:hidden'>
          <button onClick={toggleMenu} className='cursor-pointer'>
            {isMenuOpen ? <FaXmark className='w-5 h-5' /> : <FaBars className='w-5 5-h' />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div>
        <ul
          className={`md:hidden gap-12 text-lg block space-y-4 px-4 py-6 mt-14 bg-white ${
            isMenuOpen ? "fixed top-0 left-0 w-full" : "hidden"
          }`}
        >
          {navItems.map(({ path, link }) => (
            <li className='text-black' key={path}>
              <NavLink onClick={toggleMenu} to={path}>{link}</NavLink>
            </li>
          ))}

          {/* Mobile Login / Logout */}
          <li className="text-black">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-red-600 font-bold">Logout</button>
            ) : (
              <NavLink onClick={toggleMenu} to="/login">Login</NavLink>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
