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
import { motion } from 'framer-motion'

const MotionLink = motion(Link)

const HeroBanner = () => {
  return (
    <section className='relative overflow-hidden'>
      {/* Background with gradient */}
      <div className='bg-linear-to-r from-purple-900 via-purple-800 to-pink-700 min-h-[500px] md:min-h-[600px]'>
        {/* Decorative circles - adds visual interest */}
        <div className='absolute top-10 left-10 w-72 h-72 bg-pink-500 rounded-full opacity-20 blur-3xl'></div>
        <div className='absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full opacity-20 blur-3xl'></div>

        {/* Content container */}
        <div className='container mx-auto px-4 h-full'>
          <div className='flex flex-col md:flex-row items-center justify-between h-full py-16 md:py-24'>
            {/* Left side - Text content */}
            <div className='text-white  max-w-xl z-10 text-center md:text-left'>
              {/* Small label - wrapped in motion.div to handle hover without "chase" issue */}
              <motion.div
                className='inline-block mb-4'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0, scale: 1.1 }}
                transition={{ duration: 1 }}
                whileHover={{ y: 20, rotate: [0, 5, -5, 5, -5, 0], }}
              >
                <span className='inline-block bg-pink-500 text-white text-sm px-4 py-1 rounded-full hover:bg-purple-800 hover:font-bold transition-colors duration-300'>
                  ✨ New Collection 2026
                </span>
              </motion.div>

              {/* Main headline */}

              <motion.h1
                className='text-4xl md:text-6xl font-bold mb-6 leading-tight'
                initial={{ opacity: 0, y: 20, rotate: 20 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 1, repeatType: 'mirror' }}
              >
                Discover Your
                <motion.span
                  className='inline-block text-pink-400 mx-2 bg-linear-to-r from-pink-400 via-pink-500 to-purple-500 bg-clip-text '
                  animate={{
                    rotate: [0, -5, 5, -5, 0],
                    scale: 1.05
                  }}
                  transition={{
                    rotate: {
                      duration: 0.5,
                      ease: 'easeInOut',
                      repeat: Infinity
                    },
                    scale: {
                      duration: 0.2
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Signature
                </motion.span>
                Scent
              </motion.h1>

              {/* Description */}
              <p className='text-lg md:text-xl text-gray-200 mb-8'>
                Explore our exclusive collection of luxury perfumes. From fresh
                and floral to bold and woody - find the perfect fragrance that
                defines you.
              </p>

              {/* CTA Buttons */}
              <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
                <MotionLink
                  to='/'
                  className='bg-pink-500 hover:bg-white hover:text-purple-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform  shadow-lg'
                  whileHover={{scale:1.10,rotate:-10}}
                   whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  Shop Now
                </MotionLink>
                <MotionLink
                  whileHover={{scale:1.10,rotate:-10}}
                   whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  to='/'
                  className='border-2 border-white text-white hover:bg-white hover:text-purple-800 px-8 py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer'
                >
                  View Collections
                </MotionLink>
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
         <motion.div 
  className='mt-10 md:mt-0 z-10'
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
>
  <motion.img
    src='https://images.unsplash.com/photo-1737424065216-bc51dd626175?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    alt='Luxury Perfume'
    className='w-96 md:w-96 h-auto rounded-2xl shadow-2xl cursor-pointer'
    whileHover={{ 
      scale: 1.05,
      rotate: [0, 2, -2, 2, 0],
      boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.5)",
      transition: { duration: 0.5 }
      
    }}
    animate={{
      y: [0, -20, 0],
    }}
    transition={{
      y: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      },
   
    }}
  />
</motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
