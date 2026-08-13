import apiClient from './client.js';

// @desc    Get all invoices (supports optional user, paymentStatus, booking query parameters)
// @endpoint GET /api/invoices
export const getInvoices = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiClient.get(`/invoices${query ? `?${query}` : ''}`);
};

// @desc    Get single invoice details by ID
// @endpoint GET /api/invoices/:id
export const getInvoiceById = async (id) => {
  return apiClient.get(`/invoices/${id}`);
};

// @desc    Create new invoice from completed booking (Admin / Service Manager)
// @endpoint POST /api/invoices
export const createInvoice = async (invoiceData) => {
  return apiClient.post('/invoices', invoiceData);
};

// @desc    Update invoice payment method (Admin / Service Manager)
// @endpoint PUT /api/invoices/:id
export const updateInvoice = async (id, invoiceData) => {
  return apiClient.put(`/invoices/${id}`, invoiceData);
};

// @desc    Update invoice payment status (Admin / Service Manager)
// @endpoint PATCH /api/invoices/:id/payment-status
export const updatePaymentStatus = async (id, paymentStatus) => {
  return apiClient.patch(`/invoices/${id}/payment-status`, { paymentStatus });
};
