import { useState } from 'react';
import { User, Mail, Phone, ShieldCheck, CheckCircle2, Loader2, Wrench, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function MechanicProfile() {
  const { user, loading } = useAuth();
  const [infoMsg, setInfoMsg] = useState('');

  if (loading) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: 'var(--white)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
        <Loader2 size={36} className="spinning-loader" style={{ animation: 'spin 1s linear infinite', color: '#3B82F6' }} />
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading mechanic profile...</p>
      </div>
    );
  }

  const currentUser = user || {
    name: 'Technician',
    email: 'N/A',
    phone: 'N/A',
    role: 'MECHANIC',
    createdAt: new Date(),
  };

  const memberSinceDate = currentUser.createdAt
    ? new Date(currentUser.createdAt).toLocaleDateString('en-IN', {
        month: 'long',
        year: 'numeric',
      })
    : '2026';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>
          Mechanic Profile
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          View your technician account details and security credentials.
        </p>
      </div>

      {infoMsg && (
        <div className="form-success-banner" role="status">
          <CheckCircle2 size={20} className="success-icon" />
          <div className="success-content">
            <p>{infoMsg}</p>
          </div>
        </div>
      )}

      {/* PROFILE DETAILS GRID */}
      <div className="profile-grid">
        {/* PERSONAL & CONTACT INFORMATION */}
        <div
          style={{
            backgroundColor: 'var(--white)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)' }}>
            Technician Details
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="profile-field-row" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <User size={20} color="#3B82F6" />
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>Full Name</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--primary-dark)' }}>{currentUser.name}</strong>
              </div>
            </div>

            <div className="profile-field-row" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Mail size={20} color="#3B82F6" />
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>Email Address</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--primary-dark)' }}>{currentUser.email}</strong>
              </div>
            </div>

            <div className="profile-field-row" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Phone size={20} color="#3B82F6" />
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>Contact Phone</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--primary-dark)' }}>{currentUser.phone || 'N/A'}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* ACCOUNT ROLE & AUTHORIZATION */}
        <div
          style={{
            backgroundColor: 'var(--white)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)' }}>
            Authorization & Status
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="profile-field-row" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <ShieldCheck size={20} color="#10B981" />
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>System Role</span>
                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    backgroundColor: 'rgba(59, 130, 246, 0.15)',
                    color: '#2563EB',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    display: 'inline-block',
                    marginTop: '0.2rem',
                  }}
                >
                  {currentUser.role}
                </span>
              </div>
            </div>

            <div className="profile-field-row" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <CheckCircle2 size={20} color="#10B981" />
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>Account Status</span>
                <strong style={{ color: '#10B981' }}>Active Account</strong>
              </div>
            </div>

            <div className="profile-field-row" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Calendar size={20} color="#3B82F6" />
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>Member Since</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--primary-dark)' }}>{memberSinceDate}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
