import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle, Info } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import AuthLayout from '../components/AuthLayout';
import PasswordInput from '../components/PasswordInput';
import { useAuth } from '../context/AuthContext';
import { getDashboardPath } from '../components/ProtectedRoute';

export default function Login() {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    let errorMsg = '';

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        errorMsg = 'Email Address is required.';
      } else if (!emailRegex.test(value.trim())) {
        errorMsg = 'Please enter a valid email address.';
      }
    }

    if (name === 'password') {
      if (!value) {
        errorMsg = 'Password is required.';
      } else if (value.length < 6) {
        errorMsg = 'Password must be at least 6 characters.';
      }
    }

    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    if (errors[name]) {
      const errorMsg = validateField(name, val);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const emailErr = validateField('email', formData.email);
    const passErr = validateField('password', formData.password);

    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await login(formData.email, formData.password);
      const loggedInUser = response.data?.user || response.user;
      const role = loggedInUser?.role || 'CUSTOMER';
      const redirectPath = getDashboardPath(role);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      const errorMsg = err.data?.message || err.message || 'Login failed. Please check your credentials.';
      setApiError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      setApiError('Google login failed: No ID token returned');
      return;
    }

    setIsSubmitting(true);
    setApiError('');

    try {
      const response = await googleLogin({ credential: credentialResponse.credential });
      const loggedInUser = response.data?.user || response.user;
      const role = loggedInUser?.role || 'CUSTOMER';
      const redirectPath = getDashboardPath(role);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      const errorMsg = err.data?.message || err.message || 'Google authentication failed.';
      setApiError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleError = () => {
    setApiError('Google authentication was cancelled or failed.');
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <div className="auth-card-header">
          <h2 className="auth-card-title">Welcome Back</h2>
          <p className="auth-card-sub">
            Sign in to manage your vehicle services with CarFix.
          </p>
        </div>

        {apiError && (
          <div className="pricing-alert-box" style={{ marginBottom: '1.25rem', padding: '1rem', borderColor: 'rgba(239, 68, 68, 0.4)', backgroundColor: 'rgba(239, 68, 68, 0.08)' }}>
            <AlertCircle size={20} className="alert-icon" style={{ color: '#ef4444' }} />
            <div className="alert-text">
              <p style={{ color: '#ef4444', fontWeight: 500 }}>{apiError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
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
              disabled={isSubmitting}
              autoComplete="email"
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

          {/* Password */}
          <PasswordInput
            id="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            disabled={isSubmitting}
            autoComplete="current-password"
            error={errors.password}
          />

          {/* Remember Me & Forgot Password */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', color: 'var(--text-primary)' }}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isSubmitting}
                style={{ cursor: 'pointer', accentColor: 'var(--primary-accent)' }}
              />
              Remember me
            </label>
            <Link to="/forgot-password" style={{ color: 'var(--primary-accent)', fontWeight: '600', textDecoration: 'none' }}>
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-submit-form" style={{ width: '100%' }} disabled={isSubmitting}>
            <LogIn size={18} />
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Social Login UI */}
        <div className="social-login-divider">
          <span>OR</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '0.75rem 0' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            shape="rectangular"
            theme="filled_black"
            size="large"
            text="continue_with"
            width="100%"
          />
        </div>

        <div className="auth-footer-nav">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </AuthLayout>
  );
}
