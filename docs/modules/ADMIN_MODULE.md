# Admin Portal Module (`feature/admin-module`)

## Module Overview
The Admin Portal module provides system-wide operational analytics, platform user management (role editing, activation/deactivation), service center catalog administration, revenue reporting, and customer review oversight.

---

## Technical Specifications

### Controllers & Business Logic
- **`backend/src/controllers/adminController.js`**:
  - `getAdminDashboardStats`: System-wide metrics across users, bookings, revenue, and active centers.
  - `getAllUsers`: Searchable user table with role filtering.
  - `updateUserProfile`: Profile and role updates with self-demotion protection.
  - `toggleUserStatus`: User activation/deactivation.

### Frontend Integration
- **`frontend/src/pages/admin/Dashboard.jsx`**: Platform-wide metrics and charts.
- **`frontend/src/pages/admin/Users.jsx`**: User directory and profile editor modal.
- **`frontend/src/pages/admin/Bookings.jsx`**: System-wide appointment master queue.
- **`frontend/src/pages/admin/Invoices.jsx`**: Master invoice overview.
- **`frontend/src/pages/admin/Reports.jsx`**: Financial and operational analytics reports.
- **`frontend/src/pages/admin/ServiceCenters.jsx`**: Service center location management.
- **`frontend/src/pages/admin/Services.jsx`**: Master service catalog pricing management.
- **`frontend/src/pages/admin/Reviews.jsx`**: Platform review moderation.
