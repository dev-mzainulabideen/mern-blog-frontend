import ReactGA4 from 'react-ga4';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

let isInitialized = false;

/**
 * Initialize Google Analytics 4
 */
export const initializeGA = () => {
  if (isInitialized) return;

  try {
    ReactGA4.initialize(GA_MEASUREMENT_ID, {
      debug: import.meta.env.DEV,
      gtagOptions: {
        send_page_view: true,
        cookie_flags: 'SameSite=None;Secure',
        anonymize_ip: true, // GDPR compliance
        send_ad_personalization: false // Disable personalized ads
      }
    });

    isInitialized = true;

    if (import.meta.env.DEV) {
      console.log('✅ Google Analytics 4 initialized with ID:', GA_MEASUREMENT_ID);
    }
  } catch (error) {
    console.error('Failed to initialize GA4:', error);
  }
};

/**
 * Track page view
 */
export const trackPageView = (path) => {
  if (!isInitialized) return;

  try {
    ReactGA4.send({
      hitType: 'pageview',
      page: path,
      title: document.title
    });
  } catch (error) {
    console.error('GA4 page view tracking error:', error);
  }
};

/**
 * Track custom event
 */
export const trackEvent = (eventName, params = {}) => {
  if (!isInitialized) return;

  try {
    ReactGA4.event(eventName, params);
  } catch (error) {
    console.error('GA4 event tracking error:', error);
  }
};

/**
 * Enhanced event tracking with categories
 */
export const track = {
  // User actions
  user: {
    login: (userId, role) => trackEvent('login', { userId, role }),
    signup: (userId, method) => trackEvent('sign_up', { userId, method }),
    logout: (userId) => trackEvent('logout', { userId }),
    profile_update: (userId, fields) => trackEvent('profile_update', { userId, fields })
  },

  // Content engagement
  content: {
    view: (contentType, contentId, title) =>
      trackEvent('content_view', { contentType, contentId, title }),
    click: (contentType, contentId, action) =>
      trackEvent('content_click', { contentType, contentId, action }),
    share: (contentType, contentId, method) =>
      trackEvent('share', { contentType, contentId, method }),
    download: (contentType, contentId, filename) =>
      trackEvent('file_download', { contentType, contentId, filename })
  },

  // Search
  search: (searchTerm, resultsCount) =>
    trackEvent('search', { search_term: searchTerm, results_count: resultsCount }),

  // Form interactions
  form: {
    start: (formName) => trackEvent('form_start', { form_name: formName }),
    submit: (formName, success) => trackEvent('form_submit', { form_name: formName, success }),
    field_change: (formName, fieldName) =>
      trackEvent('form_field_change', { form_name: formName, field_name: fieldName })
  },

  // Errors
  error: (errorMessage, fatal = false) =>
    trackEvent('exception', { description: errorMessage, fatal }),

  // Performance
  performance: (metrics) => trackEvent('web_vitals', metrics),

  // Social
  social: (network, action, target) =>
    trackEvent('social', { network, action, target }),

  // E-commerce (if needed later)
  ecommerce: {
    purchase: (transactionId, revenue, products) =>
      trackEvent('purchase', { transaction_id: transactionId, revenue, products })
  }
};

/**
 * Identify user across sessions
 */
export const setUserId = (userId) => {
  if (!isInitialized) return;

  try {
    ReactGA4.set({ userId });
  } catch (error) {
    console.error('GA4 setUserId error:', error);
  }
};

/**
 * Set user properties
 */
export const setUserProperties = (properties) => {
  if (!isInitialized) return;

  try {
    ReactGA4.set(properties);
  } catch (error) {
    console.error('GA4 setUserProperties error:', error);
  }
};

/**
 * Track consent status
 */
export const setConsent = (analyticsStorage = 'granted') => {
  if (!isInitialized) return;

  try {
    ReactGA4.set({
      'ad_storage': analyticsStorage === 'granted' ? 'granted' : 'denied',
      'analytics_storage': analyticsStorage === 'granted' ? 'granted' : 'denied'
    });
  } catch (error) {
    console.error('GA4 setConsent error:', error);
  }
};

/**
 * Get GA client ID
 */
export const getClientId = () => {
  // GA4 stores client ID in _ga cookie
  const gaCookie = document.cookie.split(';').find(c => c.trim().startsWith('_ga='));
  if (gaCookie) {
    const parts = gaCookie.split('=')[1].split('.');
    return parts.length >= 2 ? `${parts[2]}.${parts[3]}` : null;
  }
  return null;
};

/**
 * Clear GA data for current user
 */
export const clearTracking = () => {
  if (!isInitialized) return;

  try {
    ReactGA4.remove(() => {
      console.log('GA4 tracking cleared');
    });
  } catch (error) {
    console.error('GA4 clearTracking error:', error);
  }
};

// Export default instance
export default {
  initialize: initializeGA,
  pageView: trackPageView,
  event: trackEvent,
  setUserId,
  setUserProperties,
  setConsent,
  getClientId,
  clearTracking,
  track
};
