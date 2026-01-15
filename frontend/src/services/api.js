/**
 * API Service
 *
 * This file handles all communication with our backend server.
 * Instead of writing fetch/axios calls everywhere, we centralize them here.
 *
 * WHY THIS IS USEFUL:
 * - One place to change the API URL if needed
 * - Reusable functions across components
 * - Easier to debug and maintain
 */

import axios from 'axios'

// Base URL for our backend API
// In development, backend runs on port 5000
const API_URL = 'http://localhost:5000/api'

// Create an axios instance with default settings
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// ============================================
// PRODUCT API FUNCTIONS
// ============================================

/**
 * Get all products from the database
 * Used on: Homepage to display product cards
 */
export const getAllProducts = async () => {
  try {
    const response = await api.get('/products')
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

/**
 * Get products by category (Men, Women, Unisex)
 * Used on: Homepage when filtering by category tabs
 */
export const getProductsByCategory = async category => {
  try {
    const response = await api.get(`/products/category/${category}`)
    return response.data
  } catch (error) {
    console.error('Error fetching products by category:', error)
    throw error
  }
}

/**
 * Get a single product by its ID
 * Used on: Product detail page
 */
export const getProductById = async productId => {
  try {
    const response = await api.get(`/products/${productId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

// ============================================
// REVIEW API FUNCTIONS
// ============================================

/**
 * Get all reviews for a specific product
 * Used on: Product detail page to show customer reviews
 */
export const getProductReviews = async productId => {
  try {
    const response = await api.get(`/reviews/${productId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching reviews:', error)
    throw error
  }
}

/**
 * Add a new review for a product
 * Used on: Product detail page when user submits a review
 */
export const addReview = async reviewData => {
  try {
    const response = await api.post('/reviews', reviewData)
    return response.data
  } catch (error) {
    console.error('Error adding review:', error)
    throw error
  }
}

export default api
