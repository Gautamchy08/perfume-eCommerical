/**
 
 * This file handles the MongoDB database connection.
 * Centralizing the connection logic 
 
 */

const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Load environment variables
dotenv.config()


const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from .env
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB Connected Successfully')
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message)
    process.exit(1) // Exit the process if connection fails
  }
}


module.exports = {
  connectDB,
}
