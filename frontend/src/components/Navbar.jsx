/**
 * Navbar Component
 *
 * This is the navigation bar that appears at the top of every page.
 * It includes:
 * - Logo
 * - Navigation links (Home, Shop, Categories)
 * - Search bar
 * - Cart and Wishlist icons
 *
 * RESPONSIVE DESIGN:
 * - On desktop: Full horizontal menu
 * - On mobile: Hamburger menu that slides in
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes
} from 'react-icons/fa'

const Navbar = () => {
  // State to track if mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className='bg-white shadow-md sticky top-0 z-50'>
      {/* Top bar with contact info */}
      <div className='bg-gray-900 text-white py-2 hidden md:block'>
        <div className='container mx-auto px-4 flex justify-between items-center text-sm'>
          <span>📞 +91 9876543210 | ✉️ support@perfumeshop.com</span>
          <span>🚚 Free shipping on orders over ₹2000</span>
        </div>
      </div>

      {/* Main navbar */}
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center py-4'>
          {/* Logo */}
          <Link to='/' className='flex items-center'>
            <span className='text-2xl font-bold text-purple-800'>
              ✨ Perfume<span className='text-pink-500'>Shop</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className='hidden md:flex items-center space-x-8'>
            <Link
              to='/'
              className='text-gray-700 hover:text-purple-600 font-medium transition-colors'
            >
              Home
            </Link>
            <div className='relative group'>
              <span className='text-gray-700 hover:text-purple-600 font-medium cursor-pointer transition-colors'>
                Categories
              </span>
              {/* Dropdown menu */}
              <div className='absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                <Link
                  to='/?category=Men'
                  className='block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                >
                  Men
                </Link>
                <Link
                  to='/?category=Women'
                  className='block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                >
                  Women
                </Link>
                <Link
                  to='/?category=Unisex'
                  className='block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                >
                  Unisex
                </Link>
              </div>
            </div>
            <Link
              to='/'
              className='text-gray-700 hover:text-purple-600 font-medium transition-colors'
            >
              About
            </Link>
            <Link
              to='/'
              className='text-gray-700 hover:text-purple-600 font-medium transition-colors'
            >
              Contact
            </Link>
          </div>

          {/* Search bar - Desktop */}
          <div className='hidden md:flex items-center'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search perfumes...'
                className='w-64 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500'
              />
              <FaSearch className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            </div>
          </div>

          {/* Icons */}
          <div className='flex items-center space-x-4'>
            {/* Wishlist */}
            <button className='text-gray-700 hover:text-purple-600 transition-colors relative'>
              <FaHeart size={20} />
              <span className='absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
                0
              </span>
            </button>

            {/* Cart */}
            <button className='text-gray-700 hover:text-purple-600 transition-colors relative'>
              <FaShoppingCart size={20} />
              <span className='absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
                0
              </span>
            </button>

            {/* Mobile menu button */}
            <button className='md:hidden text-gray-700' onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
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
                className='w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500'
              />
              <FaSearch className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            </div>

            {/* Mobile links */}
            <div className='flex flex-col space-y-2'>
              <Link
                to='/'
                className='text-gray-700 hover:text-purple-600 py-2 border-b border-gray-100'
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to='/?category=Men'
                className='text-gray-700 hover:text-purple-600 py-2 border-b border-gray-100'
                onClick={toggleMenu}
              >
                Men
              </Link>
              <Link
                to='/?category=Women'
                className='text-gray-700 hover:text-purple-600 py-2 border-b border-gray-100'
                onClick={toggleMenu}
              >
                Women
              </Link>
              <Link
                to='/?category=Unisex'
                className='text-gray-700 hover:text-purple-600 py-2 border-b border-gray-100'
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
