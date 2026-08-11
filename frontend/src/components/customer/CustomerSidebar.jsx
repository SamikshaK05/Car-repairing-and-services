import { NavLink } from 'react-router-dom';
import {
  Car,
  LayoutDashboard,
  CalendarPlus,
  CalendarCheck,
  History,
  FileText,
  User,
  LogOut,
  X,
} from 'lucide-react';

export default function CustomerSidebar({ mobileOpen, onCloseMobile, onOpenLogoutModal }) {
  return (
    <aside className={`customer-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-top">
        <div className="sidebar-brand-container">
          <NavLink to="/" className="sidebar-brand" onClick={onCloseMobile}>
            <Car className="sidebar-brand-icon" size={28} />
            <span>CarFix</span>
          </NavLink>
          {mobileOpen && (
            <button
              type="button"
              className="modal-close-btn"
              onClick={onCloseMobile}
              style={{ marginLeft: 'auto', color: 'var(--white)' }}
            >
              <X size={24} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/customer/dashboard"
            className={({ isActive }) => (isActive ? 'sidebar-nav-item active' : 'sidebar-nav-item')}
            onClick={onCloseMobile}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/customer/cars"
            className={({ isActive }) => (isActive ? 'sidebar-nav-item active' : 'sidebar-nav-item')}
            onClick={onCloseMobile}
          >
            <Car size={20} />
            <span>My Cars</span>
          </NavLink>

          <NavLink
            to="/customer/book-service"
            className={({ isActive }) => (isActive ? 'sidebar-nav-item active' : 'sidebar-nav-item')}
            onClick={onCloseMobile}
          >
            <CalendarPlus size={20} />
            <span>Book Service</span>
          </NavLink>

          <NavLink
            to="/customer/bookings"
            className={({ isActive }) => (isActive ? 'sidebar-nav-item active' : 'sidebar-nav-item')}
            onClick={onCloseMobile}
          >
            <CalendarCheck size={20} />
            <span>My Bookings</span>
          </NavLink>

          <NavLink
            to="/customer/service-history"
            className={({ isActive }) => (isActive ? 'sidebar-nav-item active' : 'sidebar-nav-item')}
            onClick={onCloseMobile}
          >
            <History size={20} />
            <span>Service History</span>
          </NavLink>

          <NavLink
            to="/customer/invoices"
            className={({ isActive }) => (isActive ? 'sidebar-nav-item active' : 'sidebar-nav-item')}
            onClick={onCloseMobile}
          >
            <FileText size={20} />
            <span>Invoices</span>
          </NavLink>

          <NavLink
            to="/customer/profile"
            className={({ isActive }) => (isActive ? 'sidebar-nav-item active' : 'sidebar-nav-item')}
            onClick={onCloseMobile}
          >
            <User size={20} />
            <span>Profile</span>
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <button type="button" className="sidebar-logout-btn" onClick={onOpenLogoutModal}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
