import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  ShieldCheck,
  FileText,
  Smartphone,
  Award,
  CheckCircle2,
  Search,
  Calendar,
  History,
  Headphones,
  ArrowRight,
  Check,
  Users,
} from 'lucide-react';

import aboutHeroImg from '../assets/about-hero.png';
import experienceImg from '../assets/experience-image.png';
import './About.css';

export default function About() {
  return (
    <div className="about-page-container">
      {/* SECTION 1 — ABOUT HERO */}
      <section className="about-hero-section">
        <div className="about-hero-content">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>About Us</span>
          </nav>
          <h1 className="about-hero-title">Your Car. Our Responsibility.</h1>
          <p className="about-hero-subtitle">
            CarFix is a modern car repair and service platform designed to make vehicle maintenance simple, transparent and convenient.
          </p>
        </div>
        <div className="about-hero-visual">
          <img
            src={aboutHeroImg}
            alt="CarFix Professional Service"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </section>

      {/* SECTION 2 — WHO WE ARE */}
      <section className="who-we-are-section">
        <div className="who-we-are-visual">
          <img
            src={experienceImg}
            alt="Complete Car Care"
            className="who-we-are-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        <div className="who-we-are-content">
          <span className="badge-platform">
            <ShieldCheck size={14} />
            Trusted Car Care Platform
          </span>
          <h2>Complete Car Care, Made Simple</h2>
          <p>
            At CarFix, we believe maintaining your vehicle should not be complicated. Our platform connects customers with professional automotive services, helping them find the right service, understand their options and keep their vehicles in better condition.
          </p>
          <div className="who-we-are-points">
            <div className="who-point-item">
              <Check size={18} /> Professional service
            </div>
            <div className="who-point-item">
              <Check size={18} /> Transparent communication
            </div>
            <div className="who-point-item">
              <Check size={18} /> Quality-focused maintenance
            </div>
            <div className="who-point-item">
              <Check size={18} /> Customer-first experience
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — MISSION & VISION */}
      <section className="mission-vision-section">
        <div className="mission-vision-grid">
          <div className="mv-card">
            <div className="mv-icon">
              <Target size={28} />
            </div>
            <h3>Our Mission</h3>
            <p>
              To make reliable vehicle maintenance accessible, convenient and transparent for every car owner.
            </p>
          </div>

          <div className="mv-card">
            <div className="mv-icon">
              <Eye size={28} />
            </div>
            <h3>Our Vision</h3>
            <p>
              To build a trusted digital platform that connects car owners with dependable automotive services.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHY CARFIX */}
      <section className="why-carfix-section">
        <div className="section-header">
          <h2>Why Customers Choose CarFix</h2>
          <p>We focus on making every part of the car service experience simple and reliable.</p>
        </div>
        <div className="why-carfix-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <ShieldCheck size={26} />
            </div>
            <h3>Professional Expertise</h3>
            <p>Connect with experienced automotive professionals.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <FileText size={26} />
            </div>
            <h3>Transparent Service</h3>
            <p>Understand the service before you approve the work.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Smartphone size={26} />
            </div>
            <h3>Convenient Experience</h3>
            <p>Find services and manage your vehicle care from one platform.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Award size={26} />
            </div>
            <h3>Quality Focus</h3>
            <p>Prioritize reliable service processes and quality-focused maintenance.</p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — CARFIX NUMBERS */}
      <section className="numbers-section">
        <div className="numbers-header">
          <h2>CarFix by the Numbers</h2>
          <p>Demonstration metrics highlighting our commitment to quality service.</p>
        </div>
        <div className="numbers-grid">
          <div className="number-card">
            <span className="number-val">5,000+</span>
            <span className="number-lbl">Cars Serviced</span>
          </div>
          <div className="number-card">
            <span className="number-val">25+</span>
            <span className="number-lbl">Professional Mechanics</span>
          </div>
          <div className="number-card">
            <span className="number-val">10+</span>
            <span className="number-lbl">Service Categories</span>
          </div>
          <div className="number-card">
            <span className="number-val">98%</span>
            <span className="number-lbl">Customer Satisfaction</span>
          </div>
        </div>
        <p className="numbers-disclaimer">
          *Demonstration values for frontend project preview.
        </p>
      </section>

      {/* SECTION 6 — OUR SERVICE PROMISE */}
      <section className="promise-section">
        <div className="section-header">
          <h2>Our Service Promise</h2>
          <p>Guiding principles that define how we serve our customers.</p>
        </div>
        <div className="promise-grid">
          <div className="promise-card">
            <span className="promise-num">01</span>
            <h3>Listen First</h3>
            <p>Understand the customer's vehicle concerns before recommending a service.</p>
          </div>

          <div className="promise-card">
            <span className="promise-num">02</span>
            <h3>Explain Clearly</h3>
            <p>Make service recommendations and pricing easy to understand.</p>
          </div>

          <div className="promise-card">
            <span className="promise-num">03</span>
            <h3>Serve Professionally</h3>
            <p>Focus on reliable service and a smooth customer experience.</p>
          </div>
        </div>
      </section>

      {/* SECTION 7 — TEAM / PROFESSIONALS */}
      <section className="team-section">
        <div className="section-header">
          <h2>People Behind the Service</h2>
          <p>Sample project team profiles powering our car care platform.</p>
        </div>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-avatar">AM</div>
            <div className="team-info">
              <h3>Alex Morgan</h3>
              <span className="team-role">Lead Automotive Specialist</span>
              <p className="team-bio">
                Specializing in vehicle diagnostics and complex engine performance optimization.
              </p>
            </div>
          </div>

          <div className="team-card">
            <div className="team-avatar">PS</div>
            <div className="team-info">
              <h3>Priya Shah</h3>
              <span className="team-role">Service Advisor</span>
              <p className="team-bio">
                Ensuring transparent communication and smooth customer experiences from start to finish.
              </p>
            </div>
          </div>

          <div className="team-card">
            <div className="team-avatar">DT</div>
            <div className="team-info">
              <h3>Daniel Thomas</h3>
              <span className="team-role">Diagnostics Specialist</span>
              <p className="team-bio">
                Expert in computer diagnostics and electrical systems for modern vehicles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — CUSTOMER EXPERIENCE */}
      <section className="cx-section">
        <div className="section-header">
          <h2>Built Around Your Convenience</h2>
          <p>Designed to provide clarity and peace of mind at every step.</p>
        </div>
        <div className="cx-grid">
          <div className="cx-card">
            <div className="cx-icon">
              <Search size={22} />
            </div>
            <h4>Easy Service Discovery</h4>
          </div>

          <div className="cx-card">
            <div className="cx-icon">
              <FileText size={22} />
            </div>
            <h4>Clear Service Information</h4>
          </div>

          <div className="cx-card">
            <div className="cx-icon">
              <Calendar size={22} />
            </div>
            <h4>Convenient Booking Flow</h4>
          </div>

          <div className="cx-card">
            <div className="cx-icon">
              <History size={22} />
            </div>
            <h4>Service History</h4>
          </div>

          <div className="cx-card">
            <div className="cx-icon">
              <Headphones size={22} />
            </div>
            <h4>Customer-Focused Support</h4>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section className="services-cta-card">
        <h2>Ready to Take Better Care of Your Car?</h2>
        <p>Explore our services and find the right care for your vehicle.</p>
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
