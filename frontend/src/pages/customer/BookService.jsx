import { useState } from 'react';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { INITIAL_CARS } from '../../data/customerData';

const SERVICES_LIST = [
  'General Service',
  'Oil Change',
  'Brake Service',
  'AC Service',
  'Car Diagnostics',
  'Wheel Alignment',
  'Battery Replacement',
  'Dent & Paint',
];

const CENTERS_LIST = [
  'CarFix Pune – Baner',
  'CarFix Pune – Kharadi',
  'CarFix Pune – Wakad',
  'CarFix Mumbai – Andheri',
  'CarFix Bengaluru – Whitefield',
];

const TIME_SLOTS = ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'];

export default function BookService() {
  const [step, setStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(INITIAL_CARS[0].name);
  const [selectedService, setSelectedService] = useState('General Service');
  const [selectedCenter, setSelectedCenter] = useState('CarFix Pune – Baner');
  const [selectedDate, setSelectedDate] = useState('2026-08-25');
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleConfirmBooking = () => {
    setIsSubmitted(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>
          Book a Service
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Follow 5 quick steps to schedule your car service appointment.
        </p>
      </div>

      {/* STEP INDICATOR */}
      <div className="booking-steps-bar">
        {[
          { num: 1, label: 'Vehicle' },
          { num: 2, label: 'Service' },
          { num: 3, label: 'Center' },
          { num: 4, label: 'Date & Time' },
          { num: 5, label: 'Review' },
        ].map((s) => (
          <div
            key={s.num}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: step >= s.num ? 'var(--primary-dark)' : 'var(--text-secondary)',
              fontWeight: step === s.num ? '700' : '500',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: step >= s.num ? 'var(--primary-accent)' : 'var(--border-color)',
                color: step >= s.num ? 'var(--white)' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: '700',
              }}
            >
              {s.num}
            </div>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {isSubmitted && (
        <div className="form-success-banner" role="status" style={{ padding: '1.75rem' }}>
          <CheckCircle2 size={26} className="success-icon" />
          <div className="success-content">
            <h4 style={{ fontSize: '1.2rem' }}>Booking Request Received!</h4>
            <p style={{ marginTop: '0.4rem', fontSize: '1rem' }}>
              Booking submitted successfully. Backend booking functionality will be connected later.
            </p>
          </div>
        </div>
      )}

      {/* STEP CONTENT CONTAINER */}
      {!isSubmitted && (
        <div
          style={{
            backgroundColor: 'var(--white)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {/* STEP 1: VEHICLE */}
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                Step 1: Select Vehicle
              </h3>
              <div className="cars-grid">
                {INITIAL_CARS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    style={{
                      padding: '1.25rem',
                      borderRadius: '12px',
                      border: selectedVehicle === v.name ? '2px solid var(--primary-accent)' : '1px solid var(--border-color)',
                      backgroundColor: selectedVehicle === v.name ? 'rgba(249, 115, 22, 0.05)' : 'var(--bg-light)',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedVehicle(v.name)}
                  >
                    <strong style={{ fontSize: '1.1rem', color: 'var(--primary-dark)', display: 'block' }}>{v.name}</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Reg: {v.registration}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SERVICE */}
          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                Step 2: Select Service
              </h3>
              <div className="booking-services-grid">
                {SERVICES_LIST.map((srv) => (
                  <button
                    key={srv}
                    type="button"
                    style={{
                      padding: '1rem',
                      borderRadius: '10px',
                      border: selectedService === srv ? '2px solid var(--primary-accent)' : '1px solid var(--border-color)',
                      backgroundColor: selectedService === srv ? 'rgba(249, 115, 22, 0.05)' : 'var(--bg-light)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      color: 'var(--primary-dark)',
                    }}
                    onClick={() => setSelectedService(srv)}
                  >
                    {srv}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: CENTER */}
          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                Step 3: Select Service Center
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {CENTERS_LIST.map((c) => (
                  <button
                    key={c}
                    type="button"
                    style={{
                      padding: '1.1rem 1.25rem',
                      borderRadius: '10px',
                      border: selectedCenter === c ? '2px solid var(--primary-accent)' : '1px solid var(--border-color)',
                      backgroundColor: selectedCenter === c ? 'rgba(249, 115, 22, 0.05)' : 'var(--bg-light)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontWeight: '600',
                      color: 'var(--primary-dark)',
                    }}
                    onClick={() => setSelectedCenter(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: DATE & TIME */}
          {step === 4 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                Step 4: Select Date & Time
              </h3>
              <div className="booking-datetime-grid">

                <div>
                  <label className="form-label" style={{ marginBottom: '0.5rem' }}>Choose Service Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="form-label" style={{ marginBottom: '0.5rem' }}>Choose Preferred Time Slot</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: selectedTime === t ? '2px solid var(--primary-accent)' : '1px solid var(--border-color)',
                          backgroundColor: selectedTime === t ? 'var(--primary-accent)' : 'var(--bg-light)',
                          color: selectedTime === t ? 'var(--white)' : 'var(--primary-dark)',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                        onClick={() => setSelectedTime(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW */}
          {step === 5 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                Step 5: Review & Confirm Booking
              </h3>
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--bg-light)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Selected Vehicle:</span>
                  <strong style={{ color: 'var(--primary-dark)' }}>{selectedVehicle}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Service Type:</span>
                  <strong style={{ color: 'var(--primary-dark)' }}>{selectedService}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Service Center:</span>
                  <strong style={{ color: 'var(--primary-dark)' }}>{selectedCenter}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Date & Time Slot:</span>
                  <strong style={{ color: 'var(--primary-accent)' }}>
                    {selectedDate} at {selectedTime}
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* STEP NAVIGATION BUTTONS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            {step > 1 ? (
              <button type="button" className="btn-card-secondary" onClick={() => setStep((s) => s - 1)}>
                <ArrowLeft size={16} style={{ marginRight: '0.4rem' }} /> Back
              </button>
            ) : <div></div>}

            {step < 5 ? (
              <button type="button" className="btn-card-primary" onClick={() => setStep((s) => s + 1)}>
                Next Step <ArrowRight size={16} style={{ marginLeft: '0.4rem' }} />
              </button>
            ) : (
              <button type="button" className="btn-card-primary" onClick={handleConfirmBooking}>
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
