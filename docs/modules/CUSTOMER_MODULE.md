# Customer Portal & Booking Module (`feature/customer-module`)

## Module Overview
The Customer Portal module provides end-to-end vehicle management, interactive service booking, date/slot conflict protection, service history tracking, PDF invoice generation/downloading, and service center review management.

---

## Technical Specifications

### Controllers & Business Logic
- **`backend/src/controllers/customerController.js`**: Customer dashboard metrics (vehicles, bookings, invoices).
- **`backend/src/controllers/vehicleController.js`**: Vehicle CRUD operations linked to customer accounts.
- **`backend/src/controllers/bookingController.js`**: Service appointment creation, validation, and cancellation.
- **`backend/src/controllers/invoiceController.js`**: Invoice data retrieval and PDF document streaming using PDFKit.
- **`backend/src/controllers/reviewController.js`**: Workshop center rating and review submissions.

### Frontend Integration
- **`frontend/src/pages/customer/Dashboard.jsx`**: Customer dashboard showing vehicle quick stats and recent bookings.
- **`frontend/src/pages/customer/Vehicles.jsx`**: Vehicle management interface.
- **`frontend/src/pages/customer/Bookings.jsx`**: Booking history and cancellation management.
- **`frontend/src/pages/customer/Invoices.jsx`**: PDF invoice download and payment status view.
- **`frontend/src/components/BookingModal.jsx`**: Interactive modal for slot selection and service booking.
