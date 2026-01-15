/**
 * Product Card Component
 *
 * This component displays a single product in a card format.
 * Used on the homepage to show multiple products in a grid.
 *
 * FEATURES:
 * - Product image with hover effect (shows second image)
 * - Product name, description, price
 * - Star rating
 * - Hover effects for interactivity
 * - Click redirects to product detail page
 *
 * PROPS:
 * - product: Object containing all product details
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
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
    <div
      className='bg-white rounded-xl shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className='relative overflow-hidden h-64'>
        {/* Primary Image - shown by default */}
        <img
          src={images[0]}
          alt={name}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isHovered && images[1] ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Secondary Image - shown on hover */}
        {images[1] && (
          <img
            src={images[1]}
            alt={name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className='absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded'>
            -{discountPercent}%
          </span>
        )}

        {/* Category Badge */}
        <span className='absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded'>
          {category}
        </span>

        {/* Hover Action Buttons */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className='flex justify-center gap-3'>
            {/* Add to Cart Button */}
            <button
              className='bg-white p-2 rounded-full hover:bg-purple-600 hover:text-white transition-colors'
              title='Add to Cart'
            >
              <FaShoppingCart size={16} />
            </button>

            {/* Add to Wishlist Button */}
            <button
              className='bg-white p-2 rounded-full hover:bg-pink-500 hover:text-white transition-colors'
              title='Add to Wishlist'
            >
              <FaHeart size={16} />
            </button>

            {/* Quick View Button - Links to product page */}
            <Link
              to={`/product/${_id}`}
              className='bg-white p-2 rounded-full hover:bg-purple-600 hover:text-white transition-colors'
              title='Quick View'
            >
              <FaEye size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className='p-4'>
        {/* Brand */}
        <span className='text-xs text-gray-500 uppercase tracking-wider'>
          {brand}
        </span>

        {/* Product Name - Clickable link to product page */}
        <Link to={`/product/${_id}`}>
          <h3 className='text-lg font-semibold text-gray-800 mt-1 hover:text-purple-600 transition-colors line-clamp-1'>
            {name}
          </h3>
        </Link>

        {/* Short Description */}
        <p className='text-gray-500 text-sm mt-1 line-clamp-2'>
          {shortDescription}
        </p>

        {/* Rating Stars */}
        <div className='flex items-center mt-2'>
          {/* Render 5 stars, filled based on rating */}
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`${
                index < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
              size={14}
            />
          ))}
          <span className='text-gray-500 text-sm ml-2'>({rating})</span>
        </div>

        {/* Price */}
        <div className='flex items-center gap-2 mt-3'>
          <span className='text-xl font-bold text-purple-600'>
            ₹{price.toLocaleString()}
          </span>
          {oldPrice && (
            <span className='text-gray-400 line-through text-sm'>
              ₹{oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
