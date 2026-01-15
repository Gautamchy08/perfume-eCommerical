/**
 * Review Routes
 *
 * This file defines all the API endpoints for review-related operations.
 *
 * API Endpoints:
 * - GET /api/reviews/:productId    → Get all reviews for a specific product
 * - POST /api/reviews              → Add a new review
 *
 * How it works:
 * 1. When user submits a review, frontend sends data to POST /api/reviews
 * 2. This route saves the review to MongoDB
 * 3. It also updates the product's average rating
 */

const express = require('express')
const router = express.Router()
const Review = require('../models/Review')
const Product = require('../models/Product')

/**
 * @route   GET /api/reviews/:productId
 * @desc    Get all reviews for a specific product
 * @access  Public
 */
router.get('/:productId', async (req, res) => {
  try {
    // Find all reviews that belong to this product
    // .sort({ createdAt: -1 }) means newest reviews first
    const reviews = await Review.find({ productId: req.params.productId }).sort(
      { createdAt: -1 }
    )

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not fetch reviews'
    })
  }
})

/**
 * @route   POST /api/reviews
 * @desc    Add a new review for a product
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    // Get review data from request body
    // Frontend sends: { productId, userName, rating, comment }
    const { productId, userName, rating, comment } = req.body

    // Validate required fields
    if (!productId || !userName || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide all required fields: productId, userName, rating, comment'
      })
    }

    // Create new review
    const review = await Review.create({
      productId,
      userName,
      rating,
      comment
    })

    // Update the product's average rating
    // This is important to keep the product rating up-to-date
    await updateProductRating(productId)

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: review
    })
  } catch (error) {
    console.error('Error adding review:', error)
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not add review'
    })
  }
})

/**
 * Helper function to update product's average rating
 * Called after a new review is added
 */
async function updateProductRating (productId) {
  // Get all reviews for this product
  const reviews = await Review.find({ productId })

  if (reviews.length === 0) {
    return
  }

  // Calculate average rating
  // 1. Sum all ratings
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  // 2. Divide by number of reviews
  const averageRating = totalRating / reviews.length

  // Update the product with new rating and review count
  await Product.findByIdAndUpdate(productId, {
    rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
    numReviews: reviews.length
  })
}

module.exports = router
