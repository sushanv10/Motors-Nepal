// controllers/bookingController.js

const Booking = require('../Models/BookingModel');
const Bike = require('../Models/BikeModel');


// Create a new booking

const createBooking = async (req, res) => {
  try {
    console.log('User from token:', req.user); // Log the entire user object

    // Adjust condition to check for req.user.id
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Ensure that the user ID is being passed correctly
    console.log('User ID:', req.user.id);

    const { bikeId, startDate, endDate } = req.body;

    // Check if required fields are present
    if (!bikeId || !startDate || !endDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find the bike
    const bike = await Bike.findById(bikeId);
    if (!bike) return res.status(404).json({ message: 'Bike not found' });

    // Calculate rental days and total price
    const rentalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = rentalDays * bike.pricePerDay;

    // Log the new booking details
    console.log('Booking Details:', {
      user: req.user.id,
      bike: bikeId,
      startDate,
      endDate,
      totalPrice
    });

    // Create new booking
    const newBooking = new Booking({
      user: req.user.id, // Use user ID from token
      bike: bikeId,
      startDate,
      endDate,
      totalPrice,
      paymentStatus: 'Pending',
      status: 'Booked'
    });

    await newBooking.save();

    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    console.error('Error in booking creation:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get bookings for a user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('bike');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    booking.status = 'Cancelled';
    await booking.save();

    res.status(200).json({ message: 'Booking cancelled', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a booking
const updateBooking = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }

    // Update the booking details
    booking.startDate = startDate || booking.startDate;
    booking.endDate = endDate || booking.endDate;

    // Recalculate total price if dates were updated
    const bike = await Bike.findById(booking.bike);
    const rentalDays = (new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24);
    booking.totalPrice = rentalDays * bike.pricePerDay;

    await booking.save();

    res.status(200).json({ message: 'Booking updated', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = {
  createBooking,
  getUserBookings,
  cancelBooking,
  updateBooking,
};
