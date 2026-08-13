import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Wrench,
  User,
  Car,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Phone,
  Mail,
  FileText,
  DollarSign,
  ShieldCheck,
  X,
  RefreshCw,
} from 'lucide-react';
import { getBookingById, updateBookingStatus } from '../../api/bookings.api';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function MechanicJobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Status update modal
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getBookingById(id);
      if (response && response.success && response.data) {
        setBooking(response.data);
        setSelectedStatus(response.data.status);
      } else {
        throw new Error(response?.message || 'Service job not found');
      }
    } catch (err) {
      console.error('Error loading job details:', err.message);
      setError(err.data?.message || err.message || 'Unable to load service job details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  const handleUpdateStatusSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStatus) return;

    try {
      setIsUpdating(true);
      setUpdateError(null);
      const response = await updateBookingStatus(id, selectedStatus);

      if (response && response.success && response.data) {
        setBooking(response.data);
        setSuccessMsg(`Service job status updated to "${selectedStatus}" successfully.`);
        setTimeout(() => setSuccessMsg(null), 4000);
        setShowStatusModal(false);
      } else {
        throw new Error(response?.message || 'Failed to update job status');
      }
    } catch (err) {
      console.error('Error updating status:', err.message);
      setUpdateError(err.data?.message || err.message || 'Failed to update job status.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: 'var(--white)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
        <Loader2 size={36} style={{ animation: 'spin 1s linear infinite', color: '#3B82F6' }} />
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
          Loading service job & vehicle technical parameters...
        </p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: 'var(--white)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
        <AlertCircle size={36} style={{ color: '#EF4444', marginBottom: '0.8rem' }} />
        <h3 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Service Job Not Found</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>{error || 'Requested service job record does not exist or you do not have permission.'}</p>
        <Link to="/mechanic/jobs" className="btn-card-primary" style={{ backgroundColor: '#3B82F6', borderColor: '#3B82F6', textDecoration: 'none' }}>
          Back to Assigned Jobs
        </Link>
      </div>
    );
  }

  const bId = booking._id || booking.id;
  const customer = booking.user || {};
  const vehicle = booking.vehicle || {};
  const service = booking.service || {};
  const center = booking.serviceCenter || {};

  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED':
        return { bg: 'rgba(16, 185, 129, 0.15)', color: '#10B981', label: 'Completed' };
      case 'IN_PROGRESS':
        return { bg: 'rgba(139, 92, 246, 0.15)', color: '#8B5CF6', label: 'In Progress' };
      case 'CONFIRMED':
        return { bg: 'rgba(59, 130, 246, 0.15)', color: '#2563EB', label: 'Confirmed' };
      case 'CANCELLED':
        return { bg: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', label: 'Cancelled' };
      default:
        return { bg: 'rgba(245, 158, 11, 0.15)', color: '#D97706', label: 'Pending' };
    }
  };

  const badge = getStatusBadge(booking.status);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* NAVIGATION BACK LINK & TOP BAR */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={() => navigate('/mechanic/jobs')}
            className="btn-card-secondary"
            style={{ padding: '0.4rem 0.65rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary-dark)', margin: 0 }}>
              Job #{bId.substring(bId.length - 6).toUpperCase()}
            </h1>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Created on {formatDate(booking.createdAt)}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="status-badge" style={{ backgroundColor: badge.bg, color: badge.color, fontSize: '0.9rem', padding: '0.35rem 0.85rem' }}>
            {badge.label}
          </span>
          <button
            type="button"
            className="btn-card-primary"
            onClick={() => setShowStatusModal(true)}
            style={{ backgroundColor: '#3B82F6', borderColor: '#3B82F6' }}
          >
            Update Progress Status
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="form-success-banner" role="status">
          <CheckCircle2 size={20} className="success-icon" />
          <div className="success-content">
            <p>{successMsg}</p>
          </div>
        </div>
      )}

      {/* JOB SUMMARY GRID */}
      <div className="profile-grid">
        {/* 1. SERVICE DETAILS */}
        <div style={{ backgroundColor: 'var(--white)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Wrench size={20} color="#3B82F6" />
            Service Requirements
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Service Name</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--primary-dark)' }}>{service.name || 'N/A'}</strong>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.2rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Category</span>
                <span style={{ fontWeight: 600 }}>{service.category || 'General'}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Estimated Duration</span>
                <span style={{ fontWeight: 600 }}>{service.duration ? `${service.duration} mins` : 'N/A'}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Service Price</span>
                <span style={{ fontWeight: 700, color: '#10B981' }}>{formatCurrency(service.price || booking.amount)}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Scheduled Time</span>
                <span style={{ fontWeight: 600 }}>{booking.bookingTime || 'N/A'} ({formatDate(booking.bookingDate)})</span>
              </div>
            </div>

            {service.description && (
              <div style={{ marginTop: '0.4rem', padding: '0.75rem', backgroundColor: 'var(--bg-light)', borderRadius: '8px', fontSize: '0.88rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--primary-dark)', display: 'block', marginBottom: '0.2rem' }}>Service Overview:</span>
                {service.description}
              </div>
            )}
          </div>
        </div>

        {/* 2. VEHICLE SPECIFICATIONS */}
        <div style={{ backgroundColor: 'var(--white)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Car size={20} color="var(--primary-accent)" />
            Vehicle Details
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Make & Model</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--primary-dark)' }}>
                {vehicle.make} {vehicle.model}
              </strong>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.2rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Registration Number</span>
                <span style={{ fontWeight: 700, color: '#3B82F6' }}>{vehicle.registrationNumber || 'N/A'}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Manufacture Year</span>
                <span style={{ fontWeight: 600 }}>{vehicle.year || 'N/A'}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>Fuel Type</span>
                <span style={{ fontWeight: 600 }}>{vehicle.fuelType || 'Petrol/Diesel'}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>VIN / Chassis</span>
                <span style={{ fontWeight: 600 }}>{vehicle.vin || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CUSTOMER & WORKSHOP INFORMATION */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* CUSTOMER INFO */}
        <div style={{ backgroundColor: 'var(--white)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={20} color="#10B981" />
            Customer Contact
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.92rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Full Name</span>
              <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--primary-dark)' }}>{customer.name || 'Customer'}</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={16} color="var(--text-secondary)" />
              <span>{customer.phone || 'No phone number'}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={16} color="var(--text-secondary)" />
              <span>{customer.email || 'No email address'}</span>
            </div>
          </div>
        </div>

        {/* WORKSHOP / SERVICE CENTER INFO */}
        <div style={{ backgroundColor: 'var(--white)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={20} color="#F59E0B" />
            Service Center Workshop
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.92rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Center Name</span>
              <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--primary-dark)' }}>{center.name || 'Workshop'}</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <MapPin size={16} color="var(--text-secondary)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
              <span>{center.address || ''}{center.city ? `, ${center.city}` : ''}</span>
            </div>

            {center.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="var(--text-secondary)" />
                <span>{center.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SPECIAL INSTRUCTIONS & NOTES */}
      {booking.notes && (
        <div style={{ backgroundColor: 'var(--white)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={20} color="#8B5CF6" />
            Customer Special Notes
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0, padding: '0.85rem', backgroundColor: 'var(--bg-light)', borderRadius: '10px' }}>
            {booking.notes}
          </p>
        </div>
      )}

      {/* STATUS UPDATE MODAL */}
      {showStatusModal && (
        <div className="modal-overlay" style={{ zIndex: 1100 }}>
          <div className="modal-card" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Wrench size={20} color="#3B82F6" />
                Update Job Progress Status
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowStatusModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            {updateError && (
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '1rem' }}>
                {updateError}
              </div>
            )}

            <form onSubmit={handleUpdateStatusSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.4rem', display: 'block' }}>
                  Select Updated Status *
                </label>
                <select
                  className="form-control"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  required
                >
                  <option value="CONFIRMED">CONFIRMED (Appointment Accepted)</option>
                  <option value="IN_PROGRESS">IN_PROGRESS (Currently Under Maintenance)</option>
                  <option value="COMPLETED">COMPLETED (Maintenance Finished)</option>
                  <option value="PENDING">PENDING (Awaiting Service Slot)</option>
                  <option value="CANCELLED">CANCELLED (Service Cancelled)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn-card-secondary"
                  onClick={() => setShowStatusModal(false)}
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-card-primary"
                  disabled={isUpdating || selectedStatus === booking.status}
                  style={{ backgroundColor: '#3B82F6', borderColor: '#3B82F6' }}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 size={16} className="spinning-loader" style={{ animation: 'spin 1s linear infinite', marginRight: '0.3rem' }} /> Updating...
                    </>
                  ) : (
                    'Confirm Status Update'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
