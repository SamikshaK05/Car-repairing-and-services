import { useState } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { INITIAL_UPCOMING_SERVICE } from '../../data/customerData';

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>
          My Bookings
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Track and manage your upcoming, completed, and past service appointments.
        </p>
      </div>

      {/* TABS */}
      <div className="filter-container" style={{ justifyContent: 'flex-start' }}>
        <div className="filter-bar">
          <button
            type="button"
            className={`filter-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming (1)
          </button>
          <button
            type="button"
            className={`filter-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed (6)
          </button>
          <button
            type="button"
            className={`filter-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled (0)
          </button>
        </div>
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'upcoming' && (
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
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary-dark)' }}>
              {INITIAL_UPCOMING_SERVICE.vehicle} – {INITIAL_UPCOMING_SERVICE.service}
            </h3>
            <span className="status-badge">
              <span className="status-dot"></span>
              {INITIAL_UPCOMING_SERVICE.status}
            </span>
          </div>

          <div className="car-info-grid" style={{ fontSize: '0.95rem' }}>

            <div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block' }}>Service Center</span>
              <strong style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--primary-dark)' }}>
                <MapPin size={14} color="var(--primary-accent)" />
                {INITIAL_UPCOMING_SERVICE.serviceCenter}
              </strong>
            </div>

            <div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block' }}>Date & Time</span>
              <strong style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--primary-dark)' }}>
                <Clock size={14} color="var(--primary-accent)" />
                {INITIAL_UPCOMING_SERVICE.date} ({INITIAL_UPCOMING_SERVICE.time})
              </strong>
            </div>

            <div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block' }}>Registration</span>
              <strong style={{ color: 'var(--primary-dark)' }}>{INITIAL_UPCOMING_SERVICE.registration}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button type="button" className="btn-card-secondary" onClick={() => alert('View Details UI Modal.')}>
              View Details
            </button>
            <button type="button" className="btn-card-secondary" onClick={() => alert('Reschedule UI action.')}>
              Reschedule
            </button>
            <button
              type="button"
              className="btn-card-secondary"
              onClick={() => alert('Cancel appointment UI action.')}
              style={{ color: '#DC2626' }}
            >
              Cancel Booking
            </button>
          </div>
        </div>
      )}

      {activeTab === 'completed' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              backgroundColor: 'var(--white)',
              border: '1px solid var(--border-color)',
              borderRadius: '14px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary-dark)' }}>
                Honda City – Oil Change
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Completed on 02 March 2026 at CarFix Pune – Wakad
              </p>
            </div>
            <span className="status-badge">
              <span className="status-dot"></span>
              Completed
            </span>
          </div>
        </div>
      )}

      {activeTab === 'cancelled' && (
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--white)', borderRadius: '12px', color: 'var(--text-secondary)' }}>
          No cancelled bookings.
        </div>
      )}
    </div>
  );
}
