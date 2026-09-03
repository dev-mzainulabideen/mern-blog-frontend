import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeNames = {
  '/admin': 'Dashboard',
  '/admin/users': 'Users',
  '/admin/posts': 'Posts',
  '/admin/stories': 'Stories',
  '/admin/skills': 'Skills',
  '/admin/consultancy': 'Consultancy',
  '/admin/analytics': 'Analytics',
  '/admin/activity': 'Activity Logs',
  '/admin/settings': 'Settings',
  '/admin/login': 'Admin Login',
  '/register': 'Register',
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0 || (pathnames.length === 1 && pathnames[0] === 'admin')) {
    return null;
  }

  const breadcrumbs = pathnames.map((name, index) => {
    const routePath = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;
    
    // Check if we have a custom name for this route
    let displayName = routeNames[routePath];
    
    // If not found, try to format the name (e.g., "user-profile" -> "User Profile")
    if (!displayName) {
      displayName = name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    return { path: routePath, name: displayName, isLast };
  });

  return (
    <div className="breadcrumbs">
      <div className="breadcrumb-item">
        <Link to="/admin">
          <Home size={14} />
          <span>Home</span>
        </Link>
      </div>
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="breadcrumb-item" style={{ display: 'flex', alignItems: 'center' }}>
          <span className="breadcrumb-separator">
            <ChevronRight size={14} />
          </span>
          {crumb.isLast ? (
            <span className="breadcrumb-item active">{crumb.name}</span>
          ) : (
            <Link to={crumb.path}>{crumb.name}</Link>
          )}
        </div>
      ))}
    </div>
  );
}

export default Breadcrumbs;
