/**
 * Review Controller
 * This file contains all the business logic for review-related operations.
 * Handles getting reviews and adding new reviews for products.
 */

const Review = require('../models/Review')
const Product = require('../models/Product')

//  Get all reviews for a specific product
const getProductReviews = async (req, res) => {
  try {
    // Find reviews for this product, newest first
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
}

//  Add a new review for a product
const addReview = async (req, res) => {
  try {
    const { productId, userName, rating, comment } = req.body

    // Validate required fields
    if (!productId || !userName || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide all required fields: productId, userName, rating, comment'
      })
    }

    // Create new review in database
    const review = await Review.create({
      productId,
      userName,
      rating,
      comment
    })

    // Update product's average rating
    await updateProductRating(productId)

    console.log('New review added:', review)

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: review
    })
  } catch (error) {
    console.log('error in adding review', error)
    console.error('Error adding review:', error)
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not add review'
    })
  }
}

/**
 * Helper function to update product's average rating
 * Called internally after a new review is added
 */
const updateProductRating = async productId => {
  // Get all reviews for this product
  const reviews = await Review.find({ productId })

  if (reviews.length === 0) return

  // Calculate average rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = totalRating / reviews.length

  // Update product with new rating
  await Product.findByIdAndUpdate(productId, {
    rating: Math.round(averageRating * 10) / 10,
    numReviews: reviews.length
  })
}

// Export all controller functions
module.exports = {
  getProductReviews,
  addReview
}
