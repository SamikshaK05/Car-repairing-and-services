import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardList,
  Search,
  Filter,
  Wrench,
  User,
  Car,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight,
  RefreshCw,
  X,
} from 'lucide-react';
import { getBookings, updateBookingStatus } from '../../api/bookings.api';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function MechanicJobs() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Status update modal state
  const [updatingBooking, setUpdatingBooking] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getBookings();
      if (response && response.success && Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        throw new Error(response?.message || 'Failed to fetch assigned jobs');
      }
    } catch (err) {
      console.error('Error loading mechanic jobs:', err.message);
      setError(err.data?.message || err.message || 'Unable to load assigned jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpenStatusModal = (booking) => {
    setUpdatingBooking(booking);
    setSelectedStatus(booking.status);
    setUpdateError(null);
  };

  const handleConfirmStatusUpdate = async () => {
    if (!updatingBooking || !selectedStatus) return;
    try {
      setIsUpdating(true);
      setUpdateError(null);
      const bId = updatingBooking._id || updatingBooking.id;
      const response = await updateBookingStatus(bId, selectedStatus);

      if (response && response.success) {
        setSuccessMsg(`Booking status updated to ${selectedStatus} successfully.`);
        setTimeout(() => setSuccessMsg(null), 4000);

        // Update local list state
        setBookings((prev) =>
          prev.map((b) => ((b._id || b.id) === bId ? { ...b, status: selectedStatus } : b))
        );
        setUpdatingBooking(null);
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

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchStatus = statusFilter === 'ALL' || b.status === statusFilter;

      const cName = b.user?.name || '';
      const cPhone = b.user?.phone || '';
      const cEmail = b.user?.email || '';
      const vehMake = b.vehicle?.make || '';
      const vehModel = b.vehicle?.model || '';
      const regNum = b.vehicle?.registrationNumber || '';
      const srvName = b.service?.name || '';
      const bId = b._id || b.id || '';

      const term = searchTerm.toLowerCase().trim();
      const matchSearch =
        !term ||
        cName.toLowerCase().includes(term) ||
        cPhone.toLowerCase().includes(term) ||
        cEmail.toLowerCase().includes(term) ||
        vehMake.toLowerCase().includes(term) ||
        vehModel.toLowerCase().includes(term) ||
        regNum.toLowerCase().includes(term) ||
        srvName.toLowerCase().includes(term) ||
        bId.toLowerCase().includes(term);

      return matchStatus && matchSearch;
    });
  }, [bookings, searchTerm, statusFilter]);

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* PAGE HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>
            My Assigned Service Jobs
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
            Manage your service job queue, inspect vehicle specs, and update execution progress.
          </p>
        </div>
        <button type="button" className="btn-card-secondary" onClick={fetchJobs} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} /> Refresh Queue
        </button>
      </div>

      {successMsg && (
        <div className="form-success-banner" role="status">
          <CheckCircle2 size={20} className="success-icon" />
          <div className="success-content">
            <p>{successMsg}</p>
          </div>
        </div>
      )}

      {/* FILTER & SEARCH CONTROL BAR */}
      <div style={{ backgroundColor: 'var(--white)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* SEARCH INPUT */}
          <div style={{ flex: '1', minWidth: '260px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input
              type="text"
              className="form-control"
              placeholder="Search by customer, vehicle, reg number, or service name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>

          {/* STATUS SELECTOR DROPDOWN */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '200px' }}>
            <Filter size={16} color="var(--text-secondary)" />
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        {/* STATUS PILL BUTTONS */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['ALL', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'PENDING', 'CANCELLED'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                padding: '0.3rem 0.75rem',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: statusFilter === st ? '#3B82F6' : 'var(--border-color)',
                backgroundColor: statusFilter === st ? '#3B82F6' : 'var(--white)',
                color: statusFilter === st ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {st === 'ALL' ? 'All Jobs' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN JOBS TABLE / CONTENT */}
      {loading ? (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: 'var(--white)', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
          <Loader2 size={36} style={{ animation: 'spin 1s linear infinite', color: '#3B82F6' }} />
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Fetching assigned service queue...</p>
        </div>
      ) : error ? (
        <div style={{ padding: '3rem 2rem', textAlign: 'center', backgroundColor: 'var(--white)', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
          <AlertCircle size={36} style={{ color: '#EF4444', marginBottom: '0.8rem' }} />
          <h3 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Unable to Load Jobs</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>{error}</p>
          <button type="button" className="btn-card-primary" onClick={fetchJobs} style={{ backgroundColor: '#3B82F6', borderColor: '#3B82F6' }}>
            Try Again
          </button>
        </div>
      ) : (
        <div className="table-responsive-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Info</th>
                <th>Vehicle Info</th>
                <th>Requested Service</th>
                <th>Scheduled Date & Time</th>
                <th>Price</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => {
                  const bId = b._id || b.id;
                  const badge = getStatusBadge(b.status);
                  const customerName = b.user?.name || 'Customer';
                  const customerPhone = b.user?.phone || '';
                  const vehTitle = b.vehicle ? `${b.vehicle.make || ''} ${b.vehicle.model || ''}`.trim() : 'Vehicle';
                  const regNum = b.vehicle?.registrationNumber || '';
                  const srvName = b.service?.name || 'Service';

                  return (
                    <tr key={bId}>
                      <td>
                        <strong style={{ color: 'var(--primary-dark)', fontSize: '0.88rem' }}>
                          #{bId.substring(bId.length - 6).toUpperCase()}
                        </strong>
                      </td>
                      <td className="feature-name">
                        <div style={{ fontWeight: 700, color: 'var(--primary-dark)' }}>{customerName}</div>
                        {customerPhone && (
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                            {customerPhone}
                          </span>
                        )}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{vehTitle}</div>
                        {regNum && (
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>
                            Reg: {regNum}
                          </span>
                        )}
                      </td>
                      <td>{srvName}</td>
                      <td>
                        {formatDate(b.bookingDate)}
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>
                          {b.bookingTime || 'N/A'}
                        </span>
                      </td>
                      <td style={{ fontWeight: 700 }}>
                        {formatCurrency(b.service?.price || b.amount || 0)}
                      </td>
                      <td>
                        <span className="status-badge" style={{ backgroundColor: badge.bg, color: badge.color, display: 'inline-flex' }}>
                          {badge.label}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                          <button
                            type="button"
                            className="btn-card-secondary"
                            onClick={() => handleOpenStatusModal(b)}
                            style={{ fontSize: '0.78rem', padding: '0.3rem 0.5rem' }}
                            title="Update Job Status"
                          >
                            Update Status
                          </button>
                          <Link
                            to={`/mechanic/jobs/${bId}`}
                            className="btn-card-primary"
                            style={{ backgroundColor: '#3B82F6', borderColor: '#3B82F6', textDecoration: 'none', padding: '0.3rem 0.6rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center' }}
                            title="View Complete Job Details"
                          >
                            <ArrowUpRight size={14} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
                    No assigned service jobs found matching current search/filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* QUICK STATUS UPDATE MODAL */}
      {updatingBooking && (
        <div className="modal-overlay" style={{ zIndex: 1100 }}>
          <div className="modal-card" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Wrench size={20} color="#3B82F6" />
                Update Service Job Status
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setUpdatingBooking(null)}
              >
                <X size={20} />
              </button>
            </div>

            {updateError && (
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '1rem' }}>
                {updateError}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '0.85rem', backgroundColor: 'var(--bg-light)', borderRadius: '10px', fontSize: '0.88rem' }}>
                <strong style={{ color: 'var(--primary-dark)', display: 'block', marginBottom: '0.2rem' }}>
                  Booking #{updatingBooking._id?.substring(updatingBooking._id.length - 6).toUpperCase()}
                </strong>
                <div>{updatingBooking.service?.name}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                  Customer: {updatingBooking.user?.name} | Vehicle: {updatingBooking.vehicle?.make} {updatingBooking.vehicle?.model}
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.4rem', display: 'block' }}>
                  Select New Job Status *
                </label>
                <select
                  className="form-control"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="CONFIRMED">CONFIRMED (Appointment Accepted)</option>
                  <option value="IN_PROGRESS">IN_PROGRESS (Currently Servicing)</option>
                  <option value="COMPLETED">COMPLETED (Work Finished)</option>
                  <option value="PENDING">PENDING (Awaiting Schedule)</option>
                  <option value="CANCELLED">CANCELLED (Cancelled Job)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button
                type="button"
                className="btn-card-secondary"
                onClick={() => setUpdatingBooking(null)}
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-card-primary"
                onClick={handleConfirmStatusUpdate}
                disabled={isUpdating || selectedStatus === updatingBooking.status}
                style={{ backgroundColor: '#3B82F6', borderColor: '#3B82F6' }}
              >
                {isUpdating ? (
                  <>
                    <Loader2 size={16} className="spinning-loader" style={{ animation: 'spin 1s linear infinite', marginRight: '0.3rem' }} /> Updating...
                  </>
                ) : (
                  'Save Status Change'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
