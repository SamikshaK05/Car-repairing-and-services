import { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { INITIAL_SERVICE_HISTORY } from '../../data/customerData';

export default function ServiceHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('All Vehicles');
  const [selectedService, setSelectedService] = useState('All Services');

  const filteredHistory = INITIAL_SERVICE_HISTORY.filter((item) => {
    const matchesSearch =
      !searchTerm.trim() ||
      item.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.center.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesVeh = selectedVehicle === 'All Vehicles' || item.vehicle === selectedVehicle;
    const matchesSrv = selectedService === 'All Services' || item.service === selectedService;

    return matchesSearch && matchesVeh && matchesSrv;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>
          Service History
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          View and filter past service records and maintenance details.
        </p>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="search-filter-card">
        <div className="search-filter-grid">

          <div className="input-with-icon">
            <Search size={18} className="input-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by vehicle, service, or center..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="category-select"
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
          >
            <option value="All Vehicles">All Vehicles</option>
            <option value="Hyundai Creta">Hyundai Creta</option>
            <option value="Honda City">Honda City</option>
          </select>

          <select
            className="category-select"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="All Services">All Services</option>
            <option value="General Service">General Service</option>
            <option value="Oil Change">Oil Change</option>
            <option value="AC Service">AC Service</option>
            <option value="Brake Service">Brake Service</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-responsive-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Service</th>
              <th>Date</th>
              <th>Service Center</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((row) => (
                <tr key={row.id}>
                  <td className="feature-name">{row.vehicle}</td>
                  <td>{row.service}</td>
                  <td>{row.date}</td>
                  <td>{row.center}</td>
                  <td style={{ fontWeight: '700' }}>{row.amount}</td>
                  <td>
                    <span className="status-badge" style={{ display: 'inline-flex' }}>
                      <span className="status-dot"></span>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-card-secondary"
                      onClick={() => alert(`Service Record Details for ${row.id} (${row.service})`)}
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.82rem' }}
                    >
                      <Eye size={14} style={{ marginRight: '0.3rem' }} /> Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  No matching service history records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
