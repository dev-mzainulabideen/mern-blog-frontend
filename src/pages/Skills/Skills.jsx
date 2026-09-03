import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, UserPlus, ArrowRight, Sparkles, Award } from 'lucide-react';
import './Skills.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CATEGORIES = [
  { id: 'programming', name: 'Programming', icon: '💻', skills: ['JavaScript', 'React', 'Node.js', 'Python', 'HTML/CSS', 'Java'] },
  { id: 'design', name: 'Design', icon: '🎨', skills: ['UI/UX', 'Graphic Design', 'Logo Design', 'Illustration'] },
  { id: 'marketing', name: 'Marketing', icon: '📈', skills: ['Digital Marketing', 'SEO', 'Content Writing', 'Social Media'] },
  { id: 'business', name: 'Business', icon: '💼', skills: ['Accounting', 'Project Management', 'Data Analysis'] },
  { id: 'languages', name: 'Languages', icon: '🌍', skills: ['English', 'Urdu', 'Arabic', 'Spanish'] }
];

function Skills() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchApprovedUsers();
  }, []);

  const fetchApprovedUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/public/approved`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterSkillsByCategory = (skills) => {
    if (!selectedCategory) return skills;
    const category = CATEGORIES.find(c => c.id === selectedCategory);
    if (!category) return skills;
    return skills.filter(skill => category.skills.includes(skill));
  };

  if (loading) {
    return (
      <div className="skills-page">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="skills-page">
      <div className="skills-hero">
        <div className="container">
          <h1>
            <Users size={48} className="hero-icon" />
            Skill <span>Match</span> Community
          </h1>
          <p>Connect with talented people who want to learn and share skills. Join our growing community of skill exchangers.</p>
        </div>
      </div>

      <div className="skills-categories">
        <button 
          className={`category-btn ${!selectedCategory ? 'active' : ''}`}
          onClick={() => setSelectedCategory('')}
        >
          All Skills
        </button>
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <span>{cat.icon}</span> {cat.name}
          </button>
        ))}
      </div>

      {users.length === 0 ? (
        <div className="no-skills">
          <Users size={64} />
          <h2>No skills available yet</h2>
          <p>Be the first to share your skills! Register to get started.</p>
          <Link to="/register" className="btn btn-primary">
            <UserPlus size={18} /> Join Community
          </Link>
        </div>
      ) : (
        <div className="skills-grid">
          {users.map(user => {
            const offeredSkills = filterSkillsByCategory(user.skillsOffered || []);
            const wantedSkills = filterSkillsByCategory(user.skillsWanted || []);
            
            if (selectedCategory && offeredSkills.length === 0 && wantedSkills.length === 0) {
              return null;
            }

            return (
              <div key={user._id} className="skill-card">
                <div className="skill-card-header">
                  <div className="user-avatar">
                    {user.nickname.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info">
                    <h3>{user.nickname}</h3>
                    {user.successStoryStatus === 'approved' && user.successStory && (
                      <span className="success-badge">
                        <Sparkles size={12} /> Success Story
                      </span>
                    )}
                  </div>
                </div>

                {offeredSkills.length > 0 && (
                  <div className="skill-section">
                    <h4>Can Teach:</h4>
                    <div className="skill-tags">
                      {offeredSkills.slice(0, 6).map(skill => (
                        <span key={skill} className="skill-tag offered">{skill}</span>
                      ))}
                      {offeredSkills.length > 6 && (
                        <span className="skill-tag offered">+{offeredSkills.length - 6}</span>
                      )}
                    </div>
                  </div>
                )}

                {wantedSkills.length > 0 && (
                  <div className="skill-section">
                    <h4>Wants to Learn:</h4>
                    <div className="skill-tags">
                      {wantedSkills.slice(0, 6).map(skill => (
                        <span key={skill} className="skill-tag wanted">{skill}</span>
                      ))}
                      {wantedSkills.length > 6 && (
                        <span className="skill-tag wanted">+{wantedSkills.length - 6}</span>
                      )}
                    </div>
                  </div>
                )}

                {user.successStoryStatus === 'approved' && user.successStory && (
                  <div className="story-preview">
                    <h4>Success Story</h4>
                    <p>{user.successStory.substring(0, 120)}{user.successStory.length > 120 ? '...' : ''}</p>
                  </div>
                )}

                <Link to={`/skills/matches?user=${user._id}`} className="view-profile-btn">
                  View Profile <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      )}

      <div className="skills-cta">
        <h2>Ready to Join?</h2>
        <p>Create your profile and start sharing your skills today</p>
        <Link to="/register" className="btn btn-primary">
          <UserPlus size={18} /> Register Now
        </Link>
      </div>
    </div>
  );
}

export default Skills;