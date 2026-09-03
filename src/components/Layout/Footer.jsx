import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Mail, 
  MapPin, 
  Send,
  UserPlus,
  BookOpen,
  Sparkles,
  GraduationCap,
  MessageCircle,
  Search,
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
          </div >

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
            </div>
            <div className="footer-search">
              <Search size={16} />
              <input type="text" placeholder="Search..." />
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