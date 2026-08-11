import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Droplets,
  Disc,
  Cpu,
  Wind,
  Zap,
  Compass,
  CircleDot,
  Gauge,
  Sliders,
  Sparkles,
  ShieldCheck,
  Zap as ActivityIcon,
  Shield,
  Clock,
  ArrowRight,
} from 'lucide-react';

import ServiceCard from '../components/ServiceCard';
import serviceMattersImg from '../assets/service-matters.png';
import './Services.css';

const SERVICES_DATA = [
  {
    id: 'general-service',
    name: 'General Car Service',
    category: 'Maintenance',
    startingPrice: '₹999',
    duration: '2–3 hours',
    description: 'Complete vehicle inspection and routine maintenance to keep your car running smoothly.',
    icon: Wrench,
  },
  {
    id: 'oil-change',
    name: 'Oil Change',
    category: 'Maintenance',
    startingPrice: '₹799',
    duration: '45–60 minutes',
    description: 'Replace old engine oil and keep your engine lubricated for better performance.',
    icon: Droplets,
  },
  {
    id: 'brake-service',
    name: 'Brake Service',
    category: 'Repair',
    startingPrice: '₹1,499',
    duration: '1–2 hours',
    description: 'Professional brake inspection, maintenance and replacement of worn components.',
    icon: Disc,
  },
  {
    id: 'engine-repair',
    name: 'Engine Repair',
    category: 'Repair',
    startingPrice: '₹2,999',
    duration: '3–6 hours',
    description: 'Professional engine diagnostics and repair for improved vehicle performance.',
    icon: Cpu,
  },
  {
    id: 'ac-service',
    name: 'AC Service',
    category: 'Maintenance',
    startingPrice: '₹1,299',
    duration: '1–2 hours',
    description: "Vehicle AC inspection, cleaning and maintenance for comfortable driving.",
    icon: Wind,
  },
  {
    id: 'battery-replacement',
    name: 'Battery Replacement',
    category: 'Maintenance',
    startingPrice: '₹3,999',
    duration: '30–45 minutes',
    description: 'Battery testing and replacement using suitable batteries for your vehicle.',
    icon: Zap,
  },
  {
    id: 'wheel-alignment',
    name: 'Wheel Alignment',
    category: 'Maintenance',
    startingPrice: '₹699',
    duration: '30–45 minutes',
    description: 'Correct wheel alignment to improve handling, stability and tyre life.',
    icon: Compass,
  },
  {
    id: 'tyre-service',
    name: 'Tyre Service',
    category: 'Maintenance',
    startingPrice: '₹499',
    duration: '30–60 minutes',
    description: 'Tyre inspection, rotation and maintenance for safer driving.',
    icon: CircleDot,
  },
  {
    id: 'car-diagnostics',
    name: 'Car Diagnostics',
    category: 'Diagnostics',
    startingPrice: '₹599',
    duration: '30–60 minutes',
    description: 'Identify vehicle issues using professional diagnostic equipment.',
    icon: Gauge,
  },
  {
    id: 'suspension-repair',
    name: 'Suspension Repair',
    category: 'Repair',
    startingPrice: '₹1,999',
    duration: '2–4 hours',
    description: 'Inspection and repair of suspension components for a smoother ride.',
    icon: Sliders,
  },
  {
    id: 'dent-and-paint',
    name: 'Dent & Paint',
    category: 'Body & Detailing',
    startingPrice: '₹2,499',
    duration: '1–3 days',
    description: 'Professional dent removal and paint restoration for your vehicle.',
    icon: Sparkles,
  },
  {
    id: 'car-detailing',
    name: 'Car Detailing',
    category: 'Body & Detailing',
    startingPrice: '₹1,499',
    duration: '2–4 hours',
    description: "Deep cleaning and detailing to restore your car's interior and exterior appearance.",
    icon: ShieldCheck,
  },
];

const CATEGORIES = ['All Services', 'Maintenance', 'Repair', 'Diagnostics', 'Body & Detailing'];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All Services');
  const [selectedService, setSelectedService] = useState(null);

  const filteredServices =
    activeCategory === 'All Services'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeCategory);

  const handleViewService = (service) => {
    setSelectedService(service);
    // Modal or highlight state if needed
  };

  return (
    <div className="services-page-container">
      {/* SECTION 1 — PAGE HERO */}
      <section className="services-hero">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Services</span>
        </nav>
        <h1 className="services-hero-title">Professional Car Services</h1>
        <p className="services-hero-subtitle">
          From routine maintenance to complex repairs, CarFix provides reliable services to keep your vehicle performing at its best.
        </p>
      </section>

      {/* SECTION 2 — SERVICE CATEGORY FILTER */}
      <section className="filter-container">
        <div className="filter-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 3 & 5 — SERVICE CARDS GRID */}
      <section className="services-grid-container">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} onView={handleViewService} />
          ))
        ) : (
          <div className="no-services-found">No services found in this category.</div>
        )}
      </section>

      {/* SECTION 6 — PROFESSIONAL SERVICE SECTION */}
      <section className="why-pro-section">
        <div className="why-pro-content">
          <h2>Why Professional Car Service Matters</h2>
          <p>
            Regular professional maintenance helps improve vehicle reliability, safety and long-term performance.
            Trusting experts ensures your car receives accurate diagnostics, genuine parts, and precision care.
          </p>
          <div className="why-pro-points">
            <div className="why-pro-point">
              <div className="point-icon">
                <ActivityIcon size={20} />
              </div>
              <div className="point-info">
                <h4>1. Better Vehicle Performance</h4>
                <p>Engine tuning and oil updates keep fuel efficiency optimal and performance sharp.</p>
              </div>
            </div>

            <div className="why-pro-point">
              <div className="point-icon">
                <Shield size={20} />
              </div>
              <div className="point-info">
                <h4>2. Improved Safety</h4>
                <p>Routine brake, suspension, and steering checks minimize accident risks on the road.</p>
              </div>
            </div>

            <div className="why-pro-point">
              <div className="point-icon">
                <Clock size={20} />
              </div>
              <div className="point-info">
                <h4>3. Longer Vehicle Life</h4>
                <p>Preventive maintenance stops minor wear and tear from turning into expensive engine failures.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="why-pro-visual">
          <img
            src={serviceMattersImg}
            alt="Professional Car Service Diagnostics"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </section>

      {/* SECTION 7 — SERVICE PROCESS */}
      <section className="services-process-section">
        <div className="section-header">
          <h2>Simple Service Process</h2>
          <p>4 easy steps to get your car serviced professionally.</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">01</span>
            <h3>Choose Your Service</h3>
          </div>
          <div className="step-card">
            <span className="step-number">02</span>
            <h3>Select a Service Center</h3>
          </div>
          <div className="step-card">
            <span className="step-number">03</span>
            <h3>Schedule Your Visit</h3>
          </div>
          <div className="step-card">
            <span className="step-number">04</span>
            <h3>Get Your Car Serviced</h3>
          </div>
        </div>
      </section>

      {/* SECTION 8 — CTA */}
      <section className="services-cta-card">
        <h2>Not Sure What Your Car Needs?</h2>
        <p>Our professionals can help identify the right service for your vehicle.</p>
        <div className="services-cta-buttons">
          <Link to="/contact" className="btn-cta-contact">
            Contact Us
            <ArrowRight size={18} style={{ marginLeft: '0.4rem' }} />
          </Link>
          <Link to="/centers" className="btn-cta-centers">
            View Service Centers
          </Link>
        </div>
      </section>
    </div>
  );
}
