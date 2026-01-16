/**
 * Product Routes
 *
 * This file ONLY defines the API endpoints (URLs) for products.
 * The actual logic is in the controller file.
 *
 * CLEAN ARCHITECTURE:
 * - Routes → Define WHERE (URLs)
 * - Controllers → Define WHAT (Logic)
 * - Models → Define HOW (Database structure)
 *
 * API Endpoints:
 * - GET /api/products              → Get all products
 * - GET /api/products/category/:category → Get products by category
 * - GET /api/products/:id          → Get single product
 */

const express = require('express')
const router = express.Router()

// Import controller functions
const {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  searchProducts
} = require('../controllers/productController')

// Define routes and connect them to controller functions
router.get('/', getAllProducts)
router.get('/search/:query', searchProducts) // Search must be before :id to avoid conflict
router.get('/category/:category', getProductsByCategory)
router.get('/:id', getProductById)

module.exports = router
