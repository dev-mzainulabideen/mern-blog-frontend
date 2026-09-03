import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, ArrowRight } from 'lucide-react';
import './Skills.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function MatchResults() {
  const { t } = useTranslation();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/submissions/public/skill_match`);
      const data = await res.json();
      if (data.success) {
        setMatches(data.submissions);
      }
    } catch (err) {
      console.error('Failed to fetch matches:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="match-results-page container">
      <h1>
        <Users size={32} />
        {t('skills.myMatches') || 'Skill Matches'}
      </h1>
      <p className="subtitle">Community members with complementary skills</p>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading matches...</p>
        </div>
      ) : matches.length === 0 ? (
        <div className="empty-state">
          <Users size={64} />
          <h2>No Matches Yet</h2>
          <p>Be the first to join the skill matching community!</p>
          <Link to="/register" className="btn btn-primary">
            Register Now
          </Link>
        </div>
      ) : (
        <div className="matches-list">
          {matches.map((user, index) => (
            <div key={index} className="match-card">
              <div className="match-header">
                <div className="user-avatar">
                  {user.nickname.charAt(0).toUpperCase()}
                </div>
                <h3>{user.nickname}</h3>
              </div>
              
              {user.skills && (
                <div className="match-skills">
                  <h4>Offers:</h4>
                  <div className="skill-tags">
                    {user.skills.split(', ').map((skill, i) => (
                      <span key={i} className="skill-tag">{skill.trim()}</span>
                    ))}
                  </div>
                </div>
              )}

              <Link to="/contact" className="btn btn-outline">
                Connect <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="cta-section">
        <h2>Want to find matches?</h2>
        <p>Register and share your skills to connect with others.</p>
        <Link to="/register" className="btn btn-primary">
          Register Now
        </Link>
      </div>
    </div>
  );
}

export default MatchResults;