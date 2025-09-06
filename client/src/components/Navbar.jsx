import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../store/AppContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logoutUser } = useAppContext();

  const handleLogout = async () => {
    await logoutUser();
    setIsMenuOpen(false);
  };

  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-30 bg-gradient-to-r from-indigo-700 to-violet-500 transition-all">

      <Link to="/" className="flex items-center">
        <svg
          width="157"
          height="40"
          viewBox="0 0 157 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754M2.405 15.408 15.5 22.954l13.095-7.546M15.5 38V22.939M29 28.915V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3 3 0 0 0 1.5-2.585"
            stroke="#F5F5F5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {/* Desktop Menu */}
      <ul className="text-white md:flex hidden items-center gap-10">
        <li>
          <Link className="hover:text-white/70 transition" to="/">
            Home
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link className="hover:text-white/70 transition" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li>
              <Link className="hover:text-white/70 transition" to="/salary">
                Salary
              </Link>
            </li>
            <li>
              <Link className="hover:text-white/70 transition" to="/expenses">
                Expenses
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-white/70 transition"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="hover:text-white/70 transition" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="hover:text-white/70 transition" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Desktop Button */}
      {!user && (
        <Link
          to="/register"
          className="bg-white text-gray-700 md:inline  text-sm hover:opacity-90 active:scale-95 transition-all w-40 h-11 rounded-full flex items-center justify-center"
        >
          Get started
        </Link>
      )}

      {/* Mobile Menu Button */}
      <button
        aria-label="menu-btn"
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="menu-btn inline-block md:hidden active:scale-90 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="#fff"
        >
          <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu absolute top-[70px] left-0 w-full bg-gradient-to-r from-indigo-700 to-violet-500 p-6 md:hidden">
          <ul className="flex flex-col space-y-4 text-white text-lg">
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/salary" onClick={() => setIsMenuOpen(false)}>
                    Salary
                  </Link>
                </li>
                <li>
                  <Link to="/expenses" onClick={() => setIsMenuOpen(false)}>
                    Expenses
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user && (
            <Link
              to="/register"
              onClick={() => setIsMenuOpen(false)}
              className="bg-white text-gray-700 mt-6 md:hidden text-sm hover:opacity-90 active:scale-95 transition-all w-40 h-11 rounded-full flex items-center justify-center"
            >
              Get started
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
