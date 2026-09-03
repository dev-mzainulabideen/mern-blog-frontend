import { useTranslation } from 'react-i18next';
import { User, Mail, Calendar, MapPin } from 'lucide-react';
import './Consultancy.css';

const AUTHOR = {
  nickname: 'Naeem Ishaq',
  title: 'Founder & Developer',
  bio: 'Full-stack developer passionate about building learning platforms.',
  email: 'naeem@example.com',
  location: 'Karachi, Pakistan',
  joined: 'January 2024',
  avatar: 'N'
};

function Consultancy() {
  const { t } = useTranslation();

  return (
    <div className="consultancy-page">
      <section className="consultancy-hero">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
        </div>
        
        <div className="container hero-content">
          <div className="hero-icon">
            <User size={36} />
          </div>
          <div className="hero-text">
            <h1>{t('consultancy.heroTitle')}</h1>
            <p>{t('consultancy.heroSubtitle')}</p>
          </div>
        </div>
      </section>

      <div className="container consultancy-content">
        <section className="mentors-section">
          <div className="author-card">
            <div className="author-avatar">
              {AUTHOR.avatar}
            </div>
            <div className="author-info">
              <h3>@{AUTHOR.nickname}</h3>
              <p className="author-title">{AUTHOR.title}</p>
              <p className="author-bio">{AUTHOR.bio}</p>
              <div className="author-details">
                <div className="detail-item">
                  <Mail size={16} />
                  <span>{AUTHOR.email}</span>
                </div>
                <div className="detail-item">
                  <MapPin size={16} />
                  <span>{AUTHOR.location}</span>
                </div>
                <div className="detail-item">
                  <Calendar size={16} />
                  <span>Joined {AUTHOR.joined}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Consultancy;