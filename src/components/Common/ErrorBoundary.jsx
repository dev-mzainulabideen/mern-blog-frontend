import { Component } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-icon">
            <AlertTriangle size={36} />
          </div>
          <h2>Something went wrong</h2>
          <p>
            An unexpected error occurred. Please try refreshing the page or click below to go back to the dashboard.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn" onClick={this.handleReset}>
              <ArrowLeft size={18} />
              Try Again
            </button>
            <Link to="/" className="btn" style={{ background: 'var(--admin-primary)' }}>
              <Home size={18} />
              Go to Dashboard
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;