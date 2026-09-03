import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, 
  Users, 
  Award, 
  BookOpen, 
  Shield, 
  Zap,
  ArrowRight,
  ChevronRight,
  Star,
  Clock,
  TrendingUp,
  Target,
  Rocket,
  Heart
} from 'lucide-react';
import './Home.css';

const FEATURES = [
  {
    id: 'skillMatching',
    icon: Sparkles,
    titleKey: 'home.features.skillMatching.title',
    descKey: 'home.features.skillMatching.desc'
  },
  {
    id: 'anonymous',
    icon: Users,
    titleKey: 'home.features.anonymous.title',
    descKey: 'home.features.anonymous.desc'
  },
  {
    id: 'successStories',
    icon: Award,
    titleKey: 'home.features.successStories.title',
    descKey: 'home.features.successStories.desc'
  },
  {
    id: 'blog',
    icon: BookOpen,
    titleKey: 'home.features.blog.title',
    descKey: 'home.features.blog.desc'
  },
  {
    id: 'moderation',
    icon: Shield,
    titleKey: 'home.features.moderation.title',
    descKey: 'home.features.moderation.desc'
  },
  {
    id: 'fast',
    icon: Zap,
    titleKey: 'home.features.fast.title',
    descKey: 'home.features.fast.desc'
  }
];

const MOCK_STORIES = [
  {
    id: '1',
    nickname: 'CodeNinja',
    story: 'Started learning React 6 months ago. Now I have built 3 production apps and got hired as a junior developer!',
    skills: ['React', 'JavaScript']
  },
  {
    id: '2',
    nickname: 'DesignPro',
    story: 'Transitioned from graphic design to UI/UX. The skill matching helped me find a mentor who guided me through the journey.',
    skills: ['UI/UX Design', 'Figma']
  },
  {
    id: '3',
    nickname: 'PythonMaster',
    story: 'Used the platform to connect with other Python enthusiasts. We now run a weekly coding meetup in our city.',
    skills: ['Python', 'Data Analysis']
  }
];

const STEPS = [
  { icon: Target, title: 'Create Profile', desc: 'List your skills and what you want to learn' },
  { icon: Rocket, title: 'Find Matches', desc: 'Get matched with compatible learners' },
  { icon: Heart, title: 'Learn Together', desc: 'Collaborate and grow your skills' }
];

const MOCK_ARTICLES = [
  {
    id: '1',
    title: 'Getting Started with Web Development in 2024',
    excerpt: 'A comprehensive guide for beginners looking to start their journey in web development...',
    author: 'Naeem Ishaq',
    readTime: 12,
    category: 'Guide'
  },
  {
    id: '2',
    title: 'How Skill Matching Transformed My Career',
    excerpt: 'Real stories from our community members about how they found their perfect skill partners...',
    author: 'Community',
    readTime: 8,
    category: 'Success Stories'
  },
  {
    id: '3',
    title: 'Building Your Personal Brand as a Developer',
    excerpt: 'Tips and strategies to build a strong personal brand in the tech industry...',
    author: 'Sarah Khan',
    readTime: 10,
    category: 'Career'
  }
];

