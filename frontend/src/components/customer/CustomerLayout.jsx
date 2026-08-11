import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import CustomerSidebar from './CustomerSidebar';
import CustomerHeader from './CustomerHeader';
import { LogOut, X } from 'lucide-react';
import './CustomerLayout.css';

export default function CustomerLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = (path) => {
    if (path.includes('/customer/cars')) return 'My Cars';
    if (path.includes('/customer/book-service')) return 'Book a Service';
    if (path.includes('/customer/bookings')) return 'My Bookings';
    if (path.includes('/customer/service-history')) return 'Service History';
    if (path.includes('/customer/invoices')) return 'My Invoices';
    if (path.includes('/customer/profile')) return 'My Profile';
    return 'Dashboard Overview';
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    navigate('/login');
  };

  return (
    <div className="customer-layout-wrapper">
      {/* Fixed Sidebar */}
      <CustomerSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onOpenLogoutModal={() => setShowLogoutModal(true)}
      />

      {mobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Area */}
      <div className="customer-main-content">
        <CustomerHeader
          title={getPageTitle(location.pathname)}
          onToggleMobileSidebar={() => setMobileOpen((prev) => !prev)}
        />

        <main className="customer-page-content">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LogOut size={22} color="#EF4444" />
                Confirm Logout
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowLogoutModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.5' }}>
              Are you sure you want to logout? You will be redirected to the Sign In page.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button
                type="button"
                className="btn-card-secondary"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-card-primary"
                onClick={handleConfirmLogout}
                style={{ backgroundColor: '#DC2626', borderColor: '#DC2626' }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
