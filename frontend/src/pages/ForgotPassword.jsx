import { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val.trim()) {
      return 'Email Address is required.';
    }
    if (!emailRegex.test(val.trim())) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(email);
    if (err) {
      setError(err);
      setIsSubmitted(false);
      return;
    }

    setError('');
    setIsSubmitted(true);
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <div className="auth-card-header">
          <h2 className="auth-card-title">Forgot Your Password?</h2>
          <p className="auth-card-sub">
            Enter your email address and we'll help you reset your password.
          </p>
        </div>

        {isSubmitted && (
          <div className="form-success-banner" role="status" style={{ marginBottom: '1.25rem' }}>
            <CheckCircle2 size={22} className="success-icon" />
            <div className="success-content">
              <h4>Reset Request Submitted</h4>
              <p>Password reset functionality will be connected to the backend later.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="email" className="form-label">
              Email Address <span className="required-star">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${error ? 'has-error' : ''}`}
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(validate(e.target.value));
              }}
              autoComplete="email"
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? 'email-error' : undefined}
            />
            {error && (
              <span className="form-error-msg" id="email-error" role="alert">
                <AlertCircle size={14} />
                {error}
              </span>
            )}
          </div>

          <button type="submit" className="btn-submit-form" style={{ width: '100%' }}>
            <KeyRound size={18} />
            Send Reset Link
          </button>
        </form>

        <div className="auth-footer-nav" style={{ marginTop: '1.5rem' }}>
          <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <ArrowLeft size={16} /> Back to Sign In
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
