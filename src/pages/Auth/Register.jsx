import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, User, CheckCircle, AlertCircle, BookOpen, ArrowRight, ArrowLeft, X, Sparkles, Users } from 'lucide-react';
import './Auth.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SKILL_CATEGORIES = [
  { id: 'programming', name: '💻 Programming', skills: ['JavaScript', 'React', 'Node.js', 'Python', 'HTML/CSS', 'Java'] },
  { id: 'design', name: '🎨 Design', skills: ['UI/UX', 'Graphic Design', 'Logo Design', 'Illustration'] },
  { id: 'marketing', name: '📈 Marketing', skills: ['Digital Marketing', 'SEO', 'Content Writing', 'Social Media'] },
  { id: 'business', name: '💼 Business', skills: ['Accounting', 'Project Management', 'Data Analysis'] },
  { id: 'languages', name: '🌍 Languages', skills: ['English', 'Urdu', 'Arabic', 'Spanish'] }
];

function Register() {
  const { t } = useTranslation();
  
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [offeredSkills, setOfferedSkills] = useState([]);
  const [wantedSkills, setWantedSkills] = useState([]);
  const [successStory, setSuccessStory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userStatus, setUserStatus] = useState(null);
  const [checkEmail, setCheckEmail] = useState('');
  const [checkingStatus, setCheckingStatus] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('registrationEmail');
    if (savedEmail) {
      setCheckEmail(savedEmail);
      checkStatus(savedEmail);
    }
  }, []);

  const checkStatus = async (emailToCheck) => {
    setCheckingStatus(true);
    try {
      const res = await fetch(`${API_URL}/auth/status/${encodeURIComponent(emailToCheck)}`);
      const data = await res.json();
      if (data.success) {
        setUserStatus(data.status);
      }
    } catch (err) {
      console.error('Status check error:', err);
    }
    setCheckingStatus(false);
  };

  const handleCheckStatus = (e) => {
    e.preventDefault();
    if (checkEmail) {
      localStorage.setItem('registrationEmail', checkEmail);
      checkStatus(checkEmail);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nickname, 
          email,
          skillsOffered: offeredSkills,
          skillsWanted: wantedSkills,
          successStory: successStory.trim()
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('registrationEmail', email);
      setCheckEmail(email);
      setUserStatus('pending');
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
        prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
      );
    } else {
      setWantedSkills(prev => 
        prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
      );
    }
  };

  const nextStep = () => {
    if (step === 1 && (!nickname.trim() || !email.trim())) {
      setError('Please fill in your nickname and email');
      return;
    }
    if (step === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return;
      }
    }
    setError('');
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  if (success || userStatus) {
    return (
      <div className="register-page">
        <div className="register-container">
          {userStatus === 'pending' && (
            <>
              <div className="register-header">
                <div className="header-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                  <AlertCircle size={36} />
                </div>
                <h1>Pending Approval</h1>
                <p>Your registration is under review</p>
              </div>
              
              <div className="info-note">
                Your account is waiting for admin approval. You'll be able to share your skills and view other members once approved.
              </div>
              
              <div className="status-check-form">
                <form onSubmit={handleCheckStatus} className="register-form">
                  <div className="form-group">
                    <label>Check Your Status</label>
                    <div className="input-group">
                      <Mail size={18} className="input-icon" />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={checkEmail}
                        onChange={(e) => setCheckEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={checkingStatus}>
                    {checkingStatus ? 'Checking...' : 'Check Status'}
                  </button>
                </form>
              </div>
              
              <div className="register-footer">
                <Link to="/">Back to Home</Link>
              </div>
            </>
          )}

          {userStatus === 'approved' && (
            <>
              <div className="register-header">
                <div className="header-icon" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                  <CheckCircle size={36} />
                </div>
                <h1>Welcome! 🎉</h1>
                <p>Your account has been approved</p>
              </div>
              
              <div className="success-details">
                <div className="detail-item">
                  <span className="label">Email</span>
                  <span className="value">{checkEmail}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Skills Offered</span>
                  <span className="value">{offeredSkills.length > 0 ? offeredSkills.join(', ') : 'None'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Skills Wanted</span>
                  <span className="value">{wantedSkills.length > 0 ? wantedSkills.join(', ') : 'None'}</span>
                </div>
              </div>
              
              <Link to="/" className="btn btn-primary btn-lg btn-block">Explore Community</Link>
              
              <div className="register-footer">
                <Link to="/skills">View Skill Matches</Link>
              </div>
            </>
          )}

          {userStatus === 'rejected' && (
            <>
              <div className="register-header">
                <div className="header-icon" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                  <X size={36} />
                </div>
                <h1>Registration Not Approved</h1>
                <p>Your registration was not approved this time</p>
              </div>
              
              <div className="info-note">
                Don't worry! You can still explore the website and view skills and stories from our community. 
                To become a member and share your own skills, please register again with different details.
              </div>
              
              <div className="rejected-actions">
                <Link to="/" className="btn btn-secondary btn-lg">
                  Explore Website
                </Link>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => {
                    setUserStatus(null);
                    setSuccess(false);
                    setNickname('');
                    setEmail('');
                    setOfferedSkills([]);
                    setWantedSkills([]);
                    setSuccessStory('');
                    localStorage.removeItem('registrationEmail');
                  }}
                >
                  Register Again
                </button>
              </div>
              
              <div className="explore-links">
                <p>Or explore our community:</p>
                <div className="link-buttons">
                  <Link to="/skills" className="explore-link">
                    <Users size={16} /> View Skills
                  </Link>
                  <Link to="/stories" className="explore-link">
                    <BookOpen size={16} /> Success Stories
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <div className="header-icon">
            <Sparkles size={36} />
          </div>
          <h1>Join Our Community</h1>
          <p>Share your skills and learn from others</p>
        </div>

        <div className="progress-steps">
          <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-circle">{step > 1 ? <CheckCircle size={18} /> : '1'}</div>
            <span>Basic Info</span>
          </div>
          <div className="step-line"></div>
          <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="step-circle">{step > 2 ? <CheckCircle size={18} /> : '2'}</div>
            <span>Skills</span>
          </div>
          <div className="step-line"></div>
          <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
            <div className="step-circle">3</div>
            <span>Your Story</span>
          </div>
        </div>

        {error && (
          <div className="error-alert">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="register-form">
          {step === 1 && (
            <div className="form-step">
              <div className="step-title">
                <h2>Let's Get Started</h2>
                <p>Create your profile with a unique nickname</p>
              </div>
              
              <div className="form-group">
                <label>Nickname</label>
                <div className="input-group">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    placeholder="Choose a unique nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    minLength={3}
                    maxLength={30}
                  />
                </div>
                <span className="field-hint">This will be displayed publicly</span>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-group">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <span className="field-hint">We'll use this to check your registration status</span>
              </div>

              <button type="button" className="btn btn-primary btn-lg btn-block" onClick={nextStep}>
                Continue <ArrowRight size={18} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <div className="step-title">
                <h2>What Can You Share?</h2>
                <p>Select skills you can teach and want to learn</p>
              </div>
              
              <div className="skills-section">
                <div className="skills-offered">
                  <h3><Users size={16} /> Skills You Can Offer</h3>
                  <p className="skills-desc">What can you teach others?</p>
                  
                  {SKILL_CATEGORIES.map(category => (
                    <div key={category.id} className="skill-category">
                      <h4>{category.name}</h4>
                      <div className="skill-tags">
                        {category.skills.map(skill => (
                          <button
                            key={skill}
                            type="button"
                            className={`skill-tag offered ${offeredSkills.includes(skill) ? 'selected' : ''}`}
                            onClick={() => toggleSkill(skill, 'offered')}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="skills-wanted">
                  <h3><Sparkles size={16} /> Skills You Want to Learn</h3>
                  <p className="skills-desc">What do you want to learn?</p>
                  
                  {SKILL_CATEGORIES.map(category => (
                    <div key={category.id} className="skill-category">
                      <h4>{category.name}</h4>
                      <div className="skill-tags">
                        {category.skills.map(skill => (
                          <button
                            key={skill}
                            type="button"
                            className={`skill-tag wanted ${wantedSkills.includes(skill) ? 'selected' : ''}`}
                            onClick={() => toggleSkill(skill, 'wanted')}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="btn-group">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                  <ArrowLeft size={18} /> Back
                </button>
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <div className="step-title">
                <h2>Share Your Journey</h2>
                <p>Tell us about your success story (optional)</p>
              </div>
              
              <div className="story-section">
                <div className="form-group">
                  <label>Your Success Story</label>
                  <textarea
                    placeholder="Share how you learned your skills, your achievements, or your journey..."
                    value={successStory}
                    onChange={(e) => setSuccessStory(e.target.value)}
                    maxLength={1000}
                  />
                  <div className="char-info">
                    <span className={`char-count ${successStory.length > 900 ? 'warning' : ''}`}>
                      {successStory.length}/1000
                    </span>
                  </div>
                </div>
              </div>

              <div className="summary-section">
                <h3>Registration Summary</h3>
                <div className="success-details">
                  <div className="detail-item">
                    <span className="label">Nickname</span>
                    <span className="value">{nickname}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Email</span>
                    <span className="value">{email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Skills Offered</span>
                    <span className="value">{offeredSkills.length > 0 ? offeredSkills.join(', ') : 'None'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Skills Wanted</span>
                    <span className="value">{wantedSkills.length > 0 ? wantedSkills.join(', ') : 'None'}</span>
                  </div>
                </div>
              </div>

              <div className="btn-group">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                  <ArrowLeft size={18} /> Back
                </button>
                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Registration'}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="register-footer">
          <p>Already registered? <a href="#" onClick={(e) => {e.preventDefault(); checkStatus(checkEmail || email);}}>Check Status</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;