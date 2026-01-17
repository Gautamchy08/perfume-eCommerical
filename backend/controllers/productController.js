/**
 * Product Controller
 * This file contains all the business logic for product-related operations.
 * Controllers handle the "what to do" part - they process requests and send responses.

 */


const Product = require('../models/Product')

//   get all products
const getAllProducts = async (req, res) => {
  try {
    // Find all products in the database
    const products = await Product.find({})

    // Send success response with products
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not fetch products'
    })
  }
}
//   get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params

    // Find products matching the category
    const products = await Product.find({ category })

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
}
// Get a single product by its ID

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    // Check if product exists
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
}
 
// Search products by name or brand or description
const searchProducts = async (req, res) => {
  try {
    const { query } = req.params

    // Search products by name or brand (case-insensitive)
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
        { shortDescription: { $regex: query, $options: 'i' } }
      ]
    }).limit(10) // Limit to 10 results for performance

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    })
  } catch (error) {
    console.error('Error searching products:', error)
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not search products'
    })
  }
}

// Export all controller functions
module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  searchProducts
}
