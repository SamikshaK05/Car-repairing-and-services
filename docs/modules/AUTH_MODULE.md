# Authentication & Security Module (`feature/auth-module`)

## Module Overview
The Authentication & Security module manages user identity, registration, session management, role-based authorization, Google OAuth 2.0 integration, password reset workflows, and JWT security for CarFix.

---

## Technical Specifications

### Controllers & Business Logic
- **`backend/src/controllers/authController.js`**:
  - `registerUser`: Customer registration with bcrypt password hashing (min 6 chars), duplicate email check, and automatic JWT token issuance.
  - `loginUser`: Multi-role credential verification (CUSTOMER, SERVICE_MANAGER, MECHANIC, ADMIN) returning authorization Bearer tokens.
  - `googleAuth`: Google OAuth 2.0 token verification using `google-auth-library` and automatic user lookup/creation.
  - `forgotPassword`: Email token generation for password recovery.
  - `resetPassword`: Secure token validation and password updating.

### Middleware & Protection
- **`backend/src/middleware/authMiddleware.js`**: JWT Bearer token extraction and user payload decoding.
- **`backend/src/middleware/roleMiddleware.js`**: Role-Based Access Control (RBAC) enforcement (`authorizeRoles('ADMIN', 'SERVICE_MANAGER')`).

### Frontend Integration
- **`frontend/src/context/AuthContext.jsx`**: Global React authentication context managing token persistence in `localStorage`, user state, and login/logout functions.
- **`frontend/src/pages/Login.jsx`**: User login interface with Google Single Sign-On button.
- **`frontend/src/pages/Register.jsx`**: User registration form with client-side field validation.
- **`frontend/src/pages/ForgotPassword.jsx` & `ResetPassword.jsx`**: Self-service account recovery pages.
