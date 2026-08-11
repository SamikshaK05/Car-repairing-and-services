import { useState } from 'react';
import { Car, Plus, Trash2, Edit3, Eye, X, CheckCircle2 } from 'lucide-react';
import { INITIAL_CARS } from '../../data/customerData';

export default function MyCars() {
  const [cars, setCars] = useState(INITIAL_CARS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCar, setNewCar] = useState({
    brand: '',
    model: '',
    registration: '',
    fuel: 'Petrol',
    year: '2024',
  });
  const [successMsg, setSuccessMsg] = useState('');

  const handleAddCarSubmit = (e) => {
    e.preventDefault();
    if (!newCar.brand || !newCar.model || !newCar.registration) return;

    const carObj = {
      id: `car-${Date.now()}`,
      brand: newCar.brand,
      model: newCar.model,
      name: `${newCar.brand} ${newCar.model}`,
      registration: newCar.registration.toUpperCase(),
      fuel: newCar.fuel,
      year: newCar.year,
      lastService: 'Not serviced yet',
      nextService: 'Recommended',
    };

    setCars((prev) => [...prev, carObj]);
    setSuccessMsg(`Vehicle "${carObj.name}" added successfully.`);
    setShowAddModal(false);
    setNewCar({ brand: '', model: '', registration: '', fuel: 'Petrol', year: '2024' });

    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleRemoveCar = (id) => {
    setCars((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* HEADER BAR */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>
            My Cars
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Manage your registered vehicles and maintenance schedules.
          </p>
        </div>

        <button
          type="button"
          className="btn-card-primary"
          onClick={() => setShowAddModal(true)}
          style={{ padding: '0.75rem 1.25rem' }}
        >
          <Plus size={18} style={{ marginRight: '0.4rem' }} />
          Add New Car
        </button>
      </div>

      {successMsg && (
        <div className="form-success-banner" role="status">
          <CheckCircle2 size={20} className="success-icon" />
          <div className="success-content">
            <p>{successMsg}</p>
          </div>
        </div>
      )}

      {/* CARS GRID */}
      <div className="cars-grid">
        {cars.map((car) => (
          <div
            key={car.id}
            style={{
              backgroundColor: 'var(--white)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div className="info-icon-wrapper">
                  <Car size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary-dark)' }}>{car.name}</h3>
                  <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--primary-accent)' }}>
                    {car.registration}
                  </span>
                </div>
              </div>
              <span className="category-badge maintenance">{car.fuel}</span>
            </div>

            <div className="car-info-grid">

              <div>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.78rem' }}>Manufacturing Year</span>
                <strong>{car.year}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.78rem' }}>Last Service</span>
                <strong>{car.lastService}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.78rem' }}>Next Service</span>
                <strong style={{ color: 'var(--primary-accent)' }}>{car.nextService}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
              <button
                type="button"
                className="btn-card-secondary"
                onClick={() => alert(`View details for ${car.name} (${car.registration})`)}
                style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
              >
                <Eye size={15} style={{ marginRight: '0.3rem' }} /> Details
              </button>

              <button
                type="button"
                className="btn-card-secondary"
                onClick={() => alert(`Edit ${car.name}`)}
                style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
              >
                <Edit3 size={15} style={{ marginRight: '0.3rem' }} /> Edit
              </button>

              <button
                type="button"
                className="btn-card-secondary"
                onClick={() => handleRemoveCar(car.id)}
                style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem', color: '#DC2626' }}
              >
                <Trash2 size={15} style={{ marginRight: '0.3rem' }} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD NEW CAR MODAL */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">Add New Vehicle</h3>
              <button type="button" className="modal-close-btn" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddCarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Car Brand *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Hyundai, Honda, Tata"
                  value={newCar.brand}
                  onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Car Model *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Creta, City, Nexon"
                  value={newCar.model}
                  onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Registration Number *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. MH 12 AB 1234"
                  value={newCar.registration}
                  onChange={(e) => setNewCar({ ...newCar, registration: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Fuel Type</label>
                  <select
                    className="category-select"
                    value={newCar.fuel}
                    onChange={(e) => setNewCar({ ...newCar, fuel: e.target.value })}
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Manufacturing Year</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="2024"
                    value={newCar.year}
                    onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" className="btn-card-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-card-primary">
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
