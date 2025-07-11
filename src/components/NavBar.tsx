import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Home, ShoppingBag, Info, Mail, HelpCircle,
  ShoppingCart, Newspaper, Sun, Moon, LogIn,
  LogOut, Menu
} from 'lucide-react';

const NavBar = () => {
  const location = useLocation();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
    setIsDark(shouldBeDark);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        isMenuOpen &&
        !target.closest('.mobile-menu-container') &&
        !target.closest('.mobile-menu-button')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const getLinkClasses = (path: string) => {
    const base = 'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors';
    const active = isDark ? 'text-yellow-400 bg-gray-800' : 'text-blue-600 bg-gray-100';
    const inactive = isDark ? 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100';
    return `${base} ${isActive(path) ? active : inactive}`;
  };

  const navLinks = [
    { path: '/', text: 'Home', icon: <Home size={16} /> },
    { path: '/shop', text: 'Shop', icon: <ShoppingBag size={16} /> },
    { path: '/about-us', text: 'About', icon: <Info size={16} /> },
    { path: '/notifications', text: 'Notifications', icon: <Newspaper size={16} /> },
    { path: '/contact', text: 'Contact', icon: <Mail size={16} /> },
    { path: '/faq', text: 'FAQ', icon: <HelpCircle size={16} /> },
  ];

  const authLinks = isAuthenticated ? [
    { path: '/cart', text: 'Cart', icon: <ShoppingCart size={16} /> },
    { path: '/orders', text: 'Orders', icon: <ShoppingBag size={16} /> },
  ] : [];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
          FrankJewelry
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4">
          {[...navLinks, ...authLinks].map(link => (
            <Link key={link.path} to={link.path} className={getLinkClasses(link.path)}>
              {link.icon}
              {link.text}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} aria-label="Toggle Theme" className="text-gray-600 dark:text-gray-300 hover:text-yellow-400">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="text-green-600 hover:text-green-700 flex items-center gap-1 px-3 py-2 rounded-md font-medium transition-colors"
                title="Profile"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1112 21a8.963 8.963 0 01-6.879-3.196z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Profile
              </Link>
              <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                className="text-red-500 hover:text-red-600"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <button onClick={()=>loginWithRedirect()} className="text-blue-600 hover:text-blue-700" aria-label="Login">
              <LogIn size={20} />
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button md:hidden text-gray-700 dark:text-gray-200"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        className={`mobile-menu-container md:hidden bg-white dark:bg-gray-800 px-4 pt-2 pb-4 transition-all duration-300 ease-in-out transform ${isMenuOpen ? 'block' : 'hidden'}`}
      >
        {[...navLinks, ...authLinks].map(link => (
          <Link key={link.path} to={link.path} className={getLinkClasses(link.path)}>
            {link.icon}
            {link.text}
          </Link>
        ))}

        <div className="mt-4 flex flex-col gap-3">
          <button onClick={toggleTheme} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-green-600 hover:text-green-700 px-3 py-2 rounded-md font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1112 21a8.963 8.963 0 01-6.879-3.196z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Profile
              </Link>
              <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                className="flex items-center gap-2 text-red-500"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <button onClick={()=>loginWithRedirect()} className="flex items-center gap-2 text-blue-600">
              <LogIn size={16} />
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
