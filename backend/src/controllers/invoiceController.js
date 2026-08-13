import mongoose from 'mongoose';
import Invoice from '../models/Invoice.js';
import Booking from '../models/Booking.js';

// Helper function to populate references
const populateInvoice = (query) => {
  return query
    .populate('user', 'name email phone')
    .populate('vehicle', 'make model registrationNumber')
    .populate('booking', 'bookingDate bookingTime status');
};

// Helper function to generate unique invoice number
const generateInvoiceNumber = () => {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `CARFIX-${year}-${randomDigits}`;
};

// @desc    Get all invoices (enforces CUSTOMER ownership)
// @route   GET /api/invoices
export const getInvoices = async (req, res) => {
  try {
    const { user, paymentStatus, booking } = req.query;
    const filter = {};

    if (req.user && req.user.role === 'CUSTOMER') {
      filter.user = req.user._id;
    } else if (user) {
      if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID',
        });
      }
      filter.user = user;
    }

    if (booking) {
      if (!mongoose.Types.ObjectId.isValid(booking)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid booking ID',
        });
      }
      filter.booking = booking;
    }

    if (paymentStatus) {
      filter.paymentStatus = paymentStatus;
    }

    const invoices = await populateInvoice(Invoice.find(filter).sort({ issuedAt: -1 }));

    return res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    console.error('Error in getInvoices:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Get invoice by ID (enforces CUSTOMER ownership)
// @route   GET /api/invoices/:id
export const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid invoice ID',
      });
    }

    const invoice = await populateInvoice(Invoice.findById(id));

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found',
      });
    }

    // Ownership check for CUSTOMER role
    if (req.user && req.user.role === 'CUSTOMER') {
      if (invoice.user._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this invoice',
        });
      }
    }

    return res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    console.error('Error in getInvoiceById:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Create new invoice from completed booking
// @route   POST /api/invoices
export const createInvoice = async (req, res) => {
  try {
    const { booking, tax, paymentMethod } = req.body;

    if (!booking || !mongoose.Types.ObjectId.isValid(booking)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID',
      });
    }

    // 1. Verify Booking exists
    const bookingDoc = await Booking.findById(booking).populate('service');
    if (!bookingDoc) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // 2. Verify Booking is COMPLETED
    if (bookingDoc.status !== 'COMPLETED') {
      return res.status(400).json({
        success: false,
        message: 'Invoice can only be created for completed bookings',
      });
    }

    // 3. Check for existing invoice for this booking
    const existingInvoice = await Invoice.findOne({ booking });
    if (existingInvoice) {
      return res.status(409).json({
        success: false,
        message: 'Invoice already exists for this booking',
      });
    }

    // Validate payment method if supplied
    const allowedMethods = ['CASH', 'CARD', 'UPI', 'RAZORPAY', 'OTHER'];
    if (paymentMethod && !allowedMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment method',
      });
    }

    // Derive service item
    const serviceName = bookingDoc.service ? bookingDoc.service.name : 'Car Repair Service';
    const itemPrice = bookingDoc.service ? bookingDoc.service.price : bookingDoc.amount || 0;

    const items = [
      {
        serviceName,
        quantity: 1,
        price: itemPrice,
        amount: itemPrice,
      },
    ];

    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);

    // Calculate tax: treats tax input as percentage (e.g. 18 = 18%) and computes monetary tax amount
    const taxRate = typeof tax === 'number' && tax >= 0 ? tax : 0;
    const taxAmount = Math.round(((subtotal * taxRate) / 100) * 100) / 100;
    const total = subtotal + taxAmount;

    // Generate unique invoice number
    let invoiceNumber = generateInvoiceNumber();
    let numConflict = await Invoice.findOne({ invoiceNumber });
    while (numConflict) {
      invoiceNumber = generateInvoiceNumber();
      numConflict = await Invoice.findOne({ invoiceNumber });
    }

    const newInvoice = await Invoice.create({
      invoiceNumber,
      booking,
      user: bookingDoc.user,
      vehicle: bookingDoc.vehicle,
      items,
      subtotal,
      tax: taxAmount,
      total,
      paymentStatus: 'PENDING',
      paymentMethod: paymentMethod || 'CASH',
      issuedAt: new Date(),
    });

    const populatedInvoice = await populateInvoice(Invoice.findById(newInvoice._id));

    return res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      data: populatedInvoice,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Invoice already exists for this booking',
      });
    }
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    console.error('Error in createInvoice:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Update invoice (paymentMethod only)
// @route   PUT /api/invoices/:id
export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid invoice ID',
      });
    }

    const { paymentMethod } = req.body;

    const allowedMethods = ['CASH', 'CARD', 'UPI', 'RAZORPAY', 'OTHER'];
    if (paymentMethod !== undefined && !allowedMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment method',
      });
    }

    const updateData = {};
    if (paymentMethod !== undefined) updateData.paymentMethod = paymentMethod;

    const updatedInvoice = await populateInvoice(
      Invoice.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    );

    if (!updatedInvoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Invoice updated successfully',
      data: updatedInvoice,
    });
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    console.error('Error in updateInvoice:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Update payment status
// @route   PATCH /api/invoices/:id/payment-status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid invoice ID',
      });
    }

    const { paymentStatus } = req.body;

    const allowedStatuses = ['PENDING', 'PAID', 'FAILED', 'REFUNDED'];
    if (!paymentStatus || !allowedStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment status',
      });
    }

    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found',
      });
    }

    invoice.paymentStatus = paymentStatus;
    await invoice.save();

    const populatedInvoice = await populateInvoice(Invoice.findById(invoice._id));

    return res.status(200).json({
      success: true,
      message: 'Payment status updated successfully',
      data: populatedInvoice,
    });
  } catch (error) {
    console.error('Error in updatePaymentStatus:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
