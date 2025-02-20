import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { cartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import Header from "./Header";
import Logo from "./Logo";
import "./Navbar.module.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isUser, setIsUser } = useContext(UserContext);
  const { numberOfCart } = useContext(cartContext);

  const handleLogout = () => {
    localStorage.clear();
    setIsUser(false);
    navigate("/login", { replace: true });
    setMenuOpen(false); // Close menu when logging out
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".mobile-menu") && !event.target.closest(".menu-button")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="w-full fixed top-0 left-0 bg-white z-50">
        <Header />
        <nav className="w-full shadow-lg rounded-b-lg px-6 py-5 bg-main-light">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Logo />

              {/* Desktop Navigation (Visible on Large Screens) */}
              <ul className="hidden lg:flex items-center gap-6">
                {isUser !== false && (
                  <>
                    <NavLink to="/" className="text-lg text-slate-600 font-normal hover:text-main">
                      Home
                    </NavLink>
                    <NavLink to="/about" className="text-lg text-slate-600 font-normal hover:text-main">
                      About
                    </NavLink>
                    <NavLink to="/products" className="text-lg text-slate-600 font-normal hover:text-main">
                      Products
                    </NavLink>
                    <NavLink to="/contact" className="text-lg text-slate-600 font-normal hover:text-main">
                      Contact Us
                    </NavLink>
                  </>
                )}
              </ul>

              {/* Icons (Visible on Large Screens) */}
              <div className="hidden lg:flex items-center gap-6">
                {isUser === false ? (
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-heart cursor-pointer duration-200 fa-xl hover:text-[var(--main-color)]"></i>
                    <Link to="/cart" className="relative">
                      <i className="p-1 fa-solid fa-cart-shopping cursor-pointer duration-200 fa-xl hover:text-[var(--main-color)]"></i>
                      <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">
                        {numberOfCart || 0}
                      </div>
                    </Link>
                    <i
                      onClick={handleLogout}
                      className="fa-solid fa-right-from-bracket cursor-pointer duration-200 fa-xl hover:text-[var(--main-color)]"></i>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="menu-button block lg:hidden text-slate-600"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling to document
                  setMenuOpen(!menuOpen);
                }}
                aria-expanded={menuOpen}
                aria-label="Toggle navigation menu"
              >
                <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} fa-xl`}></i>
              </button>
            </div>

            {/* Mobile Navigation Menu */}
            <div
              className={`mobile-menu fixed top-0 left-0 w-full py-4 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                menuOpen ? "translate-x-0" : "-translate-x-full"
              } lg:hidden`}
            >
              {/* Menu Header with Close Button */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <Logo /> {/* Logo on the Left */}
                <button
                  className="text-slate-600 text-xl"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <i className="fa-solid fa-xmark"></i> {/* Close Button on the Right */}
                </button>
              </div>

              {/* Navigation Links for Mobile */}
              <ul className="flex flex-col items-center space-y-4 mt-4">
                {isUser !== false && (
                  <>
                    <NavLink
                      to="/"
                      onClick={() => setMenuOpen(false)}
                      className="text-lg text-slate-600 font-normal"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/about"
                      onClick={() => setMenuOpen(false)}
                      className="text-lg text-slate-600 font-normal"
                    >
                      About
                    </NavLink>
                    <NavLink
                      to="/products"
                      onClick={() => setMenuOpen(false)}
                      className="text-lg text-slate-600 font-normal"
                    >
                      Products
                    </NavLink>
                    <NavLink
                      to="/contact"
                      onClick={() => setMenuOpen(false)}
                      className="text-lg text-slate-600 font-normal"
                    >
                      Contact Us
                    </NavLink>
                  </>
                )}
              </ul>

              {/* Icons Section (Visible on Small Screens) */}
              <div className="flex items-center justify-center gap-6 mt-6">
                {isUser === false ? (
                  <>
                    <Link to="/login" className="text-lg" onClick={() => setMenuOpen(false)}>
                      Login
                    </Link>
                    <Link to="/register" className="text-lg" onClick={() => setMenuOpen(false)}>
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <i
                      className="fa-solid fa-heart cursor-pointer duration-200 fa-xl hover:text-[var(--main-color)]"
                      onClick={() => setMenuOpen(false)}
                    ></i>
                    <Link to="/cart" className="relative" onClick={() => setMenuOpen(false)}>
                      <i className="p-1 fa-solid fa-cart-shopping cursor-pointer duration-200 fa-xl hover:text-[var(--main-color)]"></i>
                      <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">
                        {numberOfCart || 0}
                      </div>
                    </Link>
                    <i
                      onClick={handleLogout}
                      className="fa-solid fa-right-from-bracket cursor-pointer duration-200 fa-xl hover:text-[var(--main-color)]"
                    ></i>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
