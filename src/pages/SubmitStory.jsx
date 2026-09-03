import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { Mail, User, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';
import './Auth.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function SubmitStory() {
  const { t } = useTranslation();
  const { checkStatus } = useAuth();
  
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [story, setStory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: email,
          nickname,
          type: 'success_story',
          content: story
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.message || 'Submission failed');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      
    } catch (err) {
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'nickname':
        if (!value.trim()) return 'Nickname is required';
        if (value.length < 3) return 'Nickname must be at least 3 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';
      case 'story':
        if (!value.trim()) return 'Story is required';
        if (value.length < 10) return 'Story must be at least 10 characters';
        if (value.length > 5000) return 'Story cannot exceed 5000 characters';
        return '';
      default:
        return '';
    }
  };

  const nicknameError = nickname ? validateField('nickname', nickname) : '';
  const emailError = email ? validateField('email', email) : '';
  const storyError = story ? validateField('story', story) : '';

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-container success-container">
          <div className="success-icon">
            <CheckCircle size={64} />
          </div>
          <h1>Story Submitted!</h1>
          <p>Your success story has been submitted for review.</p>
          <p className="success-note">
            <strong>Nickname:</strong> {nickname}
          </p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>
            <BookOpen size={32} />
            Submit Your Success Story
          </h1>
          <p>Share your journey with our community</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="nickname">Nickname</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Your display name"
                className={nicknameError ? 'error' : ''}
              />
            </div>
            {nicknameError && <span className="field-error">{nicknameError}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email (must be registered)</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={emailError ? 'error' : ''}
              />
            </div>
            {emailError && <span className="field-error">{emailError}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="story">Your Success Story</label>
            <textarea
              id="story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Share your success story..."
              rows={8}
              className={storyError ? 'error' : ''}
            />
            {storyError && <span className="field-error">{storyError}</span>}
            <span className="char-count">{story.length}/5000</span>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading || !nickname || !email || !story || !!nicknameError || !!emailError || !!storyError}
          >
            {loading ? <span className="loading-spinner"></span> : 'Submit Story'}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/register">Register to join</Link>
        </div>
      </div>
    </div>
  );
}

export default SubmitStory;