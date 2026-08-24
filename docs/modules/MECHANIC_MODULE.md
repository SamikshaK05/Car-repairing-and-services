# Mechanic Portal Module (`feature/mechanic-module`)

## Module Overview
The Mechanic Portal module provides active technicians with a dedicated dashboard to view assigned service appointments, inspect customer vehicle details, and update job progress (e.g. `IN_PROGRESS` -> `COMPLETED`).

---

## Technical Specifications

### Controllers & Business Logic
- **`backend/src/controllers/mechanicController.js`**:
  - `getAssignedJobs`: Retrieves bookings assigned to the logged-in mechanic (`mechanicId === req.user._id`).
  - `updateJobStatus`: Advances service lifecycle stage and verifies mechanic authorization.

### Frontend Integration
- **`frontend/src/pages/mechanic/Dashboard.jsx`**: Real-time stats of assigned jobs, active repairs, and completed tasks.
- **`frontend/src/pages/mechanic/Jobs.jsx`**: Tabular list of assigned bookings with status filter.
- **`frontend/src/pages/mechanic/JobDetails.jsx`**: Detailed view of customer vehicle, service checklist, and status transition control.
- **`frontend/src/api/mechanic.api.js`**: API integration wrapper for mechanic endpoints.
