import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaInstagram, FaSquareGithub, FaLinkedin, FaBars, FaXmark } from "react-icons/fa6";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { path: "/", link: "Home" },
    { path: "/news", link: "News" },
    { path: "/olahraga", link: "Olahraga" },
    { path: "/bisnis", link: "Bisnis" },
    { path: "/bola", link: "Bola" },
    { path: "/teknologi", link: "Teknologi" },
  ];

  return (
    <header className='bg-black text-white fixed top-0 left-0 right-0 z-50'>
      <nav className='px-4 py-4 max-w-7xl mx-auto flex justify-between items-center'>

        <Link to="/" className='text-xl font-bold text-white'>
          Berita<span className='text-xl font-bold text-black bg-orange-500 rounded px-1 py-1'>HUB</span>
        </Link>

        <ul className='md:flex gap-12 text-lg hidden'>
          {navItems.map(({ path, link }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `hover:text-orange-500 ${isActive ? "text-orange-500 font-bold" : ""}`
                }
              >
                {link}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className='text-white lg:flex gap-4 items-center hidden'>
          <FaInstagram className='hover:text-orange-500 cursor-pointer' />
          <FaSquareGithub className='hover:text-orange-500 cursor-pointer' />
          <FaLinkedin className='hover:text-orange-500 cursor-pointer' />

          <Link
            to="/login"
            className="bg-orange-500 px-6 py-2 font-medium rounded hover:bg-white hover:text-black transition-all"
          >
            Login
          </Link>
        </div>

        <div className='md:hidden'>
          <button onClick={toggleMenu}>
            {isMenuOpen ? <FaXmark className='w-5 h-5' /> : <FaBars className='w-5 h-5' />}
          </button>
        </div>

      </nav>

      <ul
        className={`md:hidden z-50 gap-12 text-lg block space-y-4 px-4 py-6 mt-14 bg-white ${
          isMenuOpen ? "fixed top-0 left-0 w-full" : "hidden"
        }`}
      >
        {navItems.map(({ path, link }) => (
          <li key={path}>
            <NavLink onClick={toggleMenu} to={path}>
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default Navbar;
