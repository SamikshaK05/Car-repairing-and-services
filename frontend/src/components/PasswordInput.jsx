import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordInput({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  autoComplete,
  error,
  required = true,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="required-star">*</span>}
      </label>
      <div className="password-input-wrapper" style={{ position: 'relative' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          name={name}
          className={`form-input ${error ? 'has-error' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          style={{ paddingRight: '2.75rem' }}
        />
        <button
          type="button"
          className="password-toggle-btn"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          style={{
            position: 'absolute',
            right: '0.85rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <span className="form-error-msg" id={`${id}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
