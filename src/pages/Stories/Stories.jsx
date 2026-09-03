import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Award, Clock, User, ArrowRight, Sparkles, BookOpen, Star } from 'lucide-react';
import './Stories.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Stories() {
  const { t } = useTranslation();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedStories();
  }, []);

  const fetchApprovedStories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/public/approved`);
      const data = await res.json();
      if (data.success) {
        const approvedStories = data.users.filter(
          user => user.successStoryStatus === 'approved' && user.successStory
        );
        setStories(approvedStories);
      }
    } catch (err) {
      console.error('Failed to fetch stories:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stories-page">
      <div className="stories-hero">
        <div className="container">
          <h1>
            <Award className="hero-icon" size={48} />
            <span>Success Stories</span>
          </h1>
          <p>Inspiring journeys from our community members who share their skills and knowledge</p>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading stories...</p>
        </div>
      ) : stories.length === 0 ? (
        <div className="empty-state">
          <BookOpen size={64} />
          <h2>No success stories yet</h2>
          <p>Be the first to share your journey with our community!</p>
          <Link to="/register" className="btn btn-primary">
            Share Your Story
          </Link>
        </div>
      ) : (
        <div className="stories-grid">
          {stories.map(story => (
            <div key={story._id} className="story-card">
              <div className="story-card-header">
                <div className="story-avatar">
                  {story.nickname.charAt(0).toUpperCase()}
                </div>
                <div className="story-meta">
                  <h3>{story.nickname}</h3>
                  <span className="story-date">
                    <Clock size={14} />
                    {new Date(story.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
              
              <div className="story-content">
                <p>"{story.successStory}"</p>
              </div>

              {story.skillsOffered && story.skillsOffered.length > 0 && (
                <div className="story-skills">
                  <span className="skills-label">
                    <Star size={14} /> Skills Shared
                  </span>
                  <div className="skill-tags">
                    {story.skillsOffered.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Stories;