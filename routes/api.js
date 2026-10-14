const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// In-memory store (replace with a database in production)
const bookings = [];
const newsletterSubscribers = [];

/**
 * POST /api/bookings
 * Create a new booking/appointment request
 */
router.post('/bookings', [
  body('name').trim().notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name must be under 100 characters'),
  body('email').trim().isEmail().withMessage('A valid email is required')
    .normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone number is required')
    .matches(/^[\d\s\-().+]{7,20}$/).withMessage('A valid phone number is required'),
  body('service').trim().notEmpty().withMessage('Please select a service'),
  body('vehicle').trim().notEmpty().withMessage('Vehicle information is required')
    .isLength({ max: 100 }).withMessage('Vehicle info must be under 100 characters'),
  body('message').trim().isLength({ max: 1000 }).withMessage('Message must be under 1000 characters')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please fix the errors below.',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }

  const { name, email, phone, service, vehicle, message } = req.body;

  const booking = {
    id: bookings.length + 1,
    name,
    email,
    phone,
    service,
    vehicle,
    message: message || '',
    createdAt: new Date().toISOString(),
    status: 'pending'
  };

  bookings.push(booking);

  console.log(`📅 New booking #${booking.id}: ${name} - ${service} for ${vehicle}`);

  res.status(201).json({
    success: true,
    message: 'Thank you for your booking request! We will contact you within 24 hours to confirm your appointment.',
    booking: { id: booking.id }
  });
});

/**
 * POST /api/newsletter
 * Subscribe to the newsletter
 */
router.post('/newsletter', [
  body('email').trim().isEmail().withMessage('A valid email is required')
    .normalizeEmail()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }

  const { email } = req.body;

  if (newsletterSubscribers.includes(email)) {
    return res.status(200).json({
      success: true,
      message: 'You are already subscribed! Thank you.'
    });
  }

  newsletterSubscribers.push(email);

  console.log(`📧 Newsletter subscription: ${email}`);

  res.status(201).json({
    success: true,
    message: 'Thank you for subscribing to our newsletter!'
  });
});

/**
 * GET /api/bookings
 * List all bookings (admin endpoint - no auth for demo)
 */
router.get('/bookings', (req, res) => {
  res.json({ bookings, total: bookings.length });
});

/**
 * GET /api/newsletter/count
 * Get subscriber count
 */
router.get('/newsletter/count', (req, res) => {
  res.json({ count: newsletterSubscribers.length });
});

module.exports = router;