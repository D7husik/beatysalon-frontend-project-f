import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks';

/**
 * Navbar Component
 * Main navigation bar with Suulu Salon logo, theme toggle, and accessible navigation
 * Uses React Router for proper URL-based navigation
 */
const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    // Handle "Services" link - navigates to home and scrolls to services
    const handleServicesClick = (e) => {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
            document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <nav className="navbar" role="navigation" aria-label="Main navigation">
            <div className="navbar__container">
                <div className="navbar__content">
                    {/* Logo */}
                    <Link to="/" className="navbar__logo" aria-label="Go to home page">
                        <img
                            src="/images/logo.png"
                            alt="Suulu Salon"
                            className="navbar__logo-img"
                        />
                    </Link>

                    {/* Navigation Links */}
                    <div className="navbar__links" role="menubar">
                        <button
                            onClick={handleServicesClick}
                            className="navbar__link"
                            role="menuitem"
                        >
                            Services
                        </button>
                        <NavLink
                            to="/booking"
                            className={({ isActive }) =>
                                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                            }
                            role="menuitem"
                        >
                            Book Now
                        </NavLink>
                        <NavLink
                            to="/appointments"
                            className={({ isActive }) =>
                                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                            }
                            role="menuitem"
                        >
                            My Appointments
                        </NavLink>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="navbar__theme-toggle"
                            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDarkMode ? (
                                <Sun className="icon" aria-hidden="true" />
                            ) : (
                                <Moon className="icon" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
