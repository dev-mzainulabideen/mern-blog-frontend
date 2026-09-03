import { Link } from 'react-router-dom';
import { Calendar, LogOut, ShieldCheck, UserCheck, UserRound } from 'lucide-react';

function ProfileHeaderCard({ user, joinedDate, onLogout, t }) {
  const tx = (key, fallback) => {
    const value = t(key);
    return value === key ? fallback : value;
  };

  const roleLabel = user.role === 'admin'
    ? tx('profile.admin', 'Admin')
    : user.isApproved
      ? tx('profile.approved', 'Approved')
      : tx('profile.pending', 'Pending');

  const roleClass = user.role === 'admin'
    ? 'is-admin'
    : user.isApproved
      ? 'is-approved'
      : 'is-pending';

  return (
    <section className="profile-hero-card">
      <div className="profile-hero-main">
        <div className="profile-avatar">{user.nickname?.charAt(0).toUpperCase()}</div>
        <div className="profile-identity">
          <h1>{user.nickname}</h1>
          <p>{user.email}</p>
          <div className={`profile-role-badge ${roleClass}`}>
            {user.role === 'admin' ? <ShieldCheck size={14} /> : <UserCheck size={14} />}
            <span>{roleLabel}</span>
          </div>
        </div>
      </div>

      <div className="profile-hero-meta">
        <div className="profile-meta-item">
          <Calendar size={16} />
          <span>{joinedDate}</span>
        </div>
        <div className="profile-meta-item">
          <UserRound size={16} />
          <span>{user.role === 'admin' ? 'Administrator account' : 'Community member'}</span>
        </div>
      </div>

      <div className="profile-hero-actions">
        {user.role === 'admin' && (
          <Link to="/admin" className="btn btn-outline">Open Admin Panel</Link>
        )}
        <button className="btn btn-secondary" onClick={onLogout}>
          <LogOut size={16} />
          {tx('profile.logout', 'Logout')}
        </button>
      </div>
    </section>
  );
}

export default ProfileHeaderCard;
