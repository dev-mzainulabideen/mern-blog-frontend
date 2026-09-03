import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackEvent as trackGAEvent } from '../utils/analytics';
import { useAuth } from './AuthContext';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const sessionId = useRef(localStorage.getItem('sessionId') || generateSessionId());
  const sessionStartTime = useRef(Date.now());
  const pageStartTime = useRef(Date.now());
  const [isInitialized, setIsInitialized] = useState(false);

  // Save session ID to localStorage
  useEffect(() => {
    localStorage.setItem('sessionId', sessionId.current);
    setIsInitialized(true);
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (!isInitialized) return;

    trackPageView(location.pathname + location.search);
    trackPageViewEvent(location.pathname, location.search);

    // Reset page timer
    pageStartTime.current = Date.now();
  }, [location.pathname, location.search, isInitialized]);

  // Track authenticated user events
  useEffect(() => {
    if (isAuthenticated && user) {
      trackGAEvent('user_login', {
        userId: user._id,
        userRole: user.role
      });
      sendToBackend('session_start', { userId: user._id });
    }

    // Cleanup on logout
    return () => {
      if (isAuthenticated && user) {
        sendToBackend('session_end', { userId: user._id });
      }
    };
  }, [isAuthenticated, user]);

  const trackPageViewEvent = async (path, search) => {
    const now = Date.now();
    const timeOnPage = pageStartTime.current ? Math.round((now - pageStartTime.current) / 1000) : 0;

    const pageData = {
      pageUrl: window.location.href,
      pagePath: path,
      pageTitle: document.title,
      referrer: document.referrer || 'direct',
      timeOnPage: Math.max(0, timeOnPage)
    };

    // Add UTM parameters from URL
    const urlParams = new URLSearchParams(search);
    pageData.utmSource = urlParams.get('utm_source') || null;
    pageData.utmMedium = urlParams.get('utm_medium') || null;
    pageData.utmCampaign = urlParams.get('utm_campaign') || null;
    pageData.utmTerm = urlParams.get('utm_term') || null;
    pageData.utmContent = urlParams.get('utm_content') || null;

    await sendToBackend('page_view', pageData);
  };

  const sendToBackend = async (eventType, properties = {}) => {
    try {
      const response = await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          event: eventType,
          sessionId: sessionId.current,
          timestamp: new Date().toISOString(),
          ...properties
        })
      });

      if (!response.ok) {
        // Silently fail - analytics should never break the app
      }
    } catch (error) {
      // Silent fail - analytics should never break the app
    }
  };

  // Expose tracking methods
  const trackEvent = (eventName, eventProperties = {}) => {
    trackGAEvent(eventName, eventProperties);
    sendToBackend(eventName, eventProperties);
  };

  const trackPageInteraction = (interactionType, properties = {}) => {
    trackEvent('interaction', {
      interactionType,
      pagePath: location.pathname,
      ...properties
    });
  };

  const trackContent = (contentType, action, contentId, properties = {}) => {
    trackEvent('content', {
      contentType,
      action,
      contentId,
      pagePath: location.pathname,
      ...properties
    });
  };

  const trackUserAction = (action, details = {}) => {
    trackEvent('user_action', {
      action,
      userId: user?._id,
      userRole: user?.role,
      ...details
    });
  };

  const trackError = (error, context = {}) => {
    trackEvent('error', {
      error: error.message || error.toString(),
      context,
      pagePath: location.pathname
    });
  };

  return (
    <AnalyticsContext.Provider value={{
      trackEvent,
      trackPageInteraction,
      trackContent,
      trackUserAction,
      trackError,
      sessionId: sessionId.current,
      isInitialized
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

function generateSessionId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  return `sess_${timestamp}_${random}`;
}

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
};

// Custom hook for tracking component views
export const useTrackView = (viewName, dependencies = []) => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('view', { viewName, pagePath: window.location.pathname });
  }, dependencies);
};

// Custom hook for tracking button clicks
export const useTrackClick = (elementName, action = 'click') => {
  const { trackEvent } = useAnalytics();

  const handleClick = useCallback((details = {}) => {
    trackEvent('click', {
      element: elementName,
      action,
      pagePath: window.location.pathname,
      ...details
    });
  }, [elementName, action, trackEvent]);

  return handleClick;
};
