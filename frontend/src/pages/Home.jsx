import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Tag,
  Clock,
  Wrench,
  Droplets,
  Disc,
  Cpu,
  Wind,
  Gauge,
  ArrowRight,
  Star,
  Check,
} from 'lucide-react';

import heroImg from '../assets/hero-image.png';
import experienceImg from '../assets/experience-image.png';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      {/* SECTION 1 — HERO */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Reliable Car Care, Whenever You Need It.</h1>
          <p className="hero-subtitle">
            Professional car repair, maintenance, diagnostics and vehicle care services you can trust.
          </p>
          <div className="hero-ctas">
            <Link to="/services" className="hero-cta-primary">
              Book a Service
              <ArrowRight size={18} />
            </Link>
            <Link to="/services" className="hero-cta-secondary">
              Explore Services
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src={heroImg}
            alt="CarFix Professional Workshop"
            className="hero-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </section>

      {/* SECTION 2 — TRUST / QUICK STATS */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">5,000+</span>
            <span className="stat-label">Cars Serviced</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">25+</span>
            <span className="stat-label">Professional Mechanics</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">10+</span>
            <span className="stat-label">Service Categories</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">98%</span>
            <span className="stat-label">Customer Satisfaction</span>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHY CHOOSE CARFIX */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose CarFix?</h2>
          <p>Everything your car needs, handled by professionals.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <ShieldCheck size={26} />
            </div>
            <h3>Certified Mechanics</h3>
            <p>Skilled professionals trained to handle a wide range of vehicle problems.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <CheckCircle2 size={26} />
            </div>
            <h3>Genuine Parts</h3>
            <p>We use quality parts and reliable products for your vehicle.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Tag size={26} />
            </div>
            <h3>Transparent Pricing</h3>
            <p>Know what you are paying for before the work begins.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Clock size={26} />
            </div>
            <h3>Fast & Reliable Service</h3>
            <p>Efficient service designed to get you back on the road quickly.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — POPULAR SERVICES */}
      <section className="services-section">
        <div className="section-header">
          <h2>Popular Car Services</h2>
          <p>Professional maintenance and repair services for your vehicle.</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon-header">
              <div className="service-icon">
                <Wrench size={24} />
              </div>
            </div>
            <h3>General Car Service</h3>
            <p>Complete inspection and routine maintenance.</p>
            <Link to="/services" className="service-link">
              Learn More <ArrowRight size={16} />
            </Link>
          </div>

          <div className="service-card">
            <div className="service-icon-header">
              <div className="service-icon">
                <Droplets size={24} />
              </div>
            </div>
            <h3>Oil Change</h3>
            <p>Keep your engine running smoothly with regular oil service.</p>
            <Link to="/services" className="service-link">
              Learn More <ArrowRight size={16} />
            </Link>
          </div>

          <div className="service-card">
            <div className="service-icon-header">
              <div className="service-icon">
                <Disc size={24} />
              </div>
            </div>
            <h3>Brake Service</h3>
            <p>Inspection and repair of brake components.</p>
            <Link to="/services" className="service-link">
              Learn More <ArrowRight size={16} />
            </Link>
          </div>

          <div className="service-card">
            <div className="service-icon-header">
              <div className="service-icon">
                <Cpu size={24} />
              </div>
            </div>
            <h3>Engine Repair</h3>
            <p>Diagnostics and professional engine repair.</p>
            <Link to="/services" className="service-link">
              Learn More <ArrowRight size={16} />
            </Link>
          </div>

          <div className="service-card">
            <div className="service-icon-header">
              <div className="service-icon">
                <Wind size={24} />
              </div>
            </div>
            <h3>AC Service</h3>
            <p>Inspection and maintenance of your vehicle's AC system.</p>
            <Link to="/services" className="service-link">
              Learn More <ArrowRight size={16} />
            </Link>
          </div>

          <div className="service-card">
            <div className="service-icon-header">
              <div className="service-icon">
                <Gauge size={24} />
              </div>
            </div>
            <h3>Car Diagnostics</h3>
            <p>Identify vehicle issues using professional diagnostics.</p>
            <Link to="/services" className="service-link">
              Learn More <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5 — HOW IT WORKS */}
      <section className="steps-section">
        <div className="section-header">
          <h2>How CarFix Works</h2>
          <p>Simple 4-step process for complete peace of mind.</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">01</span>
            <h3>Choose Your Service</h3>
          </div>
          <div className="step-card">
            <span className="step-number">02</span>
            <h3>Select a Convenient Date</h3>
          </div>
          <div className="step-card">
            <span className="step-number">03</span>
            <h3>Bring Your Car</h3>
          </div>
          <div className="step-card">
            <span className="step-number">04</span>
            <h3>Get Back on the Road</h3>
          </div>
        </div>
      </section>

      {/* SECTION 6 — SERVICE EXPERIENCE */}
      <section className="experience-section">
        <div className="experience-visual">
          <img
            src={experienceImg}
            alt="Complete Car Care Experience"
            className="experience-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        <div className="experience-content">
          <h2>Complete Car Care Under One Roof</h2>
          <p>
            CarFix brings maintenance, diagnostics, repairs and vehicle care together in one convenient platform.
            Experience seamless servicing backed by transparency and expertise.
          </p>
          <ul className="experience-list">
            <li className="experience-item">
              <Check size={20} /> Professional inspection
            </li>
            <li className="experience-item">
              <Check size={20} /> Experienced mechanics
            </li>
            <li className="experience-item">
              <Check size={20} /> Quality parts
            </li>
            <li className="experience-item">
              <Check size={20} /> Transparent service process
            </li>
          </ul>
          <div>
            <Link to="/services" className="hero-cta-primary">
              Explore Our Services
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7 — CUSTOMER REVIEWS */}
      <section className="reviews-section">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p>Read real experiences from satisfied car owners.</p>
        </div>
        <div className="reviews-grid">
          <div className="review-card">
            <div className="stars-wrapper">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#F59E0B" />
              ))}
            </div>
            <p className="review-text">
              "Excellent service and transparent pricing. The entire process was simple and professional."
            </p>
            <div className="review-author">
              <span className="author-name">Rahul Sharma</span>
              <span className="author-location">Pune</span>
            </div>
          </div>

          <div className="review-card">
            <div className="stars-wrapper">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#F59E0B" />
              ))}
            </div>
            <p className="review-text">
              "My car was serviced quickly and the team explained everything clearly."
            </p>
            <div className="review-author">
              <span className="author-name">Priya Patil</span>
              <span className="author-location">Pune</span>
            </div>
          </div>

          <div className="review-card">
            <div className="stars-wrapper">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#F59E0B" />
              ))}
            </div>
            <p className="review-text">
              "Very convenient experience. I would definitely use CarFix again."
            </p>
            <div className="review-author">
              <span className="author-name">Aditya Kulkarni</span>
              <span className="author-location">Pune</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FINAL CTA */}
      <section className="final-cta-section">
        <h2>Your Car Deserves Better Care.</h2>
        <p>Book your next service with CarFix and keep your vehicle ready for the road.</p>
        <Link to="/services" className="hero-cta-primary">
          Book a Service
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
