import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ConfirmLogout from "./ConfirmLogout";

import { FaInstagram, FaSquareGithub, FaLinkedin, FaBars, FaXmark } from "react-icons/fa6";

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

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

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white">
          Berita<span className="text-xl bg-orange-500 text-black rounded px-1">HUB</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="md:flex gap-12 text-lg hidden">
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

          {isLoggedIn ? (
            <button
              onClick={() => setShowLogout(true)}
              className="bg-red-600 px-6 py-2 rounded hover:bg-white hover:text-black transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-orange-500 px-6 py-2 rounded hover:bg-white hover:text-black transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaXmark className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <ul
        className={`md:hidden bg-white text-black px-4 py-6 space-y-4 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        {navItems.map(({ path, link }) => (
          <li key={path}>
            <NavLink to={path} onClick={() => setIsMenuOpen(false)}>
              {link}
            </NavLink>
          </li>
        ))}

        <li>
          {isLoggedIn ? (
            <button
              onClick={() => setShowLogout(true)}
              className="text-red-600 font-semibold"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
              Login
            </NavLink>
          )}
        </li>
      </ul>

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
