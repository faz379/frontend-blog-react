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
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");

    if (!confirmLogout) return;

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
    <header className='bg-black text-white fixed top-0 left-0 right-0 z-50 shadow-lg'>
      <nav className='px-4 py-4 max-w-7xl mx-auto flex justify-between items-center'>
        <Link to="/" className='text-xl font-bold text-white'>
          Berita
          <span className='text-xl font-bold text-black bg-orange-500 rounded px-1 py-1 ml-1'>
            HUB
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className='md:flex gap-12 text-lg hidden'>
          {navItems.map(({ path, link }) => (
            <li key={path}>
              <NavLink 
                to={path}
                className="hover:text-orange-500 transition"
              >
                {link}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Right Menu */}
        <div className='text-white lg:flex gap-4 items-center hidden'>
          <a href="#" className='hover:text-orange-500'><FaInstagram /></a>
          <a href="#" className='hover:text-orange-500'><FaSquareGithub /></a>
          <a href="#" className='hover:text-orange-500'><FaLinkedin /></a>

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

        {/* Mobile menu button */}
        <div className='md:hidden'>
          <button onClick={toggleMenu} className='cursor-pointer'>
            {isMenuOpen ? <FaXmark className='w-5 h-5' /> : <FaBars className='w-5 h-5' />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <ul
        className={`md:hidden text-lg space-y-4 px-4 py-6 mt-14 bg-white text-black shadow-lg ${
          isMenuOpen ? "fixed top-0 left-0 w-full" : "hidden"
        }`}
      >
        {navItems.map(({ path, link }) => (
          <li key={path}>
            <NavLink onClick={toggleMenu} to={path} className="block py-2 border-b">
              {link}
            </NavLink>
          </li>
        ))}

        <li className="border-t pt-3">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full text-left text-red-600 font-bold py-2"
            >
              Logout
            </button>
          ) : (
            <NavLink onClick={toggleMenu} to="/login" className="block py-2 text-blue-600">
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
