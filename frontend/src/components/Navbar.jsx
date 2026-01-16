/**
 * Navbar Component
 *
 * This is the navigation bar that appears at the top of every page.
 * It includes:
 * - Logo
 * - Navigation links (Home, Shop, Categories)
 * - Search bar with live search results
 * - Cart and Wishlist icons
 *
 * RESPONSIVE DESIGN:
 * - On desktop: Full horizontal menu
 * - On mobile: Hamburger menu that slides in
 */

import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaStar,
  FaMoon,
  FaSun,
  FaTruckLoading
} from 'react-icons/fa'
import { searchProducts } from '../services/api'
import { useTheme } from '../context/ThemeContext'

// Motion Link component for animated nav items
const MotionLink = motion(Link)

const Navbar = () => {
  // State to track if mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Search states
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // Dark mode from context
  const { isDarkMode, toggleTheme } = useTheme()

  // Ref to detect clicks outside search dropdown
  const searchRef = useRef(null)
  const navigate = useNavigate()

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Handle search input change with debounce
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true)
        try {
          const response = await searchProducts(searchQuery)
          if (response.success) {
            setSearchResults(response.data)
            setShowResults(true)
          }
        } catch (error) {
          console.error('Search error:', error)
        } finally {
          setIsSearching(false)
        }
      } else {
        setSearchResults([])
        setShowResults(false)
      }
    }, 300) // 300ms debounce

    return () => clearTimeout(delaySearch)
  }, [searchQuery])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle product click from search results
  const handleProductClick = productId => {
    setShowResults(false)
    setSearchQuery('')
    navigate(`/product/${productId}`)
  }

  return (
    <nav className='bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-900/50 sticky top-0 z-50 transition-colors duration-300'>
      {/* Top bar with contact info */}
      {/* <div className='bg-linear-to-r from-purple-900 via-purple-800 to-pink-700 text-white py-2 hidden md:block'>
        <div className='container mx-auto px-4 flex justify-between items-center text-sm'>
          <span>📞 +91 9876543210 | ✉️ support@perfumeshop.com</span>
          <span>🚚 Free shipping on orders over ₹2000</span>
        </div>
      </div> */}

      {/* Main navbar */}
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center py-4'>
          {/* Logo */}
          <Link to='/' className='flex items-center'>
            <span className='text-2xl font-bold text-purple-800 dark:text-purple-400'>
              ✨ Perfume
              <span className='text-pink-500 dark:text-pink-400'>Shop</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className='hidden md:flex items-center space-x-8'>
            <MotionLink
              to='/'
              className='text-gray-700 dark:text-gray-200 font-medium'
              whileHover={{ scale: 1.3, color: '#9333ea',rotate:-20 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400,  damping: 17 }}
            >
              Home
            </MotionLink>
            <motion.div
              className='relative group'
              whileHover={{ scale: 1.05,rotate:20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span className='text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-medium cursor-pointer transition-colors'>
                Categories
              </span>
              {/* Dropdown menu */}
              <div className='absolute top-full left-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                <Link
                  to='/?category=Men'
                  className='block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400'
                >
                  Men
                </Link>
                <Link
                  to='/?category=Women'
                  className='block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400'
                >
                  Women
                </Link>
                <Link
                  to='/?category=Unisex'
                  className='block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400'
                >
                  Unisex
                </Link>
              </div>
            </motion.div>
            <MotionLink
              to='/'
              className='text-gray-700 dark:text-gray-200 font-medium'
              whileHover={{ scale: 1.3, color: '#9333ea',rotate:-20 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              About
            </MotionLink>
            <MotionLink
              to='/'
              className='text-gray-700 dark:text-gray-200 font-medium'
              whileHover={{ scale: 1.3, color: '#9333ea',rotate:20 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              Contact
            </MotionLink>
          </div>

          {/* Search bar - Desktop */}
          <div className='hidden md:flex items-center' ref={searchRef}>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search perfumes...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowResults(true)}
                className='w-72 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:border-purple-500 focus:shadow-md transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500'
              />
              {isSearching ? (
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                  <div className='animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent'></div>
                </div>
              ) : (
                <FaSearch className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500' />
              )}

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className='absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 max-h-96 overflow-y-auto z-50'>
                  {searchResults.map(product => (
                    <div
                      key={product._id}
                      onClick={() => handleProductClick(product._id)}
                      className='flex items-center gap-3 p-3 hover:bg-purple-50 dark:hover:bg-purple-900/30 cursor-pointer transition-colors border-b border-gray-50 dark:border-gray-700 last:border-0'
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className='w-12 h-12 object-cover rounded-lg'
                      />
                      <div className='flex-1 min-w-0'>
                        <h4 className='text-sm font-semibold text-gray-800 dark:text-gray-100 truncate'>
                          {product.name}
                        </h4>
                        <div className='flex items-center gap-2'>
                          <span className='text-xs text-purple-600 dark:text-purple-400 font-medium'>
                            ₹{product.price}
                          </span>
                          <span className='text-xs text-gray-400 dark:text-gray-500'>
                            |
                          </span>
                          <span className='text-xs text-gray-500 dark:text-gray-400'>
                            {product.brand}
                          </span>
                        </div>
                      </div>
                      <div className='flex items-center'>
                        <FaStar className='text-yellow-400' size={10} />
                        <span className='text-xs text-gray-500 dark:text-gray-400 ml-1'>
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No results message */}
              {showResults &&
                searchQuery.length >= 2 &&
                searchResults.length === 0 &&
                !isSearching && (
                  <div className='absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-4 text-center z-50'>
                    <p className='text-gray-500 dark:text-gray-400 text-sm'>
                      No perfumes found for "{searchQuery}"
                    </p>
                  </div>
                )}
            </div>
          </div>

          {/* Icons */}
          <div className='flex items-center space-x-4'>
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleTheme}
              className='text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-2 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/30'
              whileHover={{ scale: 1.3, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              aria-label='Toggle dark mode'
            >
              <AnimatePresence mode='wait'>
                {isDarkMode ? (
                  <motion.div
                    key='sun'
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaSun size={20} className='text-yellow-400' />
                  </motion.div>
                ) : (
                  <motion.div
                    key='moon'
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaMoon size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Wishlist */}
            <motion.button
              className='text-gray-700 dark:text-gray-200 hover:text-pink-500 relative'
              whileHover={{ scale: 1.2, rotate: -20 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17, repeatType: 'mirror', duration: 0.6 }}
            >
              <FaHeart size={20} />
              <span className='absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
                0
              </span>
            </motion.button>

            {/* Cart */}
            <motion.button
              className='text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors relative'
              whileHover={{ scale: 1.2, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17, repeatType: 'mirror', duration: 0.6 }}
            >
              <FaShoppingCart size={20} />
              <span className='absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
                0
              </span>
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              className='md:hidden text-gray-700 dark:text-gray-200'
              onClick={toggleMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='md:hidden pb-4'>
            {/* Mobile search */}
            <div className='relative mb-4'>
              <input
                type='text'
                placeholder='Search perfumes...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500'
              />
              {isSearching ? (
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                  <div className='animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent'></div>
                </div>
              ) : (
                <FaSearch className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500' />
              )}

              {/* Mobile Search Results */}
              {showResults && searchResults.length > 0 && (
                <div className='absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 max-h-64 overflow-y-auto z-50'>
                  {searchResults.map(product => (
                    <div
                      key={product._id}
                      onClick={() => {
                        handleProductClick(product._id)
                        toggleMenu()
                      }}
                      className='flex items-center gap-3 p-3 hover:bg-purple-50 dark:hover:bg-purple-900/30 cursor-pointer transition-colors border-b border-gray-50 dark:border-gray-700 last:border-0'
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className='w-10 h-10 object-cover rounded-lg'
                      />
                      <div className='flex-1 min-w-0'>
                        <h4 className='text-sm font-semibold text-gray-800 dark:text-gray-100 truncate'>
                          {product.name}
                        </h4>
                        <span className='text-xs text-purple-600 dark:text-purple-400 font-medium'>
                          ₹{product.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile links */}
            <div className='flex flex-col space-y-2'>
              <Link
                to='/'
                className='text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 py-2 border-b border-gray-100 dark:border-gray-700'
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to='/?category=Men'
                className='text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 py-2 border-b border-gray-100 dark:border-gray-700'
                onClick={toggleMenu}
              >
                Men
              </Link>
              <Link
                to='/?category=Women'
                className='text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 py-2 border-b border-gray-100 dark:border-gray-700'
                onClick={toggleMenu}
              >
                Women
              </Link>
              <Link
                to='/?category=Unisex'
                className='text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 py-2 border-b border-gray-100 dark:border-gray-700'
                onClick={toggleMenu}
              >
                Unisex
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
