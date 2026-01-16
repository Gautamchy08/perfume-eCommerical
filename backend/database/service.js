/**
 * Database Service
 *
 * This file handles the MongoDB database connection.
 * Centralizing the connection logic here allows us to:
 * - Reuse the same connection function everywhere
 * - Keep database config in one place
 * - Easy to modify connection settings
 *
 * USED BY:
 * - server.js (main app)
 * - seedData.js (database seeding)
 */

const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Load environment variables
dotenv.config()

/**
 * Connect to MongoDB Database
 *
 * This function establishes a connection to MongoDB using the URI
 * stored in the .env file. It handles connection errors gracefully.
 *
 * @returns {Promise} Resolves when connected successfully
 */
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

/**
 * Disconnect from MongoDB Database
 *
 * Useful for cleanup after seeding or testing
 */
const disconnectDB = async () => {
  try {
    await mongoose.connection.close()
    console.log('📤 MongoDB Disconnected')
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error.message)
  }
}

module.exports = {
  connectDB,
  disconnectDB
}
