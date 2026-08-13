import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Vehicle from '../models/Vehicle.js';
import Service from '../models/Service.js';
import ServiceCenter from '../models/ServiceCenter.js';

// Helper function to populate all references
const populateBooking = (query) => {
  return query
    .populate('user', 'name email phone')
    .populate('vehicle', 'make model registrationNumber')
    .populate('service', 'name category price duration')
    .populate('serviceCenter', 'name city address phone')
    .populate('mechanic', 'name email phone avatar');
};

// Helper function to check if a date is in the past
const isPastDate = (dateVal) => {
  const inputDate = new Date(dateVal);
  if (isNaN(inputDate.getTime())) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkDate = new Date(inputDate);
  checkDate.setHours(0, 0, 0, 0);

  return checkDate < today;
};

// @desc    Get all bookings (enforces CUSTOMER ownership)
// @route   GET /api/bookings
export const getBookings = async (req, res) => {
  try {
    const { user, status, serviceCenter } = req.query;
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

    if (serviceCenter) {
      if (!mongoose.Types.ObjectId.isValid(serviceCenter)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid service center ID',
        });
      }
      filter.serviceCenter = serviceCenter;
    }

    if (status) {
      filter.status = status;
    }

    const bookings = await populateBooking(
      Booking.find(filter).sort({ bookingDate: -1, bookingTime: -1 })
    );

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Error in getBookings:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Get booking by ID (enforces CUSTOMER ownership)
// @route   GET /api/bookings/:id
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID',
      });
    }

    const booking = await populateBooking(Booking.findById(id));

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Ownership check for CUSTOMER role
    if (req.user && req.user.role === 'CUSTOMER') {
      if (booking.user._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this booking',
        });
      }
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error in getBookingById:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Create new booking (forces req.user._id for CUSTOMER role)
// @route   POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const { user: bodyUser, vehicle, service, serviceCenter, bookingDate, bookingTime, notes } =
      req.body;

    // Enforce owner ID based on authenticated user role
    let ownerId;
    if (req.user && req.user.role === 'CUSTOMER') {
      ownerId = req.user._id;
    } else {
      ownerId = bodyUser || (req.user ? req.user._id : null);
    }

    // Validate ObjectIds
    if (!ownerId || !mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }
    if (!vehicle || !mongoose.Types.ObjectId.isValid(vehicle)) {
      return res.status(400).json({ success: false, message: 'Invalid vehicle ID' });
    }
    if (!service || !mongoose.Types.ObjectId.isValid(service)) {
      return res.status(400).json({ success: false, message: 'Invalid service ID' });
    }
    if (!serviceCenter || !mongoose.Types.ObjectId.isValid(serviceCenter)) {
      return res.status(400).json({ success: false, message: 'Invalid service center ID' });
    }

    // 1. Verify User exists
    const userDoc = await User.findById(ownerId);
    if (!userDoc) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // 2. Verify Vehicle exists
    const vehicleDoc = await Vehicle.findById(vehicle);
    if (!vehicleDoc) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    // 3. Verify Service exists
    const serviceDoc = await Service.findById(service);
    if (!serviceDoc) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    // 4. Verify ServiceCenter exists
    const serviceCenterDoc = await ServiceCenter.findById(serviceCenter);
    if (!serviceCenterDoc) {
      return res.status(404).json({ success: false, message: 'Service center not found' });
    }

    // Ownership check: Vehicle must belong to Booking User
    if (vehicleDoc.user.toString() !== ownerId.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle does not belong to this user',
      });
    }

    // Status check: Service must be active
    if (!serviceDoc.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Selected service is not available',
      });
    }

    // Status check: ServiceCenter must be active
    if (!serviceCenterDoc.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Selected service center is not available',
      });
    }

    // Service Availability at ServiceCenter check
    const isServiceOffered = serviceCenterDoc.services.some(
      (sId) => sId.toString() === service.toString()
    );
    if (!isServiceOffered) {
      return res.status(400).json({
        success: false,
        message: 'Selected service is not available at this service center',
      });
    }

    // Date validation
    if (!bookingDate) {
      return res.status(400).json({
        success: false,
        message: 'Booking date is required',
      });
    }
    if (isPastDate(bookingDate)) {
      return res.status(400).json({
        success: false,
        message: 'Booking date cannot be in the past',
      });
    }

    // Time validation
    if (!bookingTime || bookingTime.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Booking time is required',
      });
    }

    // Double booking conflict check
    const targetDate = new Date(bookingDate);
    targetDate.setHours(0, 0, 0, 0);

    const existingConflict = await Booking.findOne({
      serviceCenter,
      bookingDate: targetDate,
      bookingTime: bookingTime.trim(),
      status: { $in: ['PENDING', 'CONFIRMED', 'IN_PROGRESS'] },
    });

    if (existingConflict) {
      return res.status(409).json({
        success: false,
        message: 'This time slot is already booked',
      });
    }

    // Calculate amount using Service price
    const finalAmount = serviceDoc.price;

    const newBooking = await Booking.create({
      user: ownerId,
      vehicle,
      service,
      serviceCenter,
      bookingDate: targetDate,
      bookingTime: bookingTime.trim(),
      status: 'PENDING',
      amount: finalAmount,
      notes: notes ? notes.trim() : null,
    });

    const populatedBooking = await populateBooking(Booking.findById(newBooking._id));

    return res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: populatedBooking,
    });
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    console.error('Error in createBooking:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Update booking (enforces CUSTOMER ownership)
// @route   PUT /api/bookings/:id
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID',
      });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Ownership check for CUSTOMER role
    if (req.user && req.user.role === 'CUSTOMER') {
      if (booking.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to modify this booking',
        });
      }
    }

    const { bookingDate, bookingTime, notes, status } = req.body;

    const allowedStatuses = [
      'PENDING',
      'CONFIRMED',
      'IN_PROGRESS',
      'COMPLETED',
      'CANCELLED',
      'RESCHEDULED',
    ];

    if (status !== undefined && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking status',
      });
    }

    const updateData = {};

    // Validate date & slot conflict if date/time changing
    if (bookingDate !== undefined || bookingTime !== undefined) {
      const newDateVal = bookingDate !== undefined ? bookingDate : booking.bookingDate;
      const newTimeVal = bookingTime !== undefined ? bookingTime.trim() : booking.bookingTime;

      if (bookingDate !== undefined && isPastDate(bookingDate)) {
        return res.status(400).json({
          success: false,
          message: 'Booking date cannot be in the past',
        });
      }

      const targetDate = new Date(newDateVal);
      targetDate.setHours(0, 0, 0, 0);

      const conflict = await Booking.findOne({
        _id: { $ne: id },
        serviceCenter: booking.serviceCenter,
        bookingDate: targetDate,
        bookingTime: newTimeVal,
        status: { $in: ['PENDING', 'CONFIRMED', 'IN_PROGRESS'] },
      });

      if (conflict) {
        return res.status(409).json({
          success: false,
          message: 'This time slot is already booked',
        });
      }

      updateData.bookingDate = targetDate;
      updateData.bookingTime = newTimeVal;
    }

    if (notes !== undefined) updateData.notes = notes ? notes.trim() : null;
    if (status !== undefined) updateData.status = status;

    const updatedBooking = await populateBooking(
      Booking.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    );

    return res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: updatedBooking,
    });
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    console.error('Error in updateBooking:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Cancel booking (enforces CUSTOMER ownership)
// @route   PATCH /api/bookings/:id/cancel
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID',
      });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Ownership check for CUSTOMER role
    if (req.user && req.user.role === 'CUSTOMER') {
      if (booking.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to cancel this booking',
        });
      }
    }

    if (booking.status === 'COMPLETED') {
      return res.status(400).json({
        success: false,
        message: 'Completed booking cannot be cancelled',
      });
    }

    if (booking.status === 'CANCELLED') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled',
      });
    }

    booking.status = 'CANCELLED';
    await booking.save();

    const populatedBooking = await populateBooking(Booking.findById(booking._id));

    return res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: populatedBooking,
    });
  } catch (error) {
    console.error('Error in cancelBooking:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Assign mechanic to booking (Admin / Service Manager only)
// @route   PATCH /api/bookings/:id/assign-mechanic
export const assignMechanic = async (req, res) => {
  try {
    const { id } = req.params;
    const { mechanic } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID',
      });
    }

    if (!mechanic || !mongoose.Types.ObjectId.isValid(mechanic)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid mechanic ID',
      });
    }

    // Verify mechanic User exists and has role MECHANIC
    const mechanicUser = await User.findById(mechanic);
    if (!mechanicUser || mechanicUser.role !== 'MECHANIC') {
      return res.status(400).json({
        success: false,
        message: 'User is not a valid mechanic',
      });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    booking.mechanic = mechanic;
    await booking.save();

    const populatedBooking = await populateBooking(Booking.findById(booking._id));

    return res.status(200).json({
      success: true,
      message: 'Mechanic assigned successfully',
      data: populatedBooking,
    });
  } catch (error) {
    console.error('Error in assignMechanic:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Update booking status (Admin / Service Manager / Assigned Mechanic)
// @route   PATCH /api/bookings/:id/status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID',
      });
    }

    const allowedStatuses = [
      'PENDING',
      'CONFIRMED',
      'IN_PROGRESS',
      'COMPLETED',
      'CANCELLED',
      'RESCHEDULED',
    ];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking status',
      });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Role permission check for MECHANIC
    if (req.user && req.user.role === 'MECHANIC') {
      if (!booking.mechanic || booking.mechanic.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update status for this booking',
        });
      }
    }

    booking.status = status;
    await booking.save();

    const populatedBooking = await populateBooking(Booking.findById(booking._id));

    return res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: populatedBooking,
    });
  } catch (error) {
    console.error('Error in updateBookingStatus:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
