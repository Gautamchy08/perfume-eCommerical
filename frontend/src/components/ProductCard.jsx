

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaStar, FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa'

const ProductCard = ({ product }) => {
  // State to track if user is hovering over the card
  const [isHovered, setIsHovered] = useState(false)

  // Destructure product properties for easier access
  const {
    _id,
    name,
    shortDescription,
    price,
    oldPrice,
    images,
    rating,
    category,
    brand
  } = product

  // Calculate discount percentage
  const discountPercent = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0

  return (
    <motion.div
      className='product-card bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900/30 overflow-hidden cursor-pointer transition-colors duration-300'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => (window.location.href = `/product/${_id}`)}
      animate={
        isHovered
          ? { y: 10, rotate: [0, 5, -5, 5, -5, 0] }
          : { y: 0, rotate: 0 }
      }
      transition={{
        y: { type: 'spring', stiffness: 300, damping: 20 },
        rotate: isHovered
          ? { duration: 0.8, ease: 'easeInOut' }
          : { duration: 2, ease: 'easeOut' } // Fast snap back to 0
      }}
    >
      {/* Image Container with Shine Effect */}
      <div className='product-image-container relative h-64'>
        {/* Primary Image */}
        <img
          src={images[0]}
          alt={name}
          className={`product-image w-full h-full object-cover ${
            isHovered && images[1] ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ transition: 'opacity 0.6s ease' }}
        />

        {/* Secondary Image - shown on hover */}
        {images[1] && (
          <img
            src={images[1]}
            alt={name}
            className={`product-image absolute inset-0 w-full h-full object-cover ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transition: 'opacity 0.6s ease' }}
          />
        )}

        {/* Discount Badge with Animation */}
        {discountPercent > 0 && (
          <span className='badge-animate absolute top-3 left-3 bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg'>
            -{discountPercent}% OFF
          </span>
        )}

        {/* Category Badge */}
        <span className='badge-animate absolute top-3 right-3 bg-linear-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg'>
          {category}
        </span>

        {/* Elegant Overlay on Hover */}
        <div
          className={`absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Hover Action Buttons with Stagger Animation */}
        <div
          className={`action-buttons absolute bottom-4 left-0 right-0 flex justify-center gap-4 ${
            isHovered ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {/* Add to Cart Button */}
          <motion.div
            whileHover={{ scale: 1.2, rotate: -19 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <button
              className='btn-ripple bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-purple-700 hover:text-white transition-colors'
              title='Add to Cart'
              onClick={e => e.stopPropagation()}
            >
              <FaShoppingCart size={18} />
            </button>
          </motion.div>

          {/* Add to Wishlist Button */}
          <motion.div
            whileHover={{ scale: 1.2, rotate: -19 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <button
              className='btn-ripple bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-pink-500 hover:text-white transition-colors'
              title='Add to Wishlist'
              onClick={e => e.stopPropagation()}
            >
              <FaHeart size={18} />
            </button>
          </motion.div>

          {/* Quick View Button */}
          <motion.div
            whileHover={{ scale: 1.2, rotate: -19 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Link
              to={`/product/${_id}`}
              className='btn-ripple bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-purple-600 hover:text-white transition-colors flex items-center justify-center'
              title='Quick View'
              onClick={e => e.stopPropagation()}
            >
              <FaEye size={18} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Product Details with Subtle Animation */}
      <div className='p-5'>
        {/* Brand with Elegant Style */}
        <span className='text-xs text-purple-500 dark:text-purple-400 font-medium uppercase tracking-widest'>
          {brand}
        </span>

        {/* Product Name */}
        <Link to={`/product/${_id}`} onClick={e => e.stopPropagation()}>
          <h3 className='text-lg font-bold text-gray-800 dark:text-gray-100 mt-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 line-clamp-1'>
            {name}
          </h3>
        </Link>

        {/* Short Description */}
        <p className='text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-2 leading-relaxed'>
          {shortDescription}
        </p>

        {/* Rating Stars with Glow */}
        <div className='flex items-center mt-3'>
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`${
                index < Math.round(rating)
                  ? 'text-yellow-400 drop-shadow-sm'
                  : 'text-gray-200 dark:text-gray-600'
              } transition-colors duration-200`}
              size={14}
            />
          ))}
          <span className='text-gray-400 dark:text-gray-500 text-sm ml-2 font-medium'>
            ({rating})
          </span>
        </div>

        {/* Price with Gradient */}
        <div className='flex items-center gap-3 mt-4'>
          <span className='text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent'>
            ₹{price.toLocaleString()}
          </span>
          {oldPrice && (
            <span className='text-gray-400 dark:text-gray-500 line-through text-sm'>
              ₹{oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
