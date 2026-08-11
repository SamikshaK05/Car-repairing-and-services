import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import './ContactForm.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name, value) => {
    let errorMsg = '';

    if (name === 'fullName') {
      if (!value.trim()) {
        errorMsg = 'Full Name is required.';
      } else if (value.trim().length < 2) {
        errorMsg = 'Full Name must be at least 2 characters.';
      }
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        errorMsg = 'Email Address is required.';
      } else if (!emailRegex.test(value.trim())) {
        errorMsg = 'Please enter a valid email address.';
      }
    }

    if (name === 'phone' && value.trim()) {
      const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length !== 10) {
        errorMsg = 'Please enter a valid 10-digit phone number.';
      }
    }

    if (name === 'subject') {
      if (!value.trim()) {
        errorMsg = 'Subject is required.';
      } else if (value.trim().length < 3) {
        errorMsg = 'Subject must be at least 3 characters.';
      }
    }

    if (name === 'message') {
      if (!value.trim()) {
        errorMsg = 'Message is required.';
      } else if (value.trim().length < 10) {
        errorMsg = 'Message must be at least 10 characters.';
      } else if (value.length > 500) {
        errorMsg = 'Message cannot exceed 500 characters.';
      }
    }

    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent typing beyond 500 characters in message
    if (name === 'message' && value.length > 500) return;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error dynamically if valid
    if (errors[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    newErrors.fullName = validateField('fullName', formData.fullName);
    newErrors.email = validateField('email', formData.email);
    newErrors.phone = validateField('phone', formData.phone);
    newErrors.subject = validateField('subject', formData.subject);
    newErrors.message = validateField('message', formData.message);

    // Filter empty error strings
    const activeErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, err]) => err !== '')
    );

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      setIsSubmitted(false);
      return;
    }

    // Valid submission
    setErrors({});
    setIsSubmitted(true);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="contact-form-card">
      <div>
        <h3 className="contact-form-title">Send Us a Message</h3>
        <p className="contact-form-subtitle">
          Fill out the form below and our team will respond within 24 hours.
        </p>
      </div>

      {isSubmitted && (
        <div className="form-success-banner" role="status" aria-live="polite">
          <CheckCircle2 size={24} className="success-icon" />
          <div className="success-content">
            <h4>Message Sent Successfully!</h4>
            <p>
              Thank you for contacting CarFix. We've received your message and will get back to you soon.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="fullName" className="form-label">
            Full Name <span className="required-star">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className={`form-input ${errors.fullName ? 'has-error' : ''}`}
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            aria-invalid={errors.fullName ? 'true' : 'false'}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <span className="form-error-msg" id="fullName-error" role="alert">
              <AlertCircle size={14} />
              {errors.fullName}
            </span>
          )}
        </div>

        {/* Email Address */}
        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="email" className="form-label">
            Email Address <span className="required-star">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-input ${errors.email ? 'has-error' : ''}`}
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span className="form-error-msg" id="email-error" role="alert">
              <AlertCircle size={14} />
              {errors.email}
            </span>
          )}
        </div>

        {/* Phone Number (Optional) */}
        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="phone" className="form-label">
            Phone Number <span style={{ color: 'var(--text-secondary)', fontWeight: 'normal' }}>(Optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`form-input ${errors.phone ? 'has-error' : ''}`}
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <span className="form-error-msg" id="phone-error" role="alert">
              <AlertCircle size={14} />
              {errors.phone}
            </span>
          )}
        </div>

        {/* Subject */}
        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="subject" className="form-label">
            Subject <span className="required-star">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className={`form-input ${errors.subject ? 'has-error' : ''}`}
            placeholder="What can we help you with?"
            value={formData.subject}
            onChange={handleChange}
            aria-invalid={errors.subject ? 'true' : 'false'}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          />
          {errors.subject && (
            <span className="form-error-msg" id="subject-error" role="alert">
              <AlertCircle size={14} />
              {errors.subject}
            </span>
          )}
        </div>

        {/* Message */}
        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="message" className="form-label">
            Message <span className="required-star">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className={`form-textarea ${errors.message ? 'has-error' : ''}`}
            placeholder="Tell us how we can help..."
            value={formData.message}
            onChange={handleChange}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          ></textarea>
          <div className="char-counter">
            {formData.message.length} / 500
          </div>
          {errors.message && (
            <span className="form-error-msg" id="message-error" role="alert">
              <AlertCircle size={14} />
              {errors.message}
            </span>
          )}
        </div>

        <button type="submit" className="btn-submit-form">
          <Send size={18} />
          Send Message
        </button>
      </form>
    </div>
  );
}
