/**
 * Server Entry Point (server.js)
 *
 * This is the main file that starts our backend server.
 * It does the following:
 * 1. Sets up Express (web server framework)
 * 2. Connects to MongoDB database
 * 3. Sets up middleware (CORS, JSON parsing)
 * 4. Registers all API routes
 * 5. Starts listening on a port
 */

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

// Import database connection function
const { connectDB } = require('./database/service')

// Import route files
const productRoutes = require('./routes/productRoutes')
const reviewRoutes = require('./routes/reviewRoutes')

// Load environment variables from .env file
dotenv.config()

// Create Express app
const app = express()

// ============================================
// MIDDLEWARE
// Middleware are functions that run before our routes
// ============================================

// CORS - Allows frontend (localhost:5173) to make requests to backend (localhost:5000)
// Without this, browser would block requests due to security
app.use(cors())

// Parse JSON data from request body
// This allows us to access req.body in our routes
app.use(express.json())

// Parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }))

// Serve static files from assets folder
// This allows images to be accessed via http://localhost:5000/assets/men/1-1.png
app.use('/assets', express.static(path.join(__dirname, 'assets')))

// ============================================
// DATABASE CONNECTION
// ============================================

// Connect to MongoDB using centralized service
connectDB()

// ============================================
// ROUTES
// These define the API endpoints
// ============================================

// Test route - check if API is working
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Perfume Shop API',
    endpoints: {
      products: '/api/products',
      reviews: '/api/reviews'
    }
  })
})

// Product routes - handles all /api/products/* requests
app.use('/api/products', productRoutes)

// Review routes - handles all /api/reviews/* requests
app.use('/api/reviews', reviewRoutes)

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 API available at http://localhost:${PORT}`)
})
