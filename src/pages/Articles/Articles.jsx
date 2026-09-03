import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  BookOpen, 
  Clock, 
  User, 
  ArrowRight, 
  Search,
  Tag,
  TrendingUp,
  Calendar
} from 'lucide-react';
import './Articles.css';

const CATEGORIES = [
  { id: 'all', nameKey: 'articles.categories.all' },
  { id: 'tech', nameKey: 'articles.categories.tech' },
  { id: 'skills', nameKey: 'articles.categories.skills' },
  { id: 'career', nameKey: 'articles.categories.career' },
  { id: 'success', nameKey: 'articles.categories.success' }
];

const MOCK_ARTICLES = [
  {
    id: '1',
    title: 'Getting Started with Web Development in 2024',
    excerpt: 'A comprehensive guide for beginners looking to start their journey in web development. Learn HTML, CSS, and JavaScript fundamentals.',
    author: 'Naeem Ishaq',
    date: '2024-01-15',
    readTime: 12,
    category: 'tech',
    isFeatured: true
  },
  {
    id: '2',
    title: 'How Skill Matching Transformed My Career',
    excerpt: 'Real stories from community members about how they found their perfect skill partners and accelerated their professional growth.',
    author: 'Community',
    date: '2024-01-10',
    readTime: 8,
    category: 'success',
    isFeatured: true
  },
  {
    id: '3',
    title: 'Building Your Personal Brand as a Developer',
    excerpt: 'Tips and strategies to build a strong personal brand in the tech industry and attract opportunities.',
    author: 'Sarah Khan',
    date: '2024-01-05',
    readTime: 10,
    category: 'career'
  },
  {
    id: '4',
    title: 'Understanding React Hooks: A Complete Guide',
    excerpt: 'Master React Hooks with this in-depth tutorial covering useState, useEffect, and custom hooks.',
    author: 'CodeMaster',
    date: '2024-01-01',
    readTime: 15,
    category: 'tech'
  },
  {
    id: '5',
    title: 'CSS Best Practices for Modern Web Design',
    excerpt: 'Learn clean, maintainable CSS architecture including BEM, CSS Variables, and responsive design patterns.',
    author: 'DesignPro',
    date: '2023-12-28',
    readTime: 8,
    category: 'tech'
  },
  {
    id: '6',
    title: 'Node.js Fundamentals Every Developer Should Know',
    excerpt: 'From callbacks to promises and async/await - master server-side JavaScript with practical examples.',
    author: 'BackendDev',
    date: '2023-12-20',
    readTime: 14,
    category: 'tech'
  },
  {
    id: '7',
    title: 'Database Design Principles for Scalable Apps',
    excerpt: 'Understanding how to design efficient and scalable database schemas for your applications.',
    author: 'DataGuru',
    date: '2023-12-15',
    readTime: 11,
    category: 'tech'
  },
  {
    id: '8',
    title: 'Effective Learning Strategies for Developers',
    excerpt: 'How to learn faster and retain more knowledge with proven study techniques and practice methods.',
    author: 'LearningExpert',
    date: '2023-12-10',
    readTime: 7,
    category: 'skills'
  },
  {
    id: '9',
    title: 'From Junior to Senior: The Career Growth Guide',
    excerpt: 'A roadmap for developers looking to advance their careers and take on more responsibilities.',
    author: 'CareerCoach',
    date: '2023-12-05',
    readTime: 12,
    category: 'career'
  }
];

const POPULAR_TAGS = [
  'JavaScript', 'React', 'Node.js', 'CSS', 'Web Development', 
  'Career', 'Learning', 'Design', 'Database', 'Python'
];

function Articles() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredArticles = MOCK_ARTICLES.filter(a => a.isFeatured);
  
  const filteredArticles = MOCK_ARTICLES.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const latestArticles = [...MOCK_ARTICLES]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="articles-page">
      {/* Hero Section */}
      <section className="articles-hero">
        <div className="articles-hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-grid"></div>
        </div>
        
        <div className="container hero-content">
          <div className="hero-text">
            <h1>{t('articles.heroTitle')}</h1>
            <p>{t('articles.heroSubtitle')}</p>
          </div>
        </div>
      </section>

      <div className="container articles-content">
        <div className="articles-layout">
          {/* Main Content */}
          <main className="articles-main">
            {/* Search & Filter */}
            <div className="articles-controls">
              <div className="search-box">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder={t('articles.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="category-filters">
                {CATEGORIES.map(category => (
                  <button
                    key={category.id}
                    className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {t(category.nameKey)}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Articles */}
            {activeCategory === 'all' && !searchQuery && featuredArticles.length > 0 && (
              <section className="featured-section">
                <h2 className="section-title">
                  <TrendingUp size={20} />
                  {t('articles.featured')}
                </h2>
                <div className="featured-grid">
                  {featuredArticles.map((article, index) => (
                    <Link 
                      key={article.id} 
                      to={`/articles/${article.id}`}
                      className={`featured-card ${index === 0 ? 'featured-large' : ''}`}
                    >
                      <div className="featured-content">
                        <span className="article-category">{t(`articles.categories.${article.category}`)}</span>
                        <h3>{article.title}</h3>
                        <p>{article.excerpt}</p>
                        <div className="article-meta">
                          <span><User size={14} /> {article.author}</span>
                          <span><Clock size={14} /> {article.readTime} {t('articles.readTime')}</span>
                        </div>
                      </div>
                      <div className="featured-arrow">
                        <ArrowRight size={20} />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* All Articles */}
            <section className="all-articles-section">
              <h2 className="section-title">
                <BookOpen size={20} />
                {activeCategory === 'all' ? t('articles.allArticles') : t(`articles.categories.${activeCategory}`)}
              </h2>
              
              {filteredArticles.length > 0 ? (
                <div className="articles-grid">
                  {filteredArticles.map(article => (
                    <Link key={article.id} to={`/articles/${article.id}`} className="article-card">
                      <div className="card-header">
                        <span className="article-category">{t(`articles.categories.${article.category}`)}</span>
                      </div>
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                      <div className="card-footer">
                        <div className="article-meta">
                          <span><User size={14} /> {article.author}</span>
                          <span><Clock size={14} /> {article.readTime} {t('articles.readTime')}</span>
                        </div>
                        <span className="read-more">
                          {t('articles.readMore')} <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <BookOpen size={48} />
                  <p>{t('articles.noResults')}</p>
                </div>
              )}
            </section>
          </main>

          {/* Sidebar */}
          <aside className="articles-sidebar">
            {/* Latest Posts */}
            <div className="sidebar-widget">
              <h3>{t('articles.latest')}</h3>
              <div className="latest-list">
                {latestArticles.map(article => (
                  <Link key={article.id} to={`/articles/${article.id}`} className="latest-item">
                    <h4>{article.title}</h4>
                    <div className="latest-meta">
                      <span><Clock size={12} /> {article.readTime} min</span>
                      <span><Calendar size={12} /> {new Date(article.date).toLocaleDateString()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="sidebar-widget">
              <h3><Tag size={16} /> {t('articles.popularTags')}</h3>
              <div className="tags-cloud">
                {POPULAR_TAGS.map(tag => (
                  <button key={tag} className="tag-btn">{tag}</button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Articles;
