import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Wrench,
  Tag,
  ChevronDown,
  ArrowRight,
  HelpCircle,
  Map,
} from 'lucide-react';

import ContactForm from '../components/ContactForm';
import './Contact.css';

const FAQS_DATA = [
  {
    question: 'How do I book a service?',
    answer: 'You can explore our services and select a service when the booking system is available.',
  },
  {
    question: 'Can I contact a service center directly?',
    answer: 'Service center contact functionality will be connected when the backend is implemented.',
  },
  {
    question: 'Do you provide emergency roadside assistance?',
    answer: 'This feature is planned for a future version of the CarFix platform.',
  },
  {
    question: 'How can I get pricing information?',
    answer: 'You can visit the Pricing page to explore our sample service packages and starting prices.',
  },
];

export default function Contact() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="contact-page-container">
      {/* SECTION 1 — CONTACT HERO */}
      <section className="contact-hero">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Contact</span>
        </nav>
        <h1 className="contact-hero-title">We're Here to Help</h1>
        <p className="contact-hero-subtitle">
          Have a question about our services, pricing or your vehicle? Get in touch with the CarFix team.
        </p>
      </section>

      {/* SECTION 2 & 3 — CONTACT INFORMATION & CONTACT FORM */}
      <section className="contact-main-grid">
        {/* SECTION 2: CONTACT INFORMATION */}
        <div className="contact-info-column">
          <div className="info-card">
            <div className="info-icon-wrapper">
              <MapPin size={24} />
            </div>
            <div className="info-text">
              <h4>Visit Us</h4>
              <p>Pune, Maharashtra, India</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon-wrapper">
              <Phone size={24} />
            </div>
            <div className="info-text">
              <h4>Call Us</h4>
              <p>+91 XXXXX XXXXX</p>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                (Project Placeholder Contact)
              </span>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon-wrapper">
              <Mail size={24} />
            </div>
            <div className="info-text">
              <h4>Email Us</h4>
              <p>support@carfix.example</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon-wrapper">
              <Clock size={24} />
            </div>
            <div className="info-text">
              <h4>Working Hours</h4>
              <p>
                <strong>Monday – Saturday:</strong> 9:00 AM – 8:00 PM
              </p>
              <p>
                <strong>Sunday:</strong> 10:00 AM – 5:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: REUSABLE CONTACT FORM */}
        <div className="contact-form-column">
          <ContactForm />
        </div>
      </section>

      {/* SECTION 6 — SUPPORT OPTIONS */}
      <section className="support-section">
        <div className="section-header">
          <h2>How Can We Help?</h2>
          <p>Explore quick resources and help guides.</p>
        </div>
        <div className="support-grid">
          <div className="support-card">
            <div>
              <div className="support-icon">
                <Wrench size={22} />
              </div>
              <h3 style={{ marginTop: '1rem' }}>Service Questions</h3>
              <p>Need help understanding a car service?</p>
            </div>
            <Link to="/services" className="btn-card-secondary">
              Explore Services
            </Link>
          </div>

          <div className="support-card">
            <div>
              <div className="support-icon">
                <Tag size={22} />
              </div>
              <h3 style={{ marginTop: '1rem' }}>Pricing Questions</h3>
              <p>Want to understand our service packages?</p>
            </div>
            <Link to="/pricing" className="btn-card-secondary">
              View Pricing
            </Link>
          </div>

          <div className="support-card">
            <div>
              <div className="support-icon">
                <MapPin size={22} />
              </div>
              <h3 style={{ marginTop: '1rem' }}>Find a Center</h3>
              <p>Looking for a convenient service center?</p>
            </div>
            <Link to="/centers" className="btn-card-secondary">
              Find a Center
            </Link>
          </div>

          <div className="support-card">
            <div>
              <div className="support-icon">
                <HelpCircle size={22} />
              </div>
              <h3 style={{ marginTop: '1rem' }}>Booking Help</h3>
              <p>Need help with booking your service?</p>
            </div>
            <button
              type="button"
              className="btn-card-secondary"
              onClick={() => alert('Booking assistance guide: Booking features will connect to backend API.')}
            >
              Get Help
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 7 — BUSINESS HOURS */}
      <section className="business-hours-card">
        <div className="hours-header">
          <h2>When You Can Reach Us</h2>
          <span className="status-badge" style={{ fontSize: '0.85rem' }}>
            <span className="status-dot"></span>
            Open Today (9:00 AM – 8:00 PM)
          </span>
        </div>
        <div className="hours-grid">
          <div className="hours-row">
            <span className="day-name">Monday</span>
            <span className="time-val">9:00 AM – 8:00 PM</span>
          </div>
          <div className="hours-row">
            <span className="day-name">Tuesday</span>
            <span className="time-val">9:00 AM – 8:00 PM</span>
          </div>
          <div className="hours-row">
            <span className="day-name">Wednesday</span>
            <span className="time-val">9:00 AM – 8:00 PM</span>
          </div>
          <div className="hours-row">
            <span className="day-name">Thursday</span>
            <span className="time-val">9:00 AM – 8:00 PM</span>
          </div>
          <div className="hours-row">
            <span className="day-name">Friday</span>
            <span className="time-val">9:00 AM – 8:00 PM</span>
          </div>
          <div className="hours-row">
            <span className="day-name">Saturday</span>
            <span className="time-val">9:00 AM – 8:00 PM</span>
          </div>
          <div className="hours-row">
            <span className="day-name" style={{ color: 'var(--primary-accent)' }}>Sunday</span>
            <span className="time-val">10:00 AM – 5:00 PM</span>
          </div>
        </div>
      </section>

      {/* SECTION 8 — MAP PLACEHOLDER */}
      <section className="map-placeholder-section">
        <div className="map-header">
          <h2>Find CarFix</h2>
          <p>Our service network is designed to make professional car care convenient.</p>
        </div>
        <div className="map-mockup-card">
          <div className="map-pins-demo">
            <div className="map-pin-item pin-1">
              <MapPin size={16} color="#F97316" />
              <span>Pune HQ</span>
            </div>
            <div className="map-pin-item pin-2">
              <MapPin size={16} color="#F97316" />
              <span>Mumbai Center</span>
            </div>
            <div className="map-pin-item pin-3">
              <MapPin size={16} color="#F97316" />
              <span>Bengaluru Center</span>
            </div>
          </div>
          <div className="map-badge-soon">
            <Map size={20} color="#F97316" />
            Interactive map coming soon
          </div>
        </div>
      </section>

      {/* SECTION 9 — FAQ ACCORDION */}
      <section className="faq-section">
        <div className="section-header">
          <h2>Common Questions</h2>
          <p>Quick answers to frequently asked contact & service questions.</p>
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
        <h2>Let's Take Better Care of Your Car</h2>
        <p>Explore our services or find a convenient CarFix service center.</p>
        <div className="services-cta-buttons">
          <Link to="/services" className="btn-cta-contact">
            Explore Services
            <ArrowRight size={18} style={{ marginLeft: '0.4rem' }} />
          </Link>
          <Link to="/centers" className="btn-cta-centers">
            Find a Service Center
          </Link>
        </div>
      </section>
    </div>
  );
}
