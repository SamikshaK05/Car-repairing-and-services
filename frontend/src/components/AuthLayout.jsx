import { Link } from 'react-router-dom';
import { Car, ArrowLeft, Check } from 'lucide-react';
import heroImg from '../assets/hero-image.png';
import './AuthLayout.css';

export default function AuthLayout({ children }) {
  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        {/* Left Visual Panel */}
        <div className="auth-visual-panel">
          <img src={heroImg} alt="" className="auth-visual-bg" />
          
          <div className="auth-visual-header">
            <Link to="/" className="auth-brand">
              <Car className="auth-brand-icon" size={32} />
              <span>CarFix</span>
            </Link>
          </div>

          <div className="auth-visual-content">
            <h1 className="auth-visual-title">
              Professional Car Repair & Services
            </h1>
            <p className="auth-visual-sub">
              Manage your vehicle servicing, schedule appointments, and experience transparent automotive care with CarFix.
            </p>
            <ul className="auth-visual-points">
              <li className="auth-visual-point">
                <Check size={18} /> Verified Service Centers
              </li>
              <li className="auth-visual-point">
                <Check size={18} /> Transparent Price Estimates
              </li>
              <li className="auth-visual-point">
                <Check size={18} /> Certified Automotive Mechanics
              </li>
            </ul>
          </div>

          <div className="auth-visual-footer">
            &copy; {new Date().getFullYear()} CarFix. All rights reserved.
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="auth-form-panel">
          <div className="auth-top-nav">
            <Link to="/" className="btn-back-home">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
