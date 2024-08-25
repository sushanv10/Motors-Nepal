const express = require('express');
const router = express.Router();

const authMiddleware = require('../Middleware/authMiddleware');
const auth = require("../Middleware/authMiddleware");
const {
  createBooking,
  getUserBookings,
  cancelBooking,
  updateBooking
} = require('../Controllers/BookingController');
const authorizeRole = require('../Middleware/authorizationMiddleware');

/**
 * @description Create a new booking
 * @route POST /api/bookings
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing the created booking
 */
router.post('/', authMiddleware, createBooking);

/**
 * @description Get all bookings for the logged-in user
 * @route GET /api/bookings
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing the user's bookings
 */
router.get('/', authMiddleware, getUserBookings);

/**
 * @description Update an existing booking
 * @route PUT /api/bookings/:id
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing the updated booking
 */
router.put('/:id', authMiddleware, updateBooking);

/**
 * @description Cancel a booking
 * @route DELETE /api/bookings/:id
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object confirming cancellation
 */
router.delete('/:id', authMiddleware, cancelBooking);

module.exports = router;
