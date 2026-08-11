import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Search,
  RotateCcw,
  UserCheck,
  Award,
  FileText,
  ArrowRight,
  Map,
} from 'lucide-react';

import ServiceCenterCard from '../components/ServiceCenterCard';
import './ServiceCenters.css';

const CENTERS_DATA = [
  {
    id: 'pune-baner',
    name: 'CarFix Pune – Baner',
    city: 'Pune',
    location: 'Baner, Pune',
    rating: 4.8,
    reviews: 124,
    hours: '9:00 AM – 8:00 PM',
    status: 'Open Now',
    services: ['General Service', 'Oil Change', 'Brake Service', 'AC Service', 'Car Diagnostics'],
  },
  {
    id: 'pune-kharadi',
    name: 'CarFix Pune – Kharadi',
    city: 'Pune',
    location: 'Kharadi, Pune',
    rating: 4.7,
    reviews: 98,
    hours: '9:00 AM – 8:00 PM',
    status: 'Open Now',
    services: ['General Service', 'Engine Repair', 'Battery Replacement', 'Wheel Alignment', 'Car Diagnostics'],
  },
  {
    id: 'pune-wakad',
    name: 'CarFix Pune – Wakad',
    city: 'Pune',
    location: 'Wakad, Pune',
    rating: 4.6,
    reviews: 87,
    hours: '8:30 AM – 8:00 PM',
    status: 'Open Now',
    services: ['General Service', 'Oil Change', 'Tyre Service', 'AC Service', 'Detailing'],
  },
  {
    id: 'mumbai-andheri',
    name: 'CarFix Mumbai – Andheri',
    city: 'Mumbai',
    location: 'Andheri, Mumbai',
    rating: 4.7,
    reviews: 156,
    hours: '9:00 AM – 9:00 PM',
    status: 'Open Now',
    services: ['General Service', 'Brake Service', 'Engine Repair', 'AC Service', 'Dent & Paint'],
  },
  {
    id: 'bengaluru-whitefield',
    name: 'CarFix Bengaluru – Whitefield',
    city: 'Bengaluru',
    location: 'Whitefield, Bengaluru',
    rating: 4.8,
    reviews: 113,
    hours: '9:00 AM – 8:00 PM',
    status: 'Open Now',
    services: ['General Service', 'Diagnostics', 'Battery Replacement', 'Wheel Alignment', 'Detailing'],
  },
];

const CATEGORIES = ['All Services', 'Maintenance', 'Repair', 'Diagnostics', 'Body & Detailing'];

