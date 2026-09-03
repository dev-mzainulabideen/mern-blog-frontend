import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Mail, 
  MapPin,
  UserPlus,
  BookOpen,
  Sparkles,
  GraduationCap,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import './Footer.css';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: t('nav.home'), icon: null },
    { path: '/about', label: t('nav.about'), icon: null },
    { path: '/articles', label: t('nav.articles'), icon: BookOpen },
    { path: '/skills', label: t('nav.skills'), icon: Sparkles },
    { path: '/consultancy', label: t('nav.consultancy'), icon: GraduationCap },
    { path: '/contact', label: t('nav.contact'), icon: MessageCircle },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-icon">B</span>
              <span className="logo-text">BlogSite</span>
            </Link>
            <p className="footer-description">
              A modern platform for learning, sharing knowledge, and connecting with professionals. 
              Empowering skill development and community growth.
            </p>
            <div className="footer-cta">
              <Link to="/register" className="cta-button">
                <UserPlus size={18} />
                <span>Join Community</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">{t('footer.quickLinks')}</h3>
            <ul className="footer-links">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              <li><Link to="/articles">Articles</Link></li>
              <li><Link to="/posts">Posts</Link></li>
              <li><Link to="/stories">Success Stories</Link></li>
              <li><Link to="/skills">Skill Matching</Link></li>
              <li><Link to="/consultancy">Consultancy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">{t('footer.connect')}</h3>
            <div className="contact-info">
              <a href="mailto:contact@blogsite.com" className="contact-item">
                <Mail size={16} />
                <span>contact@blogsite.com</span>
              </a>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Islamabad, Pakistan</span>
              </div>
              <a href="https://www.linkedin.com/in/naeem-ishaq-1248a417/" className="contact-item" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
         </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} BlogSite. {t('footer.copyright')}</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;