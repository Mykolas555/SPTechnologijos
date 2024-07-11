import React, { useState, useEffect, useRef } from 'react';
import SPTlogo from '../../src/assets/logojpg2,6k.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { auth, onAuthStateChanged } from '../firebase/firebase';
import { signOut } from 'firebase/auth';

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const menuRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCloseMenu = () => {
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      handleCloseMenu();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully');
      navigate('/')
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      unsubscribe();
    };
  }, []);

  return (
    <nav className="relative z-40 bg-white-400 border-white-200 dark:border-gray-600 dark:bg-gray-900 border-b-4 border-red-500">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={SPTlogo} alt="SPT Logo" />
        </Link>
        <button
          data-collapse-toggle="mega-menu-full-image"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mega-menu-full-image"
          aria-expanded={isDropdownOpen}
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div
          id="mega-menu-full-image"
          ref={menuRef}
          className={`absolute top-full left-0 right-0 bg-white-400 md:static md:bg-transparent md:flex items-center justify-between w-full md:w-auto md:order-1 ${isDropdownOpen ? 'block' : 'hidden'}`}
        >
          <ul className="flex flex-col p-4 mt-4 bg-gray-200 md:bg-transparent md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
            <li>
              <Link
                to="/AboutUs"
                className="block py-2 px-3 text-red-500 border-b border-gray-100 hover:bg-gray-50 hover:text-black md:hover:text-black md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                onClick={handleCloseMenu}
              >
                Apie mus
              </Link>
            </li>
            <li>
              <Link
                to="/Products"
                className="block py-2 px-3 text-red-500 border-b border-gray-100 hover:bg-gray-50 hover:text-black md:hover:text-black md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                onClick={handleCloseMenu}
              >
                Produktai
              </Link>
            </li>
            <li>
              <Link
                to="/Contacts"
                className="block py-2 px-3 text-red-500 border-b border-gray-100 hover:bg-gray-50 hover:text-black md:hover:text-black md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                onClick={handleCloseMenu}
              >
                Kontaktai
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/Add"
                    className="block py-2 px-3 text-red-500 border-b border-gray-100 hover:bg-gray-50 hover:text-black md:hover:text-black md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                    onClick={handleCloseMenu}
                  >
                    Pridėti
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      handleCloseMenu();
                    }}
                    className="block py-2 px-3 text-red-500 border-b border-gray-100 hover:bg-gray-50 hover:text-black md:hover:text-black md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Atsijungti
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/Login"
                  className="block py-2 px-3 text-red-500 border-b border-gray-100 hover:bg-gray-50 hover:text-black md:hover:text-black md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={handleCloseMenu}
                >
                  Prisijungti
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
