import { Link } from 'react-router-dom';
import {
  Car,
  Calendar,
  CheckCircle2,
  FileText,
  Clock,
  MapPin,
  CalendarPlus,
  History,
  ArrowRight,
} from 'lucide-react';
import {
  INITIAL_STATS,
  INITIAL_UPCOMING_SERVICE,
  INITIAL_SERVICE_HISTORY,
} from '../../data/customerData';

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* GREETING HEADER */}
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '0.3rem' }}>
          Good Morning, Samiksha
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
          Here's an overview of your vehicle care.
        </p>
      </div>

      {/* STATS CARDS GRID */}
      <div className="dashboard-stats-grid">
        <div className="info-card" style={{ flexDirection: 'row', alignItems: 'center' }}>
          <div className="info-icon-wrapper">
            <Car size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>My Cars</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-dark)' }}>{INITIAL_STATS.myCars}</h3>
          </div>
        </div>

        <div className="info-card" style={{ flexDirection: 'row', alignItems: 'center' }}>
          <div className="info-icon-wrapper">
            <Calendar size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Upcoming Services</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-dark)' }}>{INITIAL_STATS.upcomingServices}</h3>
          </div>
        </div>

        <div className="info-card" style={{ flexDirection: 'row', alignItems: 'center' }}>
          <div className="info-icon-wrapper">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Completed Services</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-dark)' }}>{INITIAL_STATS.completedServices}</h3>
          </div>
        </div>

        <div className="info-card" style={{ flexDirection: 'row', alignItems: 'center' }}>
          <div className="info-icon-wrapper">
            <FileText size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Pending Invoices</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-dark)' }}>{INITIAL_STATS.pendingInvoices}</h3>
          </div>
        </div>
      </div>

      {/* UPCOMING SERVICE HIGHLIGHTED CARD */}
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
            Upcoming Service
          </h3>
          <span className="status-badge">
            <span className="status-dot"></span>
            {INITIAL_UPCOMING_SERVICE.status}
          </span>
        </div>

        <div className="upcoming-details-grid">
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Vehicle</span>
            <strong style={{ fontSize: '1rem', color: 'var(--primary-dark)' }}>{INITIAL_UPCOMING_SERVICE.vehicle}</strong>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>({INITIAL_UPCOMING_SERVICE.registration})</span>
          </div>

          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Service</span>
            <strong style={{ fontSize: '1rem', color: 'var(--primary-dark)' }}>{INITIAL_UPCOMING_SERVICE.service}</strong>
          </div>

          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Service Center</span>
            <strong style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={14} color="var(--primary-accent)" />
              {INITIAL_UPCOMING_SERVICE.serviceCenter}
            </strong>
          </div>

          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Date & Time</span>
            <strong style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={14} color="var(--primary-accent)" />
              {INITIAL_UPCOMING_SERVICE.date} at {INITIAL_UPCOMING_SERVICE.time}
            </strong>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button type="button" className="btn-card-secondary" onClick={() => alert('View Details UI Modal: Appointment ID UP-2026-01.')}>
            View Details
          </button>
          <button type="button" className="btn-card-primary" onClick={() => alert('Reschedule UI: Rescheduling functionality will connect to backend API.')}>
            Reschedule
          </button>
        </div>
      </div>

      {/* RECENT SERVICE HISTORY TABLE */}
      <div
        style={{
          backgroundColor: 'var(--white)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)' }}>
            Recent Service History
          </h3>
          <Link to="/customer/service-history" style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary-accent)' }}>
            View All History →
          </Link>
        </div>

        <div className="table-responsive-container" style={{ border: 'none', boxShadow: 'none' }}>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Service</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {INITIAL_SERVICE_HISTORY.map((row) => (
                <tr key={row.id}>
                  <td className="feature-name">{row.vehicle}</td>
                  <td>{row.service}</td>
                  <td>{row.date}</td>
                  <td style={{ fontWeight: '700' }}>{row.amount}</td>
                  <td>
                    <span className="status-badge" style={{ display: 'inline-flex' }}>
                      <span className="status-dot"></span>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
          Quick Actions
        </h3>
        <div className="quick-actions-grid">

          <div className="support-card">
            <div>
              <div className="support-icon">
                <CalendarPlus size={22} />
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--primary-dark)', marginTop: '1rem' }}>
                Book a Service
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                Schedule your next vehicle service.
              </p>
            </div>
            <Link to="/customer/book-service" className="btn-card-primary" style={{ textAlign: 'center' }}>
              Book Now <ArrowRight size={16} style={{ marginLeft: '0.4rem' }} />
            </Link>
          </div>

          <div className="support-card">
            <div>
              <div className="support-icon">
                <Car size={22} />
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--primary-dark)', marginTop: '1rem' }}>
                My Cars
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                Manage your registered vehicles.
              </p>
            </div>
            <Link to="/customer/cars" className="btn-card-secondary" style={{ textAlign: 'center' }}>
              Manage Cars
            </Link>
          </div>

          <div className="support-card">
            <div>
              <div className="support-icon">
                <History size={22} />
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--primary-dark)', marginTop: '1rem' }}>
                Service History
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                View your previous services.
              </p>
            </div>
            <Link to="/customer/service-history" className="btn-card-secondary" style={{ textAlign: 'center' }}>
              View History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
