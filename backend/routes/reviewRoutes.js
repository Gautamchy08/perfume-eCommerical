/**
 * Review Routes
 *
 
 *
 * API Endpoints:
 * - GET /api/reviews/:productId    → Get all reviews for a product
 * - POST /api/reviews              → Add a new review
 */

const express = require('express')
const router = express.Router()

const {
  getProductReviews,
  addReview
} = require('../controllers/reviewController')

// Define routes and connect them to controller functions
router.get('/:productId', getProductReviews)
router.post('/addReview', addReview)

module.exports = router
