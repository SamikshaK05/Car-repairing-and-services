import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  ChevronDown,
  Info,
  Car,
  Wrench,
  Package as PackageIcon,
  Sliders,
  ArrowRight,
} from 'lucide-react';

import './Pricing.css';

const FAQS_DATA = [
  {
    question: 'Are these prices final?',
    answer: 'No. The displayed amounts are starting prices for demonstration. Final pricing depends on the vehicle, service and parts required.',
  },
  {
    question: 'Can I book an individual service?',
    answer: 'Yes. You can explore individual services from the Services page.',
  },
  {
    question: 'Does the package include replacement parts?',
    answer: 'Package inclusions may vary depending on the vehicle and required work. Any additional parts or repairs should be communicated before service.',
  },
  {
    question: 'Can I choose a service center?',
    answer: 'Yes. Customers can select a convenient service center during the future booking process.',
  },
  {
    question: 'Can I cancel a booking?',
    answer: 'Booking and cancellation policies will be implemented when the booking system is connected to the backend.',
  },
];

const COMPARISON_ROWS = [
  { name: 'Vehicle Inspection', basic: true, standard: true, premium: true },
  { name: 'Fluid Check', basic: true, standard: true, premium: true },
  { name: 'Brake Inspection', basic: true, standard: true, premium: true },
  { name: 'Tyre Inspection', basic: true, standard: true, premium: true },
  { name: 'Basic Diagnostics', basic: true, standard: true, premium: true },
  { name: 'Oil Change', basic: false, standard: true, premium: true },
  { name: 'Battery Inspection', basic: false, standard: true, premium: true },
  { name: 'AC Inspection', basic: false, standard: true, premium: true },
  { name: 'Wheel Alignment', basic: false, standard: false, premium: true },
  { name: 'Full Diagnostics', basic: false, standard: false, premium: true },
  { name: 'Suspension Inspection', basic: false, standard: false, premium: true },
  { name: 'Detailed Inspection', basic: false, standard: false, premium: true },
];

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('packages'); // 'packages' | 'individual'
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="pricing-page-container">
      {/* SECTION 1 — PRICING HERO */}
      <section className="pricing-hero">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Pricing</span>
        </nav>
        <h1 className="pricing-hero-title">Simple & Transparent Pricing</h1>
        <p className="pricing-hero-subtitle">
          Choose a service package that fits your vehicle's needs. Final pricing may vary depending on your vehicle model and required repairs.
        </p>
      </section>

      {/* SECTION 2 — PRICING TOGGLE */}
      <section className="toggle-container">
        <div className="toggle-switch-wrapper">
          <button
            type="button"
            className={`toggle-btn ${activeTab === 'packages' ? 'active' : ''}`}
            onClick={() => setActiveTab('packages')}
          >
            Service Packages
          </button>
          <button
            type="button"
            className={`toggle-btn ${activeTab === 'individual' ? 'active' : ''}`}
            onClick={() => setActiveTab('individual')}
          >
            Individual Services
          </button>
        </div>
      </section>

      {/* SECTION 3 & 4 — PRICING CARDS OR INDIVIDUAL SERVICES VIEW */}
      {activeTab === 'packages' ? (
        <section className="pricing-cards-grid">
          {/* PACKAGE 1: BASIC CARE */}
          <div className="pricing-card">
            <div className="card-header-info">
              <h3 className="package-name">Basic Care</h3>
              <p className="package-desc">
                Essential maintenance checks for keeping your vehicle in good condition.
              </p>
              <div className="price-wrapper">
                <span className="starting-label">Starting from</span>
                <span className="price-val">₹999+</span>
              </div>
            </div>

            <ul className="package-features">
              <li className="feature-item">
                <Check size={18} className="feature-icon" /> Basic vehicle inspection
              </li>
              <li className="feature-item">
                <Check size={18} className="feature-icon" /> Fluid level check
              </li>
              <li className="feature-item">
                <Check size={18} className="feature-icon" /> Brake inspection
              </li>
              <li className="feature-item">
                <Check size={18} className="feature-icon" /> Tyre inspection
              </li>
              <li className="feature-item">
                <Check size={18} className="feature-icon" /> Basic diagnostics
              </li>
            </ul>

            <Link to="/login" className="btn-card-package">
              Choose Basic
            </Link>
          </div>

          {/* PACKAGE 2: STANDARD CARE */}
          <div className="pricing-card">
            <div className="card-header-info">
              <h3 className="package-name">Standard Care</h3>
              <p className="package-desc">
                A balanced maintenance package for regular vehicle servicing.
              </p>
              <div className="price-wrapper">
                <span className="starting-label">Starting from</span>
                <span className="price-val">₹1,999+</span>
              </div>
            </div>

            <ul className="package-features">
              <li className="feature-item includes-all">Everything in Basic Care, plus:</li>
              <li className="feature-item">
                <Check size={18} className="feature-icon" /> Engine oil change
              </li>
              <li className="feature-item">
                <Check size={18} className="feature-icon" /> Oil filter check/replacement
              </li>
              <li className="feature-item">
                <Check size={18} className="feature-icon" /> Battery inspection
              </li>
              <li className="feature-item">
                <Check size={18} className="feature-icon" /> AC inspection
              </li>
              <li className="feature-item">
                <Check size={18} className="feature-icon" /> Wheel inspection
              </li>
            </ul>

            <Link to="/login" className="btn-card-package">
              Choose Standard
            </Link>
          </div>

          {/* PACKAGE 3: PREMIUM CARE */}
          <div className="pricing-card premium-card">
            <span className="popular-badge">Most Popular</span>
            <div className="card-header-info">
              <h3 className="package-name">Premium Care</h3>
              <p className="package-desc">
                Comprehensive vehicle care for customers who want a detailed inspection and maintenance experience.
              </p>
              <div className="price-wrapper">
                <span className="starting-label">Starting from</span>
                <span className="price-val">₹3,499+</span>
              </div>
            </div>

            <ul className="package-features">
              <li className="feature-item includes-all">Everything in Standard Care, plus:</li>
              <li className="feature-item">
                <Check size={18} className="feature-icon" /> Full vehicle diagnostics
              </li>
              <li className="feature-item">
                <Check size={18} className="feature-icon" /> AC system inspection
              </li>
              <li className="feature-item">
                <Check size={18} className="feature-icon" /> Wheel alignment
              </li>
              <li className="feature-item">
                <Check size={18} className="feature-icon" /> Suspension inspection
              </li>
              <li className="feature-item">
                <Check size={18} className="feature-icon" /> Detailed vehicle inspection
              </li>
            </ul>

            <Link to="/login" className="btn-card-package primary">
              Choose Premium
            </Link>
          </div>
        </section>
      ) : (
        <section className="individual-view-banner">
          <h3>Individual Repairs & Standalone Maintenance</h3>
          <p>
            Looking for standalone oil changes, brake repairs, diagnostics, or detailing? You can browse our full catalog of 12 individual services with starting prices on the Services page.
          </p>
          <Link to="/services" className="hero-cta-primary">
            Explore All 12 Individual Services
            <ArrowRight size={18} />
          </Link>
        </section>
      )}

      {/* SECTION 5 — PACKAGE COMPARISON TABLE */}
      {activeTab === 'packages' && (
        <section className="comparison-section">
          <div className="section-header">
            <h2>Compare Our Packages</h2>
            <p>Detailed feature breakdown across all 3 service plans.</p>
          </div>
          <div className="table-responsive-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Basic</th>
                  <th>Standard</th>
                  <th>Premium</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx}>
                    <td className="feature-name">{row.name}</td>
                    <td>
                      {row.basic ? (
                        <span className="check-mark">
                          <Check size={18} />
                        </span>
                      ) : (
                        <span className="dash-mark">—</span>
                      )}
                    </td>
                    <td>
                      {row.standard ? (
                        <span className="check-mark">
                          <Check size={18} />
                        </span>
                      ) : (
                        <span className="dash-mark">—</span>
                      )}
                    </td>
                    <td>
                      {row.premium ? (
                        <span className="check-mark">
                          <Check size={18} />
                        </span>
                      ) : (
                        <span className="dash-mark">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* SECTION 6 — INDIVIDUAL SERVICE NOTE */}
      <section className="individual-note-card">
        <div className="note-text-content">
          <h3>Need a Specific Service?</h3>
          <p>Looking for a single repair or maintenance service instead of a package? Explore our complete list of services.</p>
        </div>
        <Link to="/services" className="hero-cta-secondary" style={{ whiteSpace: 'nowrap' }}>
          Explore All Services
        </Link>
      </section>

      {/* SECTION 7 — WHAT AFFECTS FINAL PRICE */}
      <section className="why-carfix-section">
        <div className="section-header">
          <h2>What Determines the Final Price?</h2>
          <p>Key factors that influence final service estimates.</p>
        </div>
        <div className="why-carfix-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Car size={26} />
            </div>
            <h3>Vehicle Model</h3>
            <p>Different vehicle models may require different parts and procedures.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Wrench size={26} />
            </div>
            <h3>Service Required</h3>
            <p>The final cost depends on the specific service or repair required.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <PackageIcon size={26} />
            </div>
            <h3>Parts Required</h3>
            <p>Replacement parts can affect the total service cost.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Sliders size={26} />
            </div>
            <h3>Repair Complexity</h3>
            <p>Complex repairs may require additional labor and diagnostics.</p>
          </div>
        </div>
      </section>

      {/* SECTION 8 — IMPORTANT PRICING NOTE (ALERT) */}
      <section className="pricing-alert-box">
        <Info size={22} className="alert-icon" />
        <div className="alert-text">
          <p>
            <strong>Pricing Note:</strong> Pricing shown on this page is for demonstration and starting-price purposes. Final service costs may vary after vehicle inspection and depending on parts, labor and repair requirements.
          </p>
        </div>
      </section>

      {/* SECTION 9 — FAQ */}
      <section className="faq-section">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Answers to common questions about our service pricing and policies.</p>
        </div>
        <div className="faq-list">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button type="button" className="faq-question" onClick={() => toggleFaq(idx)}>
                  <span>{faq.question}</span>
                  <ChevronDown size={20} className="faq-icon-toggle" />
                </button>
                {isOpen && <div className="faq-answer">{faq.answer}</div>}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 10 — FINAL CTA */}
      <section className="services-cta-card">
        <h2>Not Sure Which Package You Need?</h2>
        <p>Explore our services or contact us to find the right option for your vehicle.</p>
        <div className="services-cta-buttons">
          <Link to="/services" className="btn-cta-contact">
            Explore Services
            <ArrowRight size={18} style={{ marginLeft: '0.4rem' }} />
          </Link>
          <Link to="/contact" className="btn-cta-centers">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
