import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  User,
  MessageSquare,
  Link2,
  Globe,
  AlertCircle
} from 'lucide-react';
import './Contact.css';

function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    subject: '',
    message: '' 
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const firstErrorRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim())
      newErrors.name = t('contact.nameRequired') || 'Name is required';
    if (!formData.email.trim())
      newErrors.email = t('contact.emailRequired') || 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = t('contact.invalidEmail') || 'Please enter a valid email';
    if (!formData.subject.trim())
      newErrors.subject = t('contact.subjectRequired') || 'Subject is required';
    if (!formData.message.trim())
      newErrors.message = t('contact.messageRequired') || 'Message is required';
    else if (formData.message.trim().length < 10)
      newErrors.message = t('contact.messageMinLength') || 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      if (firstErrorRef.current) firstErrorRef.current.focus();
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const getFieldId = (fieldName) => `contact-${fieldName}`;

  if (submitted) {
    return (
      <div className="contact-page" role="main">
        <section className="contact-hero" aria-hidden="true">
          <div className="hero-bg">
            <div className="hero-gradient"></div>
          </div>
        </section>
        <div className="contact-content">
          <div className="success-card" role="status" aria-live="polite">
            <div className="success-icon" aria-hidden="true">
              <CheckCircle size={44} />
            </div>
            <h2>{t('contact.thankYou')}</h2>
            <p>{t('contact.successMessage')}</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
              }}
            >
              <Send size={18} />
              {t('contact.sendAnother')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page" role="main">

      {/* ── Hero ── */}
      <section className="contact-hero" aria-hidden="true">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-grid"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-icon">
            <Mail size={30} />
          </div>
          <div className="hero-text">
            <h1>{t('contact.heroTitle')}</h1>
            <p>{t('contact.heroSubtitle')}</p>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="contact-content">
        <div className="contact-layout">

          {/* ── Form ── */}
          <div className="contact-form-section">
            <div className="form-card">
              <h2>{t('contact.formTitle')}</h2>
              <p className="form-desc">{t('contact.formDesc')}</p>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="contact-form"
                noValidate
                aria-describedby="form-description"
              >
                <span id="form-description" className="sr-only">
                  {t('contact.formAriaDesc') || 'Fill out the form below to send us a message. Required fields are marked with an asterisk.'}
                </span>

                <div className="form-row">
                  {/* Name */}
                  <div className="form-group">
                    <label htmlFor={getFieldId('name')}>
                      <User size={15} aria-hidden="true" />
                      {t('contact.name')} <span className="required" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id={getFieldId('name')}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.namePlaceholder')}
                      className={errors.name ? 'error' : ''}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `${getFieldId('name')}-error` : undefined}
                      ref={errors.name ? firstErrorRef : null}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <span id={`${getFieldId('name')}-error`} className="error-message" role="alert">
                        <AlertCircle size={13} aria-hidden="true" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor={getFieldId('email')}>
                      <Mail size={15} aria-hidden="true" />
                      {t('contact.email')} <span className="required" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id={getFieldId('email')}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.emailPlaceholder')}
                      className={errors.email ? 'error' : ''}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? `${getFieldId('email')}-error` : undefined}
                      ref={errors.email && !errors.name ? firstErrorRef : null}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <span id={`${getFieldId('email')}-error`} className="error-message" role="alert">
                        <AlertCircle size={13} aria-hidden="true" />
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="form-group">
                  <label htmlFor={getFieldId('subject')}>
                    <MessageSquare size={15} aria-hidden="true" />
                    {t('contact.subject')} <span className="required" aria-hidden="true">*</span>
                  </label>
                  <select
                    id={getFieldId('subject')}
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? 'error' : ''}
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? `${getFieldId('subject')}-error` : undefined}
                  >
                    <option value="">{t('contact.selectSubject')}</option>
                    <option value="general">{t('contact.subjectGeneral')}</option>
                    <option value="support">{t('contact.subjectSupport')}</option>
                    <option value="feedback">{t('contact.subjectFeedback')}</option>
                    <option value="partnership">{t('contact.subjectPartnership')}</option>
                    <option value="other">{t('contact.subjectOther')}</option>
                  </select>
                  {errors.subject && (
                    <span id={`${getFieldId('subject')}-error`} className="error-message" role="alert">
                      <AlertCircle size={13} aria-hidden="true" />
                      {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor={getFieldId('message')}>
                    <MessageSquare size={15} aria-hidden="true" />
                    {t('contact.message')} <span className="required" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id={getFieldId('message')}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.messagePlaceholder')}
                    rows="5"
                    className={errors.message ? 'error' : ''}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? `${getFieldId('message')}-error` : undefined}
                  ></textarea>
                  {errors.message && (
                    <span id={`${getFieldId('message')}-error`} className="error-message" role="alert">
                      <AlertCircle size={13} aria-hidden="true" />
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-full"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" aria-hidden="true"></span>
                      <span>{t('contact.sending')}</span>
                      <span className="sr-only">Sending your message...</span>
                    </>
                  ) : (
                    <>
                      {t('contact.sendMessage')}
                      <Send size={17} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="contact-info-section" aria-label={t('contact.contactInfo') || 'Contact information'}>

            {/* Get in Touch card — FIXED: header above items, all in one vertical column */}
            <div className="info-card">
              {/* Header block: title + description stacked */}
              <div className="info-card-header">
                <h3>{t('contact.getInTouch')}</h3>
                <p className="info-desc">{t('contact.infoDesc')}</p>
              </div>

              {/* Items list: each row = icon + label + value */}
              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon" aria-hidden="true">
                    <Mail size={19} />
                  </div>
                  <div className="info-content">
                    <span className="info-label">{t('contact.email')}</span>
                    <a href="mailto:contact@blogsite.com">contact@blogsite.com</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon" aria-hidden="true">
                    <MapPin size={19} />
                  </div>
                  <div className="info-content">
                    <span className="info-label">{t('contact.location')}</span>
                    <span>Islamabad, Pakistan</span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon" aria-hidden="true">
                    <Clock size={19} />
                  </div>
                  <div className="info-content">
                    <span className="info-label">{t('contact.responseTime')}</span>
                    <span>{t('contact.responseTimeValue')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow Us card */}
            <div className="social-card">
              <h3>{t('contact.followUs')}</h3>
              <nav className="social-links" aria-label={t('contact.socialLinks') || 'Social media links'}>
                <a
                  href="https://linkedin.com/in/naeem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={t('contact.linkedInAria') || 'LinkedIn (opens in new tab)'}
                >
                  <Link2 size={19} aria-hidden="true" />
                  <span>{t('contact.linkedIn')}</span>
                </a>
                <a
                  href="https://www.tutortutees.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={t('contact.tutorTuteesAria') || 'TutorTutees (opens in new tab)'}
                >
                  <Globe size={19} aria-hidden="true" />
                  <span>{t('contact.tutorTutees')}</span>
                </a>
              </nav>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}

export default Contact;