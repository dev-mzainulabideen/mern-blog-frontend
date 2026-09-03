import { useEffect, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Globe, 
  Shield,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { user, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const hasRegistered = typeof window !== 'undefined' && localStorage.getItem('registrationEmail');

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.home'), icon: null },
    { path: '/about', label: t('nav.about'), icon: null },
    { path: '/articles', label: t('nav.articles'), icon: null },
    { path: '/consultancy', label: t('nav.consultancy'), icon: null },
    { path: '/posts', label: t('nav.posts'), icon: null },
    { path: '/stories', label: t('nav.stories'), icon: null },
    { path: '/skills', label: t('nav.skills'), icon: null },
    { path: '/contact', label: t('nav.contact'), icon: null },
  ];

  const handleLogout = () => {
    logout();
    localStorage.removeItem('registrationEmail');
    setProfileOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">B</span>
          <span className="logo-text">BlogSite</span>
        </Link>

        <button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <ul className="navbar-nav">
            {navLinks.map(link => (
              <li key={link.path}>
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            <div className="action-buttons">
              <button 
                className="icon-button theme-toggle" 
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                title={theme === 'light' ? 'Dark mode' : 'Light mode'}
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <button 
                className="icon-button language-toggle"
                onClick={toggleLanguage}
                aria-label={`Switch to ${language === 'en' ? 'Urdu' : 'English'}`}
                title={language === 'en' ? 'Switch to Urdu' : 'Switch to English'}
              >
                <Globe size={18} />
                <span className="lang-label">{language === 'en' ? 'EN' : 'UR'}</span>
              </button>
            </div>

            <div className="auth-buttons" ref={profileRef}>
              {isAdmin ? (
                <div className="profile-dropdown-wrapper">
                  <button 
                    className="admin-profile-btn"
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    <Shield size={18} />
                    <span>Admin</span>
                    <ChevronDown size={16} className={profileOpen ? 'rotate' : ''} />
                  </button>
                  
                  {profileOpen && (
                    <div className="profile-dropdown">
                      <div className="dropdown-header">
                        <div className="admin-badge">
                          <Shield size={14} />
                          <span>Administrator</span>
                        </div>
                        <span className="user-email">{user?.email}</span>
                      </div>
                      <div className="dropdown-divider"></div>
                      <a 
                        href="http://localhost:5175" 
                        className="dropdown-item"
                        onClick={() => setProfileOpen(false)}
                      >
                        <Shield size={16} />
                        <span>Admin Panel</span>
                      </a>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : hasRegistered ? (
                <div className="profile-dropdown-wrapper">
                  <button 
                    className="user-profile-btn"
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    <User size={18} />
                    <span>My Status</span>
                    <ChevronDown size={16} className={profileOpen ? 'rotate' : ''} />
                  </button>
                  
                  {profileOpen && (
                    <div className="profile-dropdown">
                      <div className="dropdown-header">
                        <span className="user-name">Registered User</span>
                        <span className="user-email">{localStorage.getItem('registrationEmail')}</span>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link to="/register" className="dropdown-item" onClick={() => { setProfileOpen(false); setMenuOpen(false); }}>
                        <User size={16} />
                        <span>Check Status</span>
                      </Link>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/register" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;