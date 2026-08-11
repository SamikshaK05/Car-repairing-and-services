import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import './ServiceCard.css';

export default function ServiceCard({ service, onView }) {
  const { name, category, description, startingPrice, duration, icon: IconComponent } = service;

  const getCategoryClass = (cat) => {
    return `category-badge ${cat.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`;
  };

  return (
    <div className="service-card-item">
      <div className="service-card-top">
        <div className="service-card-icon">
          {IconComponent && <IconComponent size={26} />}
        </div>
        <span className={getCategoryClass(category)}>{category}</span>
      </div>

      <div className="service-card-body">
        <h3 className="service-card-title">{name}</h3>
        <p className="service-card-description">{description}</p>
      </div>

      <div className="service-card-meta">
        <div className="service-card-price">
          <span className="price-label">Starting at</span>
          <span className="price-amount">{startingPrice}</span>
        </div>
        <div className="service-card-duration">
          <Clock size={15} />
          <span>{duration}</span>
        </div>
      </div>

      <div className="service-card-actions">
        <button
          type="button"
          className="btn-card-secondary"
          onClick={() => onView && onView(service)}
        >
          View Service
        </button>
        <Link to="/login" className="btn-card-primary">
          Book Service
        </Link>
      </div>
    </div>
  );
}
