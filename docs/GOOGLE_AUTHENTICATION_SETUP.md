# Google OAuth 2.0 Authentication Setup Guide

**Project Name:** Car Repairing and Services (CarFix)  
**Date:** August 21, 2026  
**Document:** Google Authentication Configuration & Deployment Guide  

---

## 1. Architecture & Authentication Flow

CarFix implements Google OAuth 2.0 using the **Google Identity Services (GIS)** ID Token flow. This architecture allows single-click social authentication on the React frontend while performing secure token verification on the Express backend.

```text
┌─────────────────────────┐                                ┌─────────────────────────┐
│     React Frontend      │ ─── 1. User Clicks Login ────► │     Google OAuth 2.0    │
│  (Google Identity SDK)  │ ◄── 2. Returns ID Token ────── │     Identity Server     │
└────────────┬────────────┘                                └─────────────────────────┘
             │
             │ 3. POST /api/auth/google { credential: idToken }
             ▼
┌─────────────────────────┐                                ┌─────────────────────────┐
│   Express Backend API   │ ─── 4. Verify Token Payload ──►│   google-auth-library   │
│  (authController.js)    │ ◄── 5. Extracted Google User ──│   OAuth2Client          │
└────────────┬────────────┘                                └─────────────────────────┘
             │
             │ 6. Find or Create User (Default Role: CUSTOMER)
             │ 7. Generate CarFix JWT Token
             ▼
┌─────────────────────────┐
│   React Frontend Client │ ─── 8. Save JWT in localStorage & Redirect to Dashboard
└─────────────────────────┘
```

---

## 2. Google Cloud Console Setup

To enable Google OAuth 2.0 for CarFix, follow these steps in the [Google Cloud Console](https://console.cloud.google.com/):

### Step A: Create a Project
1. Log in to Google Cloud Console.
2. Click the project dropdown and select **New Project**.
3. Name your project (e.g., `CarFix-Platform`).

### Step B: Configure OAuth Consent Screen
1. Go to **APIs & Services** > **OAuth consent screen**.
2. Select User Type: **External** and click **Create**.
3. Fill in App Details:
   - **App name:** `CarFix Car Repairing & Services`
   - **User support email:** `<your-support-email>`
   - **Developer contact information:** `<your-email>`
4. Scopes: Add `openid`, `email`, and `profile`.
5. Save and continue.

### Step C: Create OAuth 2.0 Credentials
1. Go to **APIs & Services** > **Credentials**.
2. Click **Create Credentials** > **OAuth client ID**.
3. Select Application type: **Web application**.
4. Name: `CarFix Web Client`.
5. **Authorized JavaScript origins:**
   - Local: `http://localhost:5173`
   - Production (Render): `https://carfix-frontend.onrender.com`
6. **Authorized redirect URIs:**
   - Local: `http://localhost:5173`
   - Production: `https://carfix-frontend.onrender.com`
7. Click **Create**.
8. Copy your **Client ID** and **Client Secret**.

---

## 3. Environment Variables Configuration

### Backend (`backend/.env`)

```env
# Google OAuth 2.0 Secrets (Backend ONLY - DO NOT EXPOSE TO FRONTEND)
GOOGLE_CLIENT_ID=your_actual_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
# Frontend API and Public Google Client ID
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_actual_google_client_id.apps.googleusercontent.com
```

> **Security Note:** Never put `GOOGLE_CLIENT_SECRET` in `frontend/.env`. Secrets must remain strictly on the backend.

---

## 4. User Model Integration

Google-authenticated accounts populate the following fields in the `User` schema:
- `googleId`: Unique Google identifier (`payload.sub`).
- `authProvider`: Set to `'google'`.
- `role`: Set to `'CUSTOMER'` by default.
- `avatar`: Profile image URL (`payload.picture`).
- `password` and `phone`: Validation requirements are skipped for Google accounts while remaining strictly enforced for local password registrations.

---

## 5. Automated & Manual Testing Procedure

### Automated Backend Tests
Run the dedicated Google Auth test suite:

```bash
cd backend
node test_google_auth.js
```

Run all 13 regression test suites to verify system integrity:

```bash
node test_password_reset.js; node test_change_password.js; node test_profile_update.js; node test_invoice_download.js; node test_service_booking.js; node test_vehicle_management.js; node test_booking_cancellation.js; node test_service_history.js; node test_customer_dashboard.js; node test_service_centers_and_reviews.js; node test_services_catalog.js; node test_service_manager_portal.js; node test_mechanic_portal.js; node test_google_auth.js
```

### Manual Browser Test
1. Start Backend: `cd backend && npm run dev`
2. Start Frontend: `cd frontend && npm run dev`
3. Navigate to `http://localhost:5173/login` or `http://localhost:5173/register`.
4. Click **"Continue with Google"** button.
5. Complete the Google login popup.
6. Verify automatic redirection to `/customer/dashboard` and JWT storage in `localStorage`.

---

## 6. Troubleshooting & FAQs

- **Error: `Invalid or expired Google token`:** Ensure `GOOGLE_CLIENT_ID` in `backend/.env` matches `VITE_GOOGLE_CLIENT_ID` in `frontend/.env`.
- **Error: `Account has been deactivated`:** If an account's `isActive` flag is `false` in MongoDB, authentication will be rejected with HTTP 403.
- **Origin Mismatch Error in Browser:** Ensure `http://localhost:5173` is listed under Authorized JavaScript Origins in Google Cloud Console.
