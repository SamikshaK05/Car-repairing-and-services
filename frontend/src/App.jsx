import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import ServiceCenters from './pages/ServiceCenters';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

import CustomerLayout from './components/customer/CustomerLayout';
import Dashboard from './pages/customer/Dashboard';
import MyCars from './pages/customer/MyCars';
import BookService from './pages/customer/BookService';
import MyBookings from './pages/customer/MyBookings';
import ServiceHistory from './pages/customer/ServiceHistory';
import Invoices from './pages/customer/Invoices';
import Profile from './pages/customer/Profile';

function TermsPlaceholder() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h1>Terms & Conditions</h1>
      <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
        CarFix platform terms and conditions preview document.
      </p>
    </div>
  );
}

function PrivacyPlaceholder() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h1>Privacy Policy</h1>
      <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
        CarFix platform privacy policy preview document.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Application Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="centers" element={<ServiceCenters />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms" element={<TermsPlaceholder />} />
          <Route path="privacy" element={<PrivacyPlaceholder />} />
        </Route>

        {/* Dedicated Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Customer Dashboard Routes */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cars" element={<MyCars />} />
          <Route path="book-service" element={<BookService />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="service-history" element={<ServiceHistory />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
