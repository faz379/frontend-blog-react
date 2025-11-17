import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaInstagram, FaSquareGithub, FaLinkedin, FaBars, FaXmark } from "react-icons/fa6";
import ConfirmLogout from "./ConfirmLogout"; 

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    window.location.href = "/login";
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
    <>
      <header className='bg-black text-white fixed top-0 left-0 right-0 z-20'>
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
            <FaInstagram className='hover:text-orange-500 cursor-pointer' />
            <FaSquareGithub className='hover:text-orange-500 cursor-pointer' />
            <FaLinkedin className='hover:text-orange-500 cursor-pointer' />

            {isLoggedIn ? (
              <button
                onClick={() => setShowLogoutModal(true)}
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
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaXmark className='w-5 h-5' /> : <FaBars className='w-5 h-5' />}
            </button>
          </div>
        </nav>

        <div>
          <ul
            className={`md:hidden gap-12 text-lg block space-y-4 px-4 py-6 mt-14 bg-white ${
              isMenuOpen ? "fixed top-0 left-0 w-full" : "hidden"
            }`}
          >
            {navItems.map(({ path, link }) => (
              <li className='text-black' key={path}>
                <NavLink onClick={() => setIsMenuOpen(false)} to={path}>{link}</NavLink>
              </li>
            ))}

            <li className="text-black">
              {isLoggedIn ? (
                <button onClick={() => setShowLogoutModal(true)} className="text-red-600 font-bold">Logout</button>
              ) : (
                <NavLink onClick={() => setIsMenuOpen(false)} to="/login">Login</NavLink>
              )}
            </li>
          </ul>
        </div>
      </header>

      {/* Custom Logout Modal */}
      {showLogoutModal && (
        <ConfirmLogout
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </>
  );
}

export default Navbar;
