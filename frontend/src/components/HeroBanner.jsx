/**
 * Hero Banner Component
 *
 * This is the large, eye-catching banner at the top of the homepage.
 * It's also called a "Call to Action" (CTA) banner because it encourages
 * users to take action (like "Shop Now").
 *
 * FEATURES:
 * - Beautiful background gradient
 * - Catchy headline and description
 * - Call-to-action button
 * - Responsive design
 */

import { Link } from 'react-router-dom'

const HeroBanner = () => {
  return (
    <section className='relative overflow-hidden'>
      {/* Background with gradient */}
      <div className='bg-gradient-to-r from-purple-900 via-purple-800 to-pink-700 min-h-[500px] md:min-h-[600px]'>
        {/* Decorative circles - adds visual interest */}
        <div className='absolute top-10 left-10 w-72 h-72 bg-pink-500 rounded-full opacity-20 blur-3xl'></div>
        <div className='absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full opacity-20 blur-3xl'></div>

        {/* Content container */}
        <div className='container mx-auto px-4 h-full'>
          <div className='flex flex-col md:flex-row items-center justify-between h-full py-16 md:py-24'>
            {/* Left side - Text content */}
            <div className='text-white max-w-xl z-10 text-center md:text-left'>
              {/* Small label */}
              <span className='inline-block bg-pink-500 text-white text-sm px-4 py-1 rounded-full mb-4'>
                ✨ New Collection 2026
              </span>

              {/* Main headline */}
              <h1 className='text-4xl md:text-6xl font-bold mb-6 leading-tight'>
                Discover Your
                <span className='text-pink-400'> Signature </span>
                Scent
              </h1>

              {/* Description */}
              <p className='text-lg md:text-xl text-gray-200 mb-8'>
                Explore our exclusive collection of luxury perfumes. From fresh
                and floral to bold and woody - find the perfect fragrance that
                defines you.
              </p>

              {/* CTA Buttons */}
              <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
                <Link
                  to='/'
                  className='bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg'
                >
                  Shop Now
                </Link>
                <Link
                  to='/'
                  className='border-2 border-white text-white hover:bg-white hover:text-purple-800 px-8 py-3 rounded-full font-semibold transition-all duration-300'
                >
                  View Collections
                </Link>
              </div>

              {/* Stats */}
              <div className='flex gap-8 mt-10 justify-center md:justify-start'>
                <div>
                  <span className='text-3xl font-bold text-pink-400'>500+</span>
                  <p className='text-gray-300'>Products</p>
                </div>
                <div>
                  <span className='text-3xl font-bold text-pink-400'>50+</span>
                  <p className='text-gray-300'>Brands</p>
                </div>
                <div>
                  <span className='text-3xl font-bold text-pink-400'>10k+</span>
                  <p className='text-gray-300'>Customers</p>
                </div>
              </div>
            </div>

            {/* Right side - Perfume bottle image */}
            <div className='mt-10 md:mt-0 z-10'>
              <img
                src='https://images.unsplash.com/photo-1541643600914-78b084683601?w=500'
                alt='Luxury Perfume'
                className='w-80 md:w-96 h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