export default function ServiceCenters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Services');

  const matchesCategory = (centerServices, category) => {
    if (category === 'All Services') return true;

    const maintenanceTags = ['General Service', 'Oil Change', 'AC Service', 'Battery Replacement', 'Wheel Alignment', 'Tyre Service'];
    const repairTags = ['Engine Repair', 'Brake Service', 'Suspension Repair'];
    const diagTags = ['Car Diagnostics', 'Diagnostics'];
    const bodyTags = ['Detailing', 'Dent & Paint'];

    let targetTags = [];
    if (category === 'Maintenance') targetTags = maintenanceTags;
    else if (category === 'Repair') targetTags = repairTags;
    else if (category === 'Diagnostics') targetTags = diagTags;
    else if (category === 'Body & Detailing') targetTags = bodyTags;

    return centerServices.some((srv) => targetTags.includes(srv));
  };

  const matchesSearch = (center, term) => {
    if (!term.trim()) return true;
    const lower = term.toLowerCase();
    return (
      center.name.toLowerCase().includes(lower) ||
      center.city.toLowerCase().includes(lower) ||
      center.location.toLowerCase().includes(lower)
    );
  };

  const filteredCenters = CENTERS_DATA.filter(
    (c) => matchesSearch(c, searchTerm) && matchesCategory(c.services, selectedCategory)
  );

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('All Services');
  };

  return (
    <div className="centers-page-container">
      {/* SECTION 1 — PAGE HERO */}
      <section className="centers-hero">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Service Centers</span>
        </nav>
        <h1 className="centers-hero-title">Find a CarFix Service Center</h1>
        <p className="centers-hero-subtitle">
          Find a convenient service location and get professional care for your vehicle.
        </p>
      </section>

      {/* SECTION 2 — SEARCH & FILTER */}
      <section className="search-filter-card">
        <div className="search-filter-controls">
          <div className="input-with-icon">
            <MapPin size={20} className="input-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by city or location (e.g. Pune, Baner, Mumbai)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button type="button" className="btn-search">
            <Search size={18} />
            Search
          </button>

          <button type="button" className="btn-reset" onClick={handleReset} title="Reset filters">
            <RotateCcw size={18} style={{ marginRight: '0.3rem' }} />
            Reset
          </button>
        </div>

        {/* SECTION 5 — RESULTS COUNTER */}
        <div className="results-meta">
          <span className="results-count">
            {filteredCenters.length} {filteredCenters.length === 1 ? 'service center' : 'service centers'} found
          </span>
          {(searchTerm || selectedCategory !== 'All Services') && (
            <button type="button" className="btn-card-secondary" onClick={handleReset} style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
              Clear Search & Filter
            </button>
          )}
        </div>
      </section>

      {/* SECTION 3 & 5 — SERVICE CENTER GRID */}
      <section className="centers-grid">
        {filteredCenters.length > 0 ? (
          filteredCenters.map((center) => <ServiceCenterCard key={center.id} center={center} />)
        ) : (
          <div className="no-centers-found">
            <h3>No service centers found.</h3>
            <p>Try searching for a different city or location like "Pune", "Mumbai", or "Bengaluru".</p>
            <button type="button" className="btn-search" onClick={handleReset}>
              View All Centers
            </button>
          </div>
        )}
      </section>

      {/* SECTION 6 — MAP PLACEHOLDER */}
      <section className="map-placeholder-section">
        <div className="map-header">
          <h2>Find Us Near You</h2>
          <p>Choose a convenient service center for your vehicle.</p>
        </div>
        <div className="map-mockup-card">
          <div className="map-pins-demo">
            <div className="map-pin-item pin-1">
              <MapPin size={16} color="#F97316" />
              <span>Pune Branches</span>
            </div>
            <div className="map-pin-item pin-2">
              <MapPin size={16} color="#F97316" />
              <span>Mumbai Branch</span>
            </div>
            <div className="map-pin-item pin-3">
              <MapPin size={16} color="#F97316" />
              <span>Bengaluru Branch</span>
            </div>
          </div>
          <div className="map-badge-soon">
            <Map size={20} color="#F97316" />
            Interactive map coming soon
          </div>
        </div>
      </section>

      {/* SECTION 7 — WHY CHOOSE OUR SERVICE CENTERS */}
      <section className="why-centers-section">
        <div className="section-header">
          <h2>Why Choose a CarFix Service Center?</h2>
          <p>Equipped with state-of-the-art diagnostic gear and skilled mechanics.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <UserCheck size={26} />
            </div>
            <h3>Experienced Professionals</h3>
            <p>Certified automotive mechanics trained across multi-brand vehicles.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Award size={26} />
            </div>
            <h3>Quality-Focused Service</h3>
            <p>High quality service processes and genuine replacement parts.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <FileText size={26} />
            </div>
            <h3>Transparent Process</h3>
            <p>Clear inspection reports and upfront price estimation before work begins.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <MapPin size={26} />
            </div>
            <h3>Convenient Locations</h3>
            <p>Easily accessible workshop centers across major cities.</p>
          </div>
        </div>
      </section>

      {/* SECTION 8 — SERVICE CENTER EXPERIENCE */}
      <section className="steps-section">
        <div className="section-header">
          <h2>Simple 3-Step Service</h2>
          <p>Getting your vehicle serviced is hassle-free.</p>
        </div>
        <div className="steps-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="step-card">
            <span className="step-number">01</span>
            <h3>Choose a Center</h3>
          </div>
          <div className="step-card">
            <span className="step-number">02</span>
            <h3>Schedule Your Service</h3>
          </div>
          <div className="step-card">
            <span className="step-number">03</span>
            <h3>Get Your Car Serviced</h3>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section className="services-cta-card">
        <h2>Need Help Choosing a Service?</h2>
        <p>Our team can help you find the right service for your vehicle.</p>
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
