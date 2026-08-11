import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Car, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <Car className="brand-icon" size={28} />
          <span>CarFix</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end>
            Home
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Services
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            About Us
          </NavLink>
          <NavLink to="/centers" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Service Centers
          </NavLink>
          <NavLink to="/pricing" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Pricing
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Contact
          </NavLink>
        </nav>

        {/* Desktop Right Side Action Buttons */}
        <div className="nav-actions">
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'btn-secondary active' : 'btn-secondary')}>
            Login
          </NavLink>
          <NavLink to="/register" className={({ isActive }) => (isActive ? 'btn-primary active' : 'btn-primary')}>
            Sign Up
          </NavLink>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-nav">
          <ul className="mobile-nav-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
                onClick={closeMobileMenu}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
                onClick={closeMobileMenu}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
                onClick={closeMobileMenu}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/centers"
                className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
                onClick={closeMobileMenu}
              >
                Service Centers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pricing"
                className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
                onClick={closeMobileMenu}
              >
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
                onClick={closeMobileMenu}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="mobile-nav-actions">
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? 'btn-secondary active' : 'btn-secondary')}
              onClick={closeMobileMenu}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? 'btn-primary active' : 'btn-primary')}
              onClick={closeMobileMenu}
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
