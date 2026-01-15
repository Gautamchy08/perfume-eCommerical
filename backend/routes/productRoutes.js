/**
 * Product Routes
 *
 * This file defines all the API endpoints (URLs) for product-related operations.
 *
 * API Endpoints:
 * - GET /api/products         → Get all products (for homepage)
 * - GET /api/products/:id     → Get single product by ID (for product page)
 * - GET /api/products/category/:category → Get products by category (Men/Women/Unisex)
 *
 * How it works:
 * 1. Frontend makes a request to these URLs
 * 2. These routes handle the request
 * 3. They fetch data from MongoDB using the Product model
 * 4. They send the data back to frontend as JSON
 */

const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public (anyone can access)
 */
router.get('/', async (req, res) => {
  try {
    // Find all products in the database
    // .find({}) with empty object means "find all"
    const products = await Product.find({})

    // Send products back to frontend
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    })
  } catch (error) {
    // If something goes wrong, send error message
    console.error('Error fetching products:', error)
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not fetch products'
    })
  }
})

/**
 * @route   GET /api/products/category/:category
 * @desc    Get products by category (Men, Women, Unisex)
 * @access  Public
 */
router.get('/category/:category', async (req, res) => {
  try {
    // req.params.category gets the category from the URL
    // Example: /api/products/category/Men → category = "Men"
    const { category } = req.params

    // Find products that match the category
    const products = await Product.find({ category: category })

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    })
  } catch (error) {
    console.error('Error fetching products by category:', error)
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not fetch products'
    })
  }
})

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID (for product detail page)
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    // req.params.id gets the product ID from the URL
    // Example: /api/products/abc123 → id = "abc123"
    const product = await Product.findById(req.params.id)

    // If no product found with that ID
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.status(200).json({
      success: true,
      data: product
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not fetch product'
    })
  }
})

module.exports = router
