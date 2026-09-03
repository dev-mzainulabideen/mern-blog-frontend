import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  Clock, 
  User, 
  ArrowRight, 
  Zap,
  Calendar,
  MessageCircle
} from 'lucide-react';
import './Posts.css';

const MOCK_POSTS = [
  {
    id: '1',
    title: 'New Feature Released: Skill Matching 2.0',
    excerpt: 'We are excited to announce our latest feature that will make your skill matching experience even better with improved algorithms.',
    author: 'Admin',
    date: '2024-01-20',
    readTime: 3,
    comments: 12,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Community Update: 500 Members and Growing!',
    excerpt: 'Our community is growing faster than ever. Here\'s what\'s happening and how you can get more involved.',
    author: 'Mod',
    date: '2024-01-18',
    readTime: 4,
    comments: 8,
    isFeatured: true
  },
  {
    id: '3',
    title: '10 Tips for Writing Better Code',
    excerpt: 'Writing clean code is essential for maintainability. Here are some tips to improve your coding habits today.',
    author: 'DevGuru',
    date: '2024-01-15',
    readTime: 6,
    comments: 24
  },
  {
    id: '4',
    title: 'Weekend Challenge: Build a Portfolio Site',
    excerpt: 'Join our weekend coding challenge and test your skills by building a portfolio website from scratch.',
    author: 'CodeMaster',
    date: '2024-01-12',
    readTime: 3,
    comments: 15
  },
  {
    id: '5',
    title: 'New Learning Resources Added',
    excerpt: 'Check out our latest tutorials and guides to help you learn faster and more effectively.',
    author: 'WebWiz',
    date: '2024-01-10',
    readTime: 4,
    comments: 6
  },
  {
    id: '6',
    title: 'Community Spotlight: Top Contributors',
    excerpt: 'Highlighting our top contributors this month who have been helping others learn and grow.',
    author: 'Admin',
    date: '2024-01-08',
    readTime: 5,
    comments: 18
  },
  {
    id: '7',
    title: 'How I Landed My First Remote Job',
    excerpt: 'A community member shares their journey of finding a remote developer position through our platform.',
    author: 'CareerGrowth',
    date: '2024-01-05',
    readTime: 7,
    comments: 32
  },
  {
    id: '8',
    title: 'Quick Tip: Using Git Effectively',
    excerpt: 'Master these Git commands to streamline your workflow and collaborate better with team members.',
    author: 'GitMaster',
    date: '2024-01-02',
    readTime: 4,
    comments: 11
  }
];

function Posts() {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState('latest');

  const featuredPosts = MOCK_POSTS.filter(p => p.isFeatured);
  
  const sortedPosts = [...MOCK_POSTS].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.date) - new Date(a.date);
    }
    return b.comments - a.comments;
  });

  return (
    <div className="posts-page">
      {/* Hero Section */}
      <section className="posts-hero">
        <div className="posts-hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-grid"></div>
        </div>
        
        <div className="container hero-content">
          <div className="hero-text">
            <h1>{t('posts.heroTitle')}</h1>
            <p>{t('posts.heroSubtitle')}</p>
          </div>
        </div>
      </section>

      <div className="container posts-content">
        {/* Sort Controls */}
        <div className="posts-controls">
          <span className="posts-count">{MOCK_POSTS.length} {t('posts.posts')}</span>
          <div className="sort-options">
            <button 
              className={`sort-btn ${sortBy === 'latest' ? 'active' : ''}`}
              onClick={() => setSortBy('latest')}
            >
              <Calendar size={14} />
              {t('posts.latest')}
            </button>
            <button 
              className={`sort-btn ${sortBy === 'popular' ? 'active' : ''}`}
              onClick={() => setSortBy('popular')}
            >
              <Zap size={14} />
              {t('posts.popular')}
            </button>
          </div>
        </div>

        {/* Featured Posts */}
        {sortBy === 'latest' && featuredPosts.length > 0 && (
          <section className="featured-posts">
            <h2 className="section-title">
              <Zap size={18} />
              {t('posts.featured')}
            </h2>
            <div className="featured-grid">
              {featuredPosts.map(post => (
                <Link key={post.id} to={`/posts/${post.id}`} className="featured-post-card">
                  <div className="post-content">
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="post-meta">
                      <span><User size={14} /> {post.author}</span>
                      <span><Clock size={14} /> {post.readTime} {t('posts.readTime')}</span>
                      <span><MessageCircle size={14} /> {post.comments}</span>
                    </div>
                  </div>
                  <div className="post-arrow">
                    <ArrowRight size={18} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="all-posts">
          <h2 className="section-title">
            <FileText size={18} />
            {sortBy === 'popular' ? t('posts.popular') : t('posts.allPosts')}
          </h2>
          
          <div className="posts-grid">
            {sortedPosts.map(post => (
              <Link key={post.id} to={`/posts/${post.id}`} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="card-footer">
                  <div className="post-meta">
                    <span><User size={13} /> {post.author}</span>
                    <span><Clock size={13} /> {post.readTime} {t('posts.readTime')}</span>
                  </div>
                  <span className="read-more">
                    {t('posts.readMore')} <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Posts;
