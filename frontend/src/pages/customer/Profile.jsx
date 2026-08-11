import { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit3, KeyRound, CheckCircle2, X } from 'lucide-react';
import { INITIAL_CUSTOMER_PROFILE } from '../../data/customerData';

export default function Profile() {
  const [profile, setProfile] = useState(INITIAL_CUSTOMER_PROFILE);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [editData, setEditData] = useState({ ...profile });
  const [passData, setPassData] = useState({ currentPass: '', newPass: '', confirmPass: '' });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProfile({ ...editData });
    setShowEditModal(false);
    setSuccessMsg('Profile information updated successfully.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handlePassSubmit = (e) => {
    e.preventDefault();
    setShowPassModal(false);
    setPassData({ currentPass: '', newPass: '', confirmPass: '' });
    setSuccessMsg('Password changed successfully (Demo UI).');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>
          My Profile
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Manage your personal information and security settings.
        </p>
      </div>

      {successMsg && (
        <div className="form-success-banner" role="status">
          <CheckCircle2 size={20} className="success-icon" />
          <div className="success-content">
            <p>{successMsg}</p>
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)' }}>
              Personal & Contact Information
            </h3>
            <button
              type="button"
              className="btn-card-secondary"
              onClick={() => {
                setEditData({ ...profile });
                setShowEditModal(true);
              }}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
            >
              <Edit3 size={15} style={{ marginRight: '0.3rem' }} /> Edit Profile
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div className="info-icon-wrapper">
                <User size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>Full Name</span>
                <strong style={{ fontSize: '1rem', color: 'var(--primary-dark)' }}>{profile.name}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div className="info-icon-wrapper">
                <Mail size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>Email Address</span>
                <strong style={{ fontSize: '1rem', color: 'var(--primary-dark)' }}>{profile.email}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div className="info-icon-wrapper">
                <Phone size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>Phone Number</span>
                <strong style={{ fontSize: '1rem', color: 'var(--primary-dark)' }}>{profile.phone}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div className="info-icon-wrapper">
                <MapPin size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>Location</span>
                <strong style={{ fontSize: '1rem', color: 'var(--primary-dark)' }}>{profile.location}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* SECURITY SETTINGS */}
        <div
          style={{
            backgroundColor: 'var(--white)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.25rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
              Account Security
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>
              Keep your account safe by updating your password regularly.
            </p>
          </div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-light)', borderRadius: '10px', fontSize: '0.88rem' }}>
            <span style={{ color: 'var(--text-secondary)', display: 'block' }}>Member Status</span>
            <strong style={{ color: 'var(--primary-dark)' }}>Active Customer (Member since {profile.memberSince})</strong>
          </div>

          <div>
            <button
              type="button"
              className="btn-card-secondary"
              onClick={() => setShowPassModal(true)}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <KeyRound size={16} style={{ marginRight: '0.4rem' }} />
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">Edit Profile</h3>
              <button type="button" className="modal-close-btn" onClick={() => setShowEditModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={editData.location}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" className="btn-card-secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-card-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {showPassModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">Change Password</h3>
              <button type="button" className="modal-close-btn" onClick={() => setShowPassModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePassSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter current password"
                  value={passData.currentPass}
                  onChange={(e) => setPassData({ ...passData, currentPass: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter new password"
                  value={passData.newPass}
                  onChange={(e) => setPassData({ ...passData, newPass: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Confirm new password"
                  value={passData.confirmPass}
                  onChange={(e) => setPassData({ ...passData, confirmPass: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" className="btn-card-secondary" onClick={() => setShowPassModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-card-primary">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
