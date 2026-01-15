/**
 * Product Model
 *
 * This file defines the structure (schema) for storing perfume products in MongoDB.
 * Think of a schema like a blueprint that tells MongoDB what data to expect.
 *
 * Each product will have:
 * - name: The perfume name
 * - description: Short description for card, full description for product page
 * - price: Current selling price
 * - oldPrice: Original price (to show discount)
 * - category: Men, Women, or Unisex
 * - sizes: Available bottle sizes (30ml, 50ml, 100ml, etc.)
 * - images: Array of image URLs for the gallery
 * - rating: Average customer rating (1-5 stars)
 * - inStock: Whether the product is available
 */

const mongoose = require('mongoose')

// Define the product schema
const productSchema = new mongoose.Schema(
  {
    // Product name - required field
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true // Removes extra spaces from start/end
    },

    // Short description shown on product cards
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: 150 // Keep it brief for cards
    },

    // Full description shown on product detail page
    fullDescription: {
      type: String,
      required: [true, 'Full description is required']
    },

    // Current selling price
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0
    },

    // Original price (before discount)
    oldPrice: {
      type: Number,
      min: 0
    },

    // Category: Men, Women, or Unisex
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Men', 'Women', 'Unisex'] // Only allow these values
    },

    // Available sizes (array of strings like "30ml", "50ml", "100ml")
    sizes: [
      {
        type: String
      }
    ],

    // Array of image URLs for the product gallery
    images: [
      {
        type: String,
        required: true
      }
    ],

    // Average rating (will be calculated from reviews)
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    // Number of reviews
    numReviews: {
      type: Number,
      default: 0
    },

    // Stock availability
    inStock: {
      type: Boolean,
      default: true
    },

    // Brand name
    brand: {
      type: String,
      required: [true, 'Brand is required']
    }
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true
  }
)

// Create and export the model
// mongoose.model('Product', productSchema) creates a collection called 'products' in MongoDB
const Product = mongoose.model('Product', productSchema)

module.exports = Product
