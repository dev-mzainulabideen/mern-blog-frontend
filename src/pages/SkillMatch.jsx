import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { Mail, User, Users, CheckCircle, AlertCircle } from 'lucide-react';
import './Auth.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SKILL_CATEGORIES = [
  { id: 'programming', name: 'Programming', skills: ['JavaScript', 'React', 'Node.js', 'Python', 'HTML/CSS', 'Java', 'C++'] },
  { id: 'design', name: 'Design', skills: ['UI/UX', 'Graphic Design', 'Logo Design', 'Illustration'] },
  { id: 'marketing', name: 'Marketing', skills: ['Digital Marketing', 'SEO', 'Content Writing', 'Social Media'] },
  { id: 'business', name: 'Business', skills: ['Accounting', 'Project Management', 'Data Analysis'] },
  { id: 'languages', name: 'Languages', skills: ['English', 'Urdu', 'Arabic', 'Spanish'] }
];

function SkillMatch() {
  const { t } = useTranslation();
  const { checkStatus } = useAuth();
  
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [offeredSkills, setOfferedSkills] = useState([]);
  const [wantedSkills, setWantedSkills] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const skills = offeredSkills.length > 0 ? offeredSkills.join(', ') : '';

    try {
      const res = await fetch(`${API_URL}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: email,
          nickname,
          type: 'skill_match',
          content: additionalInfo,
          skills
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

  const toggleSkill = (skill, type) => {
    if (type === 'offered') {
      setOfferedSkills(prev => 
        prev.includes(skill) 
          ? prev.filter(s => s !== skill)
          : [...prev, skill]
      );
    } else {
      setWantedSkills(prev => 
        prev.includes(skill) 
          ? prev.filter(s => s !== skill)
          : [...prev, skill]
      );
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
      default:
        return '';
    }
  };

  const nicknameError = nickname ? validateField('nickname', nickname) : '';
  const emailError = email ? validateField('email', email) : '';

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-container success-container">
          <div className="success-icon">
            <CheckCircle size={64} />
          </div>
          <h1>Skill Match Submitted!</h1>
          <p>Your skill matching request has been submitted for review.</p>
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
            <Users size={32} />
            Skill Match
          </h1>
          <p>Find others with complementary skills</p>
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
            <label>Skills You Can Offer</label>
            <div className="skills-grid">
              {SKILL_CATEGORIES.map(cat => (
                <div key={cat.id} className="skill-category">
                  <h4>{cat.name}</h4>
                  <div className="skill-tags">
                    {cat.skills.map(skill => (
                      <button
                        key={skill}
                        type="button"
                        className={`skill-tag ${offeredSkills.includes(skill) ? 'selected' : ''}`}
                        onClick={() => toggleSkill(skill, 'offered')}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="additionalInfo">Additional Information</label>
            <textarea
              id="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Tell us more about your skills and what you're looking for..."
              rows={4}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading || !nickname || !email || !!nicknameError || !!emailError}
          >
            {loading ? <span className="loading-spinner"></span> : 'Submit Skill Match'}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/register">Register to join</Link>
        </div>
      </div>
    </div>
  );
}

export default SkillMatch;