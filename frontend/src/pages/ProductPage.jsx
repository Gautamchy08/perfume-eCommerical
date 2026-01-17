/**
 * Product Page Component
 *
 * This is the detailed product page that shows when you click on a product card.
 *
 * FEATURES:
 * 1. Product Details - Full description, price, available sizes
 * 2. Image Gallery - Multiple images with thumbnail navigation
 * 3. Reviews Section - Read and add reviews
 * 4. Share Button - Share on social media (WhatsApp, Facebook, Twitter)
 *
 * HOW IT WORKS:
 * - Gets product ID from URL params (e.g., /product/123)
 * - Fetches product details and reviews from backend
 * - Displays everything in a beautiful layout
 */

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaShare,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaArrowLeft,
  FaCopy
} from 'react-icons/fa'
import { getProductById, getProductReviews, addReview } from '../services/api'
import { ProductPageSkeleton } from '../components/Skeleton'

const ProductPage = () => {
  // Get product ID from URL (e.g., /product/abc123 → id = "abc123")
  const { id } = useParams()

  // State for product data
  const [product, setProduct] = useState(null)

  // State for reviews
  const [reviews, setReviews] = useState([])

  // State for selected size
  const [selectedSize, setSelectedSize] = useState('')

  // State for currently displayed image in gallery
  const [selectedImage, setSelectedImage] = useState(0)

  // State for loading
  const [loading, setLoading] = useState(true)

  // State for error
  const [error, setError] = useState(null)

  // State for share popup
  const [showSharePopup, setShowSharePopup] = useState(false)

  // State for review form
  const [reviewForm, setReviewForm] = useState({
    userName: '',
    rating: 5,
    comment: ''
  })

  // State for review submission status
  const [submittingReview, setSubmittingReview] = useState(false)

  /**
   * Fetch product and reviews when component mounts or ID changes
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch product details
        const productResponse = await getProductById(id)
        if (productResponse.success) {
          setProduct(productResponse.data)
          // Set default selected size to first available size
          if (
            productResponse.data.sizes &&
            productResponse.data.sizes.length > 0
          ) {
            setSelectedSize(productResponse.data.sizes[0])
          }
        }

        // Fetch reviews for this product
        const reviewsResponse = await getProductReviews(id)
        if (reviewsResponse.success) {
          setReviews(reviewsResponse.data)
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to load product. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  /*
    Handle review form input changes
   */
  const handleReviewInputChange = e => {
    const { name, value } = e.target
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  /*
    Handle review submission
   */
  const handleReviewSubmit = async e => {
    e.preventDefault()
    console.log('Form submitted!') // Debug log

    // Validate form
    if (!reviewForm.userName || !reviewForm.comment) {
      toast.error('Please fill in all fields')
      return
    }

    

    try {
      setSubmittingReview(true)

      // Send review to backend
      const response = await addReview({
        productId: id,
        userName: reviewForm.userName,
        rating: parseInt(reviewForm.rating),
        comment: reviewForm.comment
      })


      if (response.success) {
        // Add new review to the list
        setReviews(prev => [response.data, ...prev])

        // Clear form
        setReviewForm({
          userName: '',
          rating: 5,
          comment: ''
        })

        toast.success('Review added successfully! 🎉')
      }
    } catch (err) {
      toast.error('Failed to add review. Please try again.')
    } finally {
      setSubmittingReview(false)
    }
  }

  /**
   * Share functions for different platforms
   */
  const shareUrl = window.location.href
  const shareText = product ? `Check out ${product.name} at PerfumeShop!` : ''

  const shareOnWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      '_blank'
    )
  }

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      '_blank'
    )
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    )
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    toast.success('Link copied to clipboard!')
  }

  // Loading state - Show skeleton
  if (loading) {
    return <ProductPageSkeleton />
  }

  // Error state
  if (error || !product) {
    return (
      <div className='min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900'>
        <p className='text-red-500 text-lg mb-4'>
          {error || 'Product not found'}
        </p>
        <Link
          to='/'
          className='text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-2'
        >
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
    )
  }

  // Calculate discount percentage
  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300'>
      <div className='container mx-auto px-4'>
        {/* Back Button */}
        <Link
          to='/'
          className='inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-6'
        >
          <FaArrowLeft /> Back to Products
        </Link>

        {/* Main Product Section */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 overflow-hidden transition-colors duration-300'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10'>
            {/* Left Side - Image Gallery */}
            <div className='space-y-4'>
              {/* Main Image with Elegant Effect */}
              <div className='product-image-container aspect-square rounded-2xl overflow-hidden bg-linear-to-br from-gray-100 to-gray-50 shadow-inner'>
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className='main-product-image w-full h-full object-cover'
                />
              </div>

              {/* Thumbnail Images with Glow Effect */}
              <div className='flex gap-3 overflow-x-auto pb-2'>
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`thumbnail shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 ${
                      selectedImage === index
                        ? 'border-purple-600 shadow-lg glow-effect scale-105'
                        : 'border-gray-200 hover:border-purple-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className='w-full h-full object-cover'
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className='space-y-6'>
              {/* Brand */}
              <span className='text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                {product.brand}
              </span>

              {/* Product Name */}
              <h1 className='text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100'>
                {product.name}
              </h1>

              {/* Rating */}
              <div className='flex items-center gap-2'>
                <div className='flex'>
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`${
                        index < Math.round(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                      size={20}
                    />
                  ))}
                </div>
                <span className='text-gray-600 dark:text-gray-400'>
                  ({product.rating}) • {product.numReviews} reviews
                </span>
              </div>

              {/* Price */}
              <div className='flex items-center gap-4'>
                <span className='text-3xl font-bold text-purple-600 dark:text-purple-400'>
                  ₹{product.price.toLocaleString()}
                </span>
                {product.oldPrice && (
                  <>
                    <span className='text-xl text-gray-400 dark:text-gray-500 line-through'>
                      ₹{product.oldPrice.toLocaleString()}
                    </span>
                    <span className='bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-semibold'>
                      {discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Full Description */}
              <div>
                <h3 className='font-semibold text-gray-800 dark:text-gray-100 mb-2'>
                  Description
                </h3>
                <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                  {product.fullDescription}
                </p>
              </div>

              {/* Available Sizes */}
              <div>
                <h3 className='font-semibold text-gray-800 dark:text-gray-100 mb-3'>
                  Available Sizes
                </h3>
                <div className='flex flex-wrap gap-3'>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                        selectedSize === size
                          ? 'border-purple-600 bg-purple-600 text-white'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock Status */}
              <div className='flex items-center gap-2'>
                <span
                  className={`w-3 h-3 rounded-full ${
                    product.inStock ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></span>
                <span
                  className={
                    product.inStock ? 'text-green-600' : 'text-red-600'
                  }
                >
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-wrap gap-4 pt-4'>
                {/* Add to Cart */}
                <motion.button
                  className='flex-1 bg-linear-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg'
                  whileHover={{
                    y:-4,
                    scale: 1.1,
                    boxShadow: '0 15px 35px rgba(147, 51, 234, 0.4)'
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <FaShoppingCart /> Add to Cart
                </motion.button>

                {/* Wishlist */}
                <motion.button
                  className='p-3 border-2 border-gray-300 dark:border-gray-600 rounded-full hover:border-pink-500 hover:text-pink-500 text-gray-700 dark:text-gray-300 transition-colors'
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <FaHeart size={20} />
                </motion.button>

                {/* Share Button */}
                <div className='relative'>
                  <motion.button
                    onClick={() => setShowSharePopup(!showSharePopup)}
                    className='p-3 border-2 border-gray-300 dark:border-gray-600 rounded-full hover:border-purple-500 hover:text-purple-500 text-gray-700 dark:text-gray-300 transition-colors'
                    whileHover={{ scale: 1.15, rotate: -10 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <FaShare size={20} />
                  </motion.button>

                  {/* Share Popup */}
                  {showSharePopup && (
                    <div className='absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-900/50 rounded-xl p-4 z-10 min-w-[200px]'>
                      <p className='text-gray-600 dark:text-gray-400 text-sm mb-3 font-medium'>
                        Share on:
                      </p>
                      <div className='flex gap-3'>
                        <button
                          onClick={shareOnWhatsApp}
                          className='p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors'
                        >
                          <FaWhatsapp size={20} />
                        </button>
                        <button
                          onClick={shareOnFacebook}
                          className='p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors'
                        >
                          <FaFacebook size={20} />
                        </button>
                        <button
                          onClick={shareOnTwitter}
                          className='p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors'
                        >
                          <FaTwitter size={20} />
                        </button>
                        <button
                          onClick={copyLink}
                          className='p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors'
                        >
                          <FaCopy size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className='mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 lg:p-10 transition-colors duration-300'>
          <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6'>
            Customer Reviews ({reviews.length})
          </h2>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Add Review Form */}
            <div className='lg:col-span-1'>
              <div className='bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6'>
                <h3 className='font-semibold text-gray-800 dark:text-gray-100 mb-4'>
                  Write a Review 
                </h3>
                <form onSubmit={handleReviewSubmit} className='space-y-4'>
                  {/* Name Input */}
                  <div>
                    <label className='block text-sm text-gray-600 dark:text-gray-400 mb-1'>
                      Your Name
                    </label>
                    <input
                      type='text'
                      name='userName'
                      value={reviewForm.userName}
                      onChange={handleReviewInputChange}
                      placeholder='Enter your name'
                      className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500'
                      required
                    />
                  </div>

                  {/* Rating Select */}
                  <div>
                    <label className='block text-sm text-gray-600 dark:text-gray-400 mb-1'>
                      Rating
                    </label>
                    <select
                      name='rating'
                      value={reviewForm.rating}
                      onChange={handleReviewInputChange}
                      className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                      <option value={3}>⭐⭐⭐ (3 Stars)</option>
                      <option value={2}>⭐⭐ (2 Stars)</option>
                      <option value={1}>⭐ (1 Star)</option>
                    </select>
                  </div>

                  {/* Comment Textarea */}
                  <div>
                    <label className='block text-sm text-gray-600 dark:text-gray-400 mb-1'>
                      Your Review
                    </label>
                    <textarea
                      name='comment'
                      value={reviewForm.comment}
                      onChange={handleReviewInputChange}
                      placeholder='Share your experience...'
                      rows={4}
                      className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 resize-none'
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type='submit'
                    disabled={submittingReview}
                    className='w-full bg-linear-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg disabled:opacity-50'
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 10px 30px rgba(147, 51, 234, 0.4)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </motion.button>
                </form>
              </div>
            </div>

            {/* Reviews List */}
            <div className='lg:col-span-2'>
              {reviews.length === 0 ? (
                <p className='text-gray-500 dark:text-gray-400 text-center py-10'>
                  No reviews yet. Be the first to review this product!
                </p>
              ) : (
                <div className='space-y-4 max-h-[500px] overflow-y-auto pr-2'>
                  {reviews.map(review => (
                    <div
                      key={review._id}
                      className='bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700'
                    >
                      <div className='flex justify-between items-start mb-2'>
                        <div>
                          <h4 className='font-semibold text-gray-800 dark:text-gray-100'>
                            {review.userName}
                          </h4>
                          <div className='flex mt-1'>
                            {[...Array(5)].map((_, index) => (
                              <FaStar
                                key={index}
                                className={`${
                                  index < review.rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                                size={14}
                              />
                            ))}
                          </div>
                        </div>
                        <span className='text-sm text-gray-400 dark:text-gray-500'>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className='text-gray-600 dark:text-gray-400'>
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