function Home() {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const particles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        delay: `${i * 0.5}s`,
        x: `${Math.random() * 100}%`
      })),
    []
  );

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      window.requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        setMousePos({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`home-page ${isLoaded ? 'loaded' : ''}`}>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg" style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}>
          <div className="hero-gradient"></div>
          <div className="hero-grid"></div>
          <div className="hero-glow hero-glow-1"></div>
          <div className="hero-glow hero-glow-2"></div>
          <div className="hero-particles">
            {particles.map((particle) => (
              <div key={particle.id} className="particle" style={{ '--delay': particle.delay, '--x': particle.x }}></div>
            ))}
          </div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge animate-fade-in-up">
            <Star size={14} className="badge-icon" />
            <span>Trusted by 500+ Professionals</span>
          </div>
          
          <h1 className="hero-title animate-fade-in-up stagger-1">
            {t('home.heroTitle')}
            <span className="hero-title-accent"> {t('home.heroTitleAccent')}</span>
          </h1>
          
          <p className="hero-subtitle animate-fade-in-up stagger-2">
            {t('home.heroSubtitle')}
          </p>
          
          <div className="hero-actions animate-fade-in-up stagger-3">
            <Link to="/register" className="btn btn-primary btn-lg btn-glow">
              {t('home.getStarted')}
              <ArrowRight size={20} />
            </Link>
            <Link to="/skills" className="btn btn-outline btn-lg">
              {t('home.exploreSkills')}
              <ChevronRight size={18} />
            </Link>
          </div>
          
          <div className="hero-stats animate-fade-in-up stagger-4">
            <div className="stat">
              <span className="stat-value">500+</span>
              <span className="stat-label">{t('home.stats.users')}</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">100+</span>
              <span className="stat-label">{t('home.stats.skills')}</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">50+</span>
              <span className="stat-label">{t('home.stats.stories')}</span>
            </div>
          </div>
        </div>

        <div className="scroll-indicator animate-bounce">
          <ChevronRight size={24} />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">{t('home.features.title')}</h2>
            <p className="section-subtitle">{t('home.features.subtitle')}</p>
          </div>
          
          <div className="features-grid">
            {FEATURES.map((feature, index) => (
              <div 
                key={feature.id} 
                className="feature-card reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon">
                  <feature.icon size={24} />
                </div>
                <h3>{t(feature.titleKey)}</h3>
                <p>{t(feature.descKey)}</p>
                <div className="feature-card-shine"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">How It Works</span>
            <h2 className="section-title">{t('home.howItWorks.title')}</h2>
            <p className="section-subtitle">{t('home.howItWorks.subtitle')}</p>
          </div>
          
          <div className="steps-container">
            {STEPS.map((step, index) => (
              <div key={index} className="step reveal" style={{ animationDelay: `${index * 0.15}s` }}>
                <span className="step-number">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="stories-preview">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Success Stories</span>
            <h2 className="section-title">{t('home.successStories.title')}</h2>
            <p className="section-subtitle">{t('home.successStories.subtitle')}</p>
          </div>
          
          <div className="stories-grid">
            {MOCK_STORIES.map((story, index) => (
              <div key={story.id} className="story-card reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="story-avatar">
                  {story.nickname.charAt(0)}
                </div>
                <div className="story-content">
                  <p className="story-text">"{story.story}"</p>
                  <div className="story-skills">
                    {story.skills.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  <span className="story-author">@{story.nickname}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="section-cta">
            <Link to="/stories" className="btn btn-outline">
              {t('home.viewAllStories')}
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Articles Preview */}
      <section className="articles-preview">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Latest Articles</span>
            <h2 className="section-title">{t('home.articles.title')}</h2>
            <p className="section-subtitle">{t('home.articles.subtitle')}</p>
          </div>
          
          <div className="articles-grid">
            {MOCK_ARTICLES.map((article, index) => (
              <Link key={article.id} to={`/articles/${article.id}`} className="article-card reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="article-category">{article.category}</div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <div className="article-meta">
                  <span className="author">{article.author}</span>
                  <span className="read-time">
                    <Clock size={14} />
                    {article.readTime} min read
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="section-cta">
            <Link to="/articles" className="btn btn-outline">
              {t('home.articles.viewAll')}
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-shapes">
              <div className="cta-shape cta-shape-1"></div>
              <div className="cta-shape cta-shape-2"></div>
              <div className="cta-shape cta-shape-3"></div>
            </div>
            <div className="cta-content">
              <span className="cta-badge">Get Started</span>
              <h2>{t('home.cta.title')}</h2>
              <p>{t('home.cta.subtitle')}</p>
              <Link to="/register" className="btn btn-primary btn-lg btn-glow">
                {t('home.cta.button')}
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="cta-visual">
              <TrendingUp size={100} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;