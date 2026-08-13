import Vehicle from '../models/Vehicle.js';
import Booking from '../models/Booking.js';
import Invoice from '../models/Invoice.js';
import Review from '../models/Review.js';

// @desc    Get customer dashboard data (vehicles, stats, upcoming/recent bookings, invoices, reviews)
// @route   GET /api/customer/dashboard
export const getCustomerDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Parallel database queries for performance
    const [
      vehicles,
      totalVehicles,
      totalBookings,
      pendingBookingsCount,
      upcomingBookingsCount,
      completedBookingsCount,
      cancelledBookingsCount,
      upcomingBookings,
      recentBookings,
      totalInvoicesCount,
      recentInvoices,
      totalReviewsCount,
      recentReviews,
    ] = await Promise.all([
      Vehicle.find({ user: userId })
        .select('make model year registrationNumber fuelType color mileage')
        .sort({ createdAt: -1 })
        .lean(),

      Vehicle.countDocuments({ user: userId }),

      Booking.countDocuments({ user: userId }),

      Booking.countDocuments({ user: userId, status: 'PENDING' }),

      Booking.countDocuments({
        user: userId,
        status: { $in: ['PENDING', 'CONFIRMED', 'IN_PROGRESS'] },
        bookingDate: { $gte: today },
      }),

      Booking.countDocuments({ user: userId, status: 'COMPLETED' }),

      Booking.countDocuments({ user: userId, status: 'CANCELLED' }),

      Booking.find({
        user: userId,
        status: { $in: ['PENDING', 'CONFIRMED', 'IN_PROGRESS'] },
        bookingDate: { $gte: today },
      })
        .sort({ bookingDate: 1, bookingTime: 1 })
        .limit(5)
        .populate('service', 'name price category')
        .populate('serviceCenter', 'name city phone address')
        .populate('vehicle', 'make model registrationNumber')
        .lean(),

      Booking.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('service', 'name price category')
        .populate('serviceCenter', 'name city phone address')
        .populate('vehicle', 'make model registrationNumber')
        .lean(),

      Invoice.countDocuments({ user: userId }),

      Invoice.find({ user: userId })
        .sort({ issuedAt: -1 })
        .limit(5)
        .select('invoiceNumber subtotal tax total paymentStatus paymentMethod issuedAt booking vehicle')
        .populate('vehicle', 'make model registrationNumber')
        .lean(),

      Review.countDocuments({ user: userId }),

      Review.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('serviceCenter', 'name city')
        .lean(),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        user: {
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          phone: req.user.phone,
          avatar: req.user.avatar,
          role: req.user.role,
        },
        stats: {
          totalVehicles,
          totalBookings,
          upcomingBookings: upcomingBookingsCount,
          completedBookings: completedBookingsCount,
          pendingBookings: pendingBookingsCount,
          cancelledBookings: cancelledBookingsCount,
          totalInvoices: totalInvoicesCount,
          totalReviews: totalReviewsCount,
        },
        vehicles,
        upcomingBookings,
        recentBookings,
        recentInvoices,
        recentReviews,
      },
    });
  } catch (error) {
    console.error('Error in getCustomerDashboard:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
