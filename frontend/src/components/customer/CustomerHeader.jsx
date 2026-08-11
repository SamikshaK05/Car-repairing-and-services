import { useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import { INITIAL_NOTIFICATIONS, INITIAL_CUSTOMER_PROFILE } from '../../data/customerData';

export default function CustomerHeader({ title, onToggleMobileSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="customer-header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={24} />
        </button>
        <h2 className="header-title">{title || 'Dashboard'}</h2>
      </div>

      <div className="header-right">
        {/* Notification Bell Icon */}
        <div className="notification-wrapper">
          <button
            type="button"
            className="icon-button"
            onClick={() => setShowNotifications((prev) => !prev)}
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-badge"></span>}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-dropdown-header">Notifications</div>
              {notifications.map((n) => (
                <div key={n.id} className="notification-item">
                  <span className="notification-item-title">{n.title}</span>
                  <span className="notification-item-msg">{n.message}</span>
                  <span className="notification-item-time">{n.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Profile Badge */}
        <div className="user-profile-badge">
          <div className="avatar-circle">
            {INITIAL_CUSTOMER_PROFILE.name.charAt(0)}
          </div>
          <span className="user-name">{INITIAL_CUSTOMER_PROFILE.name}</span>
        </div>
      </div>
    </header>
  );
}
