/**
 * Review Model
 *
 
 *
 * Each review will have:
 * - productId: Reference to which product this review belongs to
 * - userName: Name of the person who wrote the review
 * - rating: Star rating (1-5)
 * - comment: The review text
 * - createdAt: When the review was written
 */

const mongoose = require('mongoose')

// Define the review schema
const reviewSchema = new mongoose.Schema(
  {
    // Reference to the product this review belongs to
    // This creates a relationship between Review and Product collections
    productId: {
      type: mongoose.Schema.Types.ObjectId, // Special type for MongoDB IDs
      ref: 'Product', // References the Product model
      required: [true, 'Product ID is required']
    },

    // Name of the reviewer
    userName: {
      type: String,
      required: [true, 'User name is required'],
      trim: true
    },

    // Star rating (1 to 5)
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5
    },

    // Review comment/text
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      maxlength: 500
    }
  },
  {
    timestamps: true
  }
)

// Create and export the model
const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
