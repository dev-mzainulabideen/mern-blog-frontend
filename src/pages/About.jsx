import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, 
  Users, 
  Award, 
  BookOpen, 
  Shield, 
  Target, 
  Eye,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Lightbulb
} from 'lucide-react';
import './About.css';

const PLATFORM_FEATURES = [
  {
    id: 'skill-matching',
    icon: Sparkles,
    titleKey: 'about.features.skillMatching.title',
    descKey: 'about.features.skillMatching.desc'
  },
  {
    id: 'anonymous',
    icon: Users,
    titleKey: 'about.features.anonymous.title',
    descKey: 'about.features.anonymous.desc'
  },
  {
    id: 'success-stories',
    icon: Award,
    titleKey: 'about.features.successStories.title',
    descKey: 'about.features.successStories.desc'
  },
  {
    id: 'blog',
    icon: BookOpen,
    titleKey: 'about.features.blog.title',
    descKey: 'about.features.blog.desc'
  },
  {
    id: 'moderation',
    icon: Shield,
    titleKey: 'about.features.moderation.title',
    descKey: 'about.features.moderation.desc'
  }
];

const WHY_CHOOSE = [
  {
    id: 'community',
    icon: Users,
    titleKey: 'about.why.community.title',
    descKey: 'about.why.community.desc'
  },
  {
    id: 'privacy',
    icon: Shield,
    titleKey: 'about.why.privacy.title',
    descKey: 'about.why.privacy.desc'
  },
  {
    id: 'learning',
    icon: Lightbulb,
    titleKey: 'about.why.learning.title',
    descKey: 'about.why.learning.desc'
  },
  {
    id: 'growth',
    icon: Target,
    titleKey: 'about.why.growth.title',
    descKey: 'about.why.growth.desc'
  }
];

function About() {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      {/* Hero About Section */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <div className="about-gradient"></div>
          <div className="about-grid"></div>
        </div>
        
        <div className="container about-hero-content">
          <div className="about-hero-text">
            <h1>{t('about.heroTitle')}</h1>
            <p>{t('about.heroSubtitle')}</p>
          </div>
          <div className="about-hero-visual">
            <div className="about-visual-icon">
              <Sparkles size={48} />
            </div>
          </div>
        </div>
      </section>

      {/* Platform Story Section */}
      <section className="about-section about-story">
        <div className="container">
          <div className="about-section-header">
            <h2>{t('about.story.title')}</h2>
            <p>{t('about.story.desc')}</p>
          </div>
          
          <div className="story-steps">
            <div className="about-step">
              <div className="step-icon">
                <Users size={24} />
              </div>
              <h3>{t('about.story.step1.title')}</h3>
              <p>{t('about.story.step1.desc')}</p>
            </div>
            <div className="about-step">
              <div className="step-icon">
                <Sparkles size={24} />
              </div>
              <h3>{t('about.story.step2.title')}</h3>
              <p>{t('about.story.step2.desc')}</p>
            </div>
            <div className="about-step">
              <div className="step-icon">
                <Award size={24} />
              </div>
              <h3>{t('about.story.step3.title')}</h3>
              <p>{t('about.story.step3.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="about-section about-features">
        <div className="container">
          <div className="about-section-header">
            <h2>{t('about.features.title')}</h2>
            <p>{t('about.features.subtitle')}</p>
          </div>
          
          <div className="features-grid">
            {PLATFORM_FEATURES.map((feature, index) => (
              <div 
                key={feature.id} 
                className="about-feature"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div className="feature-icon-wrapper">
                  <feature.icon size={24} />
                </div>
                <h3>{t(`about.features.${feature.id}.title`)}</h3>
                <p>{t(`about.features.${feature.id}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Platform */}
      <section className="about-section about-why">
        <div className="container">
          <div className="about-section-header">
            <h2>{t('about.why.title')}</h2>
            <p>{t('about.why.subtitle')}</p>
          </div>
          
          <div className="why-grid">
            {WHY_CHOOSE.map((item, index) => (
              <div 
                key={item.id} 
                className="about-card"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="card-icon">
                  <item.icon size={28} />
                </div>
                <h3>{t(`about.why.${item.id}.title`)}</h3>
                <p>{t(`about.why.${item.id}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Vision Section */}
      <section className="about-section about-mission-vision">
        <div className="container">
          <div className="mv-content">
            <div className="mv-item">
              <div className="mv-icon">
                <Target size={32} />
              </div>
              <h2>{t('about.mission')}</h2>
              <p>{t('about.missionText')}</p>
            </div>
            <div className="mv-divider"></div>
            <div className="mv-item">
              <div className="mv-icon">
                <Eye size={32} />
              </div>
              <h2>{t('about.vision')}</h2>
              <p>{t('about.visionText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section className="about-section about-author">
        <div className="container">
          <div className="about-section-header">
            <h2>{t('about.author.title')}</h2>
            <p>{t('about.author.subtitle')}</p>
          </div>
          
          <div className="author-card">
            <div className="author-header">
              <div className="author-avatar">NI</div>
              <div className="author-info">
                <h3>Naeem Ishaq</h3>
                <p className="author-title">{t('about.author.position')}</p>
                <p className="author-location">Islamabad, Pakistan</p>
              </div>
            </div>
            
            <div className="author-body">
              <p>{t('about.author.bio')}</p>
              
              <div className="author-links">
                <a href="https://www.linkedin.com/in/naeem" target="_blank" rel="noopener noreferrer" className="author-link">
                  LinkedIn <ExternalLink size={14} />
                </a>
                <a href="https://www.tutortutees.com" target="_blank" rel="noopener noreferrer" className="author-link">
                  TutorTutees <ExternalLink size={14} />
                </a>
                <a href="https://www.wanscribe.com" target="_blank" rel="noopener noreferrer" className="author-link">
                  Wanscribe <ExternalLink size={14} />
                </a>
              </div>
            </div>
            
            <div className="author-compact-details">
              <div className="compact-column">
                <h4><Briefcase size={16} /> {t('about.experience')}</h4>
                <div className="compact-list">
                  <span><strong>OGDCL</strong> - DPO (IT)</span>
                  <span><strong>SCO</strong> - IT Prof.</span>
                  <span><strong>Motorway Police</strong> - EDPO</span>
                </div>
              </div>
              
              <div className="compact-divider"></div>
              
              <div className="compact-column">
                <h4><GraduationCap size={16} /> {t('about.education')}</h4>
                <div className="compact-list">
                  <span><strong>Web Dev</strong> - Cert.</span>
                  <span><strong>HR</strong> - NUST</span>
                  <span><strong>MBA IT</strong> - AIOU</span>
                </div>
              </div>
            </div>
            
            <div className="author-skills">
              <h4>{t('about.topSkills')}</h4>
              <div className="skills-flex">
                <span className="skill-badge">PHP</span>
                <span className="skill-badge">MySQL</span>
                <span className="skill-badge">Oracle</span>
                <span className="skill-badge">Web Dev</span>
                <span className="skill-badge">HR</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-section about-cta">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2>{t('about.cta.title')}</h2>
              <p>{t('about.cta.subtitle')}</p>
              <div className="cta-actions">
                <Link to="/register" className="btn btn-primary btn-lg">
                  {t('about.cta.register')}
                  <ArrowRight size={18} />
                </Link>
                <Link to="/skills" className="btn btn-outline btn-lg">
                  {t('about.cta.explore')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
