// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-soft transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                <span className="text-primary-600 dark:text-primary-400">Edu</span>Track
              </h1>
            </div>
            <div className="hidden md:block ml-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Attendance Management System</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/student"
              className={`nav-link ${isActive('/student') ? 'nav-link-active' : ''}`}
            >
              Student Portal
            </Link>
            <Link
              to="/faculty"
              className={`nav-link ${isActive('/faculty') ? 'nav-link-active' : ''}`}
            >
              Faculty Portal
            </Link>
            <Link
              to="/faculty/select-batch"
              className={`nav-link ${isActive('/faculty/select-batch') ? 'nav-link-active' : ''}`}
            >
              Log Attendance
            </Link>
          </div>

          {/* Theme Toggle and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                aria-label="Open mobile menu"
              >
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/student"
              className={`nav-link ${isActive('/student') ? 'nav-link-active' : ''}`}
            >
              Student Portal
            </Link>
            <Link
              to="/faculty"
              className={`nav-link ${isActive('/faculty') ? 'nav-link-active' : ''}`}
            >
              Faculty Portal
            </Link>
            <Link
              to="/faculty/select-batch"
              className={`nav-link ${isActive('/faculty/select-batch') ? 'nav-link-active' : ''}`}
            >
              Log Attendance
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
