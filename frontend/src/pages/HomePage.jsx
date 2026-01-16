/**
 * Home Page Component
 *
 * This is the main landing page of the website.
 * It displays:
 * - Hero Banner (CTA)
 * - Category filter tabs (Men, Women, Unisex)
 * - Product cards grid
 *
 * DATA FLOW:
 * 1. Page loads → useEffect runs
 * 2. Fetches products from backend API
 * 3. Stores products in state
 * 4. Maps over products to render ProductCard components
 */

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner'
import ProductCard from '../components/ProductCard'
import { ProductGridSkeleton } from '../components/Skeleton'
import { getAllProducts, getProductsByCategory } from '../services/api'

const HomePage = () => {
  // State to store products fetched from backend
  const [products, setProducts] = useState([])

  // State to track loading status
  const [loading, setLoading] = useState(true)

  // State to track any errors
  const [error, setError] = useState(null)

  // State for active category tab
  const [activeCategory, setActiveCategory] = useState('All')

  // Get URL search params (for category filter from navbar)
  const [searchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get('category')

  // Categories for filter tabs
  const categories = ['All', 'Men', 'Women', 'Unisex']

  /**
   * useEffect Hook
   * Runs when component mounts or when category changes
   * Fetches products from the backend API
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        let response

        // Check if category is specified (from URL or tab click)
        const category =
          categoryFromUrl || (activeCategory !== 'All' ? activeCategory : null)

        if (category && category !== 'All') {
          // Fetch products by category
          response = await getProductsByCategory(category)
          setActiveCategory(category)
        } else {
          // Fetch all products
          response = await getAllProducts()
          setActiveCategory('All')
        }

        // Update state with fetched products
        if (response.success) {
          setProducts(response.data)
        }
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(
          'Failed to load products. Please make sure the backend server is running.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryFromUrl, activeCategory])

  /**
   * Handle category tab click
   */
  const handleCategoryClick = category => {
    setActiveCategory(category)
  }

  return (
    <div className='min-h-screen'>
      {/* Hero Banner Section */}
      <HeroBanner />

      {/* Products Section */}
      <section className='py-16 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300'>
        <div className='container mx-auto px-4'>
          {/* Section Header */}
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
              Our{' '}
              <span className='text-purple-600 dark:text-purple-400'>
                Premium
              </span>{' '}
              Collection
            </h2>
            <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
              Discover our handpicked selection of luxury perfumes. Each
              fragrance is carefully curated to help you find your perfect
              scent.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className='flex justify-center mb-10'>
            <div className='inline-flex bg-white dark:bg-gray-800 rounded-full p-1 shadow-md dark:shadow-gray-900/50'>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-6 py-2 rounded-full font-medium cursor-pointer transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State - Skeleton */}
          {loading && <ProductGridSkeleton count={8} />}

          {/* Error State */}
          {error && (
            <div className='text-center py-20'>
              <p className='text-red-500 text-lg'>{error}</p>
              <p className='text-gray-500 dark:text-gray-400 mt-2'>
                Make sure to run:{' '}
                <code className='bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>
                  npm run dev
                </code>{' '}
                in the backend folder
              </p>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* No Products Found */}
          {!loading && !error && products.length === 0 && (
            <div className='text-center py-20'>
              <p className='text-gray-500 dark:text-gray-400 text-lg'>
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 bg-white dark:bg-gray-800/50 transition-colors duration-300'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {/* Feature 1 */}
            <div className='text-center p-6'>
              <div className='text-4xl mb-4'>🚚</div>
              <h3 className='font-semibold text-gray-800 dark:text-gray-100 mb-2'>
                Free Shipping
              </h3>
              <p className='text-gray-500 dark:text-gray-400 text-sm'>
                On orders over ₹2000
              </p>
            </div>

            {/* Feature 2 */}
            <div className='text-center p-6'>
              <div className='text-4xl mb-4'>✨</div>
              <h3 className='font-semibold text-gray-800 dark:text-gray-100 mb-2'>
                100% Authentic
              </h3>
              <p className='text-gray-500 dark:text-gray-400 text-sm'>
                Genuine products guaranteed
              </p>
            </div>

            {/* Feature 3 */}
            <div className='text-center p-6'>
              <div className='text-4xl mb-4'>🔄</div>
              <h3 className='font-semibold text-gray-800 dark:text-gray-100 mb-2'>
                Easy Returns
              </h3>
              <p className='text-gray-500 dark:text-gray-400 text-sm'>
                7-day return policy
              </p>
            </div>

            {/* Feature 4 */}
            <div className='text-center p-6'>
              <div className='text-4xl mb-4'>💳</div>
              <h3 className='font-semibold text-gray-800 dark:text-gray-100 mb-2'>
                Secure Payment
              </h3>
              <p className='text-gray-500 dark:text-gray-400 text-sm'>
                100% secure checkout
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
