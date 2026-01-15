/**
 * Footer Component
 *
 * The footer appears at the bottom of every page.
 * It contains:
 * - Company information
 * - Quick links
 * - Contact information
 * - Social media links
 * - Newsletter subscription
 */

import { Link } from 'react-router-dom'
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHeart
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white'>
      {/* Main Footer Content */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Column 1: About */}
          <div>
            <h3 className='text-2xl font-bold mb-4'>
              ✨ Perfume<span className='text-pink-500'>Shop</span>
            </h3>
            <p className='text-gray-400 mb-4'>
              Your destination for luxury fragrances. We offer authentic
              perfumes from top brands at the best prices. Discover your
              signature scent today.
            </p>
            {/* Social Media Links */}
            <div className='flex space-x-4'>
              <a
                href='#'
                className='text-gray-400 hover:text-pink-500 transition-colors'
              >
                <FaFacebook size={24} />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-pink-500 transition-colors'
              >
                <FaTwitter size={24} />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-pink-500 transition-colors'
              >
                <FaInstagram size={24} />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-pink-500 transition-colors'
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/'
                  className='text-gray-400 hover:text-pink-500 transition-colors'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/?category=Men'
                  className='text-gray-400 hover:text-pink-500 transition-colors'
                >
                  Men's Perfumes
                </Link>
              </li>
              <li>
                <Link
                  to='/?category=Women'
                  className='text-gray-400 hover:text-pink-500 transition-colors'
                >
                  Women's Perfumes
                </Link>
              </li>
              <li>
                <Link
                  to='/?category=Unisex'
                  className='text-gray-400 hover:text-pink-500 transition-colors'
                >
                  Unisex Perfumes
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='text-gray-400 hover:text-pink-500 transition-colors'
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Customer Service</h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-pink-500 transition-colors'
                >
                  My Account
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-pink-500 transition-colors'
                >
                  Order History
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-pink-500 transition-colors'
                >
                  Wishlist
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-pink-500 transition-colors'
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-pink-500 transition-colors'
                >
                  Returns & Refunds
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Newsletter</h4>
            <p className='text-gray-400 mb-4'>
              Subscribe to get updates on new arrivals and exclusive offers.
            </p>
            <form className='flex flex-col gap-3'>
              <input
                type='email'
                placeholder='Your email address'
                className='px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-pink-500'
              />
              <button
                type='submit'
                className='bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors'
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-400 text-sm'>
              © 2026 PerfumeShop. All rights reserved.
            </p>
            <p className='text-gray-400 text-sm flex items-center gap-1'>
              Made with <FaHeart className='text-pink-500' /> for Olcademy
              Internship
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
