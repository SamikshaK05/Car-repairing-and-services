# Service Manager Portal Module (`feature/service-manager-module`)

## Module Overview
The Service Manager Portal module manages workshop-scoped queues, mechanic assignment, lifecycle status enforcement (`PENDING` -> `CONFIRMED` -> `IN_PROGRESS` -> `COMPLETED`), and automatic PDF invoice generation upon job completion.

---

## Technical Specifications

### Controllers & Business Logic
- **`backend/src/controllers/serviceManagerController.js`**:
  - `getDashboardStats`: Returns queue summary metrics for the assigned workshop center.
  - `getCenterBookings`: Scoped appointment queue listing.
  - `assignMechanic`: Assigns an active technician to a booking and advances status from `PENDING` to `CONFIRMED`.
  - `updateBookingStatus`: Strict lifecycle progression and auto-invoice creation on completion.

### Frontend Integration
- **`frontend/src/pages/serviceManager/Dashboard.jsx`**: Workshop metrics overview.
- **`frontend/src/pages/serviceManager/Bookings.jsx`**: Workshop booking queue with mechanic assignment drawer.
- **`frontend/src/pages/serviceManager/Invoices.jsx`**: Workshop invoice history and PDF downloader.
- **`frontend/src/pages/serviceManager/Mechanics.jsx`**: Roster of active workshop technicians.
