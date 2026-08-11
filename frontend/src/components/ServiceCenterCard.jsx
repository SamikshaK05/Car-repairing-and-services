import { Link } from 'react-router-dom';
import { MapPin, Star, Clock, Car } from 'lucide-react';
import './ServiceCenterCard.css';

export default function ServiceCenterCard({ center, onViewDetails }) {
  const { name, location, rating, reviews, hours, status, services } = center;

  return (
    <div className="center-card-item">
      <div className="center-card-header">
        <div className="center-icon-wrapper">
          <Car size={24} />
        </div>
        <span className="status-badge">
          <span className="status-dot"></span>
          {status || 'Open Now'}
        </span>
      </div>

      <div className="center-card-body">
        <h3 className="center-card-title">{name}</h3>
        <div className="center-location">
          <MapPin size={15} />
          <span>{location}</span>
        </div>

        <div className="center-meta">
          <div className="center-rating">
            <Star size={15} fill="#F59E0B" />
            <span>{rating}</span>
            <span className="reviews-count">({reviews} reviews)</span>
          </div>
          <div className="center-hours">
            <Clock size={15} />
            <span>{hours}</span>
          </div>
        </div>

        <div className="center-services-wrapper">
          <span className="services-title">Services Offered:</span>
          <div className="services-tags">
            {services.map((srv, idx) => (
              <span key={idx} className="service-tag">
                {srv}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="center-card-actions">
        <button
          type="button"
          className="btn-center-secondary"
          onClick={() => onViewDetails && onViewDetails(center)}
        >
          View Details
        </button>
        <Link to="/login" className="btn-center-primary">
          Book Service
        </Link>
      </div>
    </div>
  );
}
