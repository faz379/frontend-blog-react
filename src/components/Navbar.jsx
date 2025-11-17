import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ConfirmLogout from "./ConfirmLogout";

import {
  FaInstagram,
  FaSquareGithub,
  FaLinkedin,
  FaBars,
  FaXmark,
} from "react-icons/fa6";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { path: "/", link: "Home" },
    { path: "/news", link: "News" },
    { path: "/olahraga", link: "Olahraga" },
    { path: "/bisnis", link: "Bisnis" },
    { path: "/bola", link: "Bola" },
    { path: "/teknologi", link: "Teknologi" },
  ];

  return (
    <header className="bg-black text-white fixed top-0 left-0 right-0 z-40">
      <nav className="px-4 py-4 max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Berita<span className="bg-orange-500 text-black rounded px-1">HUB</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-12 text-lg">
          {navItems.map(({ path, link }) => (
            <li key={path}>
              <NavLink to={path}>{link}</NavLink>
            </li>
          ))}
        </ul>

        {/* Right buttons */}
        <div className="hidden lg:flex gap-4 items-center">
          <FaInstagram className="hover:text-orange-500 cursor-pointer" />
          <FaSquareGithub className="hover:text-orange-500 cursor-pointer" />
          <FaLinkedin className="hover:text-orange-500 cursor-pointer" />

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-orange-500 px-6 py-2 rounded hover:bg-white hover:text-black transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              {/* IKON USER */}
              <div
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer text-lg font-semibold"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user?.email?.charAt(0).toUpperCase() ?? "U"}
              </div>

              {/* DROPDOWN */}
              {showDropdown && (
                <div className="absolute right-0 mt-3 bg-white text-black rounded shadow-lg w-48 p-4 z-50">
                  <p className="text-sm font-semibold mb-2 border-b pb-2">
                    {user?.email}
                  </p>

                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      setShowLogout(true);
                    }}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile icon */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaXmark className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <ul className="md:hidden bg-white text-black px-4 py-6 space-y-4">
          {navItems.map(({ path, link }) => (
            <li key={path}>
              <NavLink to={path} onClick={() => setIsMenuOpen(false)}>
                {link}
              </NavLink>
            </li>
          ))}

          <li>
            {!isLoggedIn ? (
              <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                Login
              </NavLink>
            ) : (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowLogout(true);
                }}
                className="text-red-600 font-semibold"
              >
                Logout
              </button>
            )}
          </li>
        </ul>
      )}

      {/* Logout Modal */}
      {showLogout && (
        <ConfirmLogout
          onCancel={() => setShowLogout(false)}
          onConfirm={() => {
            logout();
            setShowLogout(false);
            window.location.href = "/login";
          }}
        />
      )}
    </header>
  );
}
