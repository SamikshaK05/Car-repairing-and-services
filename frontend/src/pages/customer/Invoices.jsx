import { useState } from 'react';
import { FileText, Eye, Download, X } from 'lucide-react';
import { INITIAL_INVOICES } from '../../data/customerData';

export default function Invoices() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [downloadNotice, setDownloadNotice] = useState('');

  const handleDownload = (id) => {
    setDownloadNotice('Invoice download will be connected later.');
    setTimeout(() => setDownloadNotice(''), 4000);
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>
          My Invoices
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          View and download billing invoices for your completed services.
        </p>
      </div>

      {downloadNotice && (
        <div className="pricing-alert-box" style={{ padding: '1rem 1.25rem' }}>
          <FileText size={20} className="alert-icon" />
          <div className="alert-text">
            <p>{downloadNotice}</p>
          </div>
        </div>
      )}

      {/* INVOICES TABLE */}
      <div className="table-responsive-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Vehicle</th>
              <th>Service</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {INITIAL_INVOICES.map((inv) => (
              <tr key={inv.id}>
                <td style={{ fontWeight: '700', color: 'var(--primary-dark)' }}>{inv.id}</td>
                <td>{inv.vehicle}</td>
                <td>{inv.service}</td>
                <td>{inv.date}</td>
                <td style={{ fontWeight: '800' }}>{inv.amount}</td>
                <td>
                  <span className="status-badge" style={{ display: 'inline-flex' }}>
                    <span className="status-dot"></span>
                    {inv.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button
                      type="button"
                      className="btn-card-secondary"
                      onClick={() => setSelectedInvoice(inv)}
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.82rem' }}
                    >
                      <Eye size={14} style={{ marginRight: '0.2rem' }} /> View
                    </button>
                    <button
                      type="button"
                      className="btn-card-secondary"
                      onClick={() => handleDownload(inv.id)}
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.82rem' }}
                    >
                      <Download size={14} style={{ marginRight: '0.2rem' }} /> Download
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* INVOICE PREVIEW MODAL */}
      {selectedInvoice && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth: '550px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Invoice Preview ({selectedInvoice.id})</h3>
              <button type="button" className="modal-close-btn" onClick={() => setSelectedInvoice(null)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', backgroundColor: 'var(--bg-light)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Billed To:</span>
                <strong>Samiksha</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Vehicle:</span>
                <strong>{selectedInvoice.vehicle}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Service Delivered:</span>
                <strong>{selectedInvoice.service}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Service Location:</span>
                <strong>{selectedInvoice.center}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total Paid Amount:</span>
                <strong style={{ fontSize: '1.2rem', color: 'var(--primary-accent)' }}>{selectedInvoice.amount}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button type="button" className="btn-card-secondary" onClick={() => setSelectedInvoice(null)}>
                Close
              </button>
              <button type="button" className="btn-card-primary" onClick={() => handleDownload(selectedInvoice.id)}>
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
