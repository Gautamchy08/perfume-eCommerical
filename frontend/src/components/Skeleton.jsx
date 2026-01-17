

import { motion } from 'framer-motion'

// Base skeleton with shimmer animation
const SkeletonBase = ({ className = '' }) => (
  <div
    className={`skeleton-shimmer bg-gray-200 dark:bg-gray-700 rounded ${className}`}
  />
)

// Product Card Skeleton
export const ProductCardSkeleton = () => (
  <motion.div
    className='bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-900/30 overflow-hidden'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    {/* Image placeholder */}
    <div className='skeleton-shimmer h-64 bg-gray-200 dark:bg-gray-700' />

    {/* Content */}
    <div className='p-5 space-y-3'>
      {/* Brand */}
      <SkeletonBase className='h-3 w-16' />

      {/* Title */}
      <SkeletonBase className='h-5 w-3/4' />

      {/* Description */}
      <div className='space-y-2'>
        <SkeletonBase className='h-3 w-full' />
        <SkeletonBase className='h-3 w-5/6' />
      </div>

      {/* Rating */}
      <div className='flex gap-1'>
        {[...Array(5)].map((_, i) => (
          <SkeletonBase key={i} className='h-4 w-4 rounded-full' />
        ))}
      </div>

      {/* Price */}
      <SkeletonBase className='h-7 w-24' />
    </div>
  </motion.div>
)

// Product Page Image Skeleton
export const ProductImageSkeleton = () => (
  <div className='space-y-4'>
    {/* Main image */}
    <div className='skeleton-shimmer aspect-square rounded-2xl bg-gray-200 dark:bg-gray-700' />

    {/* Thumbnails */}
    <div className='flex gap-3'>
      {[...Array(4)].map((_, i) => (
        <SkeletonBase key={i} className='w-20 h-20 rounded-xl' />
      ))}
    </div>
  </div>
)

// Product Page Details Skeleton
export const ProductDetailsSkeleton = () => (
  <div className='space-y-6'>
    {/* Brand */}
    <SkeletonBase className='h-4 w-20' />

    {/* Title */}
    <SkeletonBase className='h-10 w-3/4' />

    {/* Rating */}
    <div className='flex items-center gap-2'>
      <div className='flex gap-1'>
        {[...Array(5)].map((_, i) => (
          <SkeletonBase key={i} className='h-5 w-5 rounded-full' />
        ))}
      </div>
      <SkeletonBase className='h-4 w-24' />
    </div>

    {/* Price */}
    <div className='flex items-center gap-3'>
      <SkeletonBase className='h-10 w-32' />
      <SkeletonBase className='h-6 w-20' />
    </div>

    {/* Description */}
    <div className='space-y-2'>
      <SkeletonBase className='h-4 w-full' />
      <SkeletonBase className='h-4 w-full' />
      <SkeletonBase className='h-4 w-3/4' />
    </div>

    {/* Sizes */}
    <div className='space-y-3'>
      <SkeletonBase className='h-5 w-24' />
      <div className='flex gap-3'>
        {[...Array(4)].map((_, i) => (
          <SkeletonBase key={i} className='h-10 w-16 rounded-lg' />
        ))}
      </div>
    </div>

    {/* Buttons */}
    <div className='flex gap-4 pt-4'>
      <SkeletonBase className='h-12 flex-1 rounded-full' />
      <SkeletonBase className='h-12 w-12 rounded-full' />
      <SkeletonBase className='h-12 w-12 rounded-full' />
    </div>
  </div>
)

// Full Product Page Skeleton
export const ProductPageSkeleton = () => (
  <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300'>
    <div className='container mx-auto px-4'>
      {/* Back button */}
      <SkeletonBase className='h-6 w-32 mb-6' />

      {/* Main content */}
      <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 overflow-hidden'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10'>
          <ProductImageSkeleton />
          <ProductDetailsSkeleton />
        </div>
      </div>
    </div>
  </div>
)

// Grid of Product Card Skeletons
export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
    {[...Array(count)].map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
)

// Hero Banner Skeleton
export const HeroBannerSkeleton = () => (
  <div className='skeleton-shimmer h-[500px] bg-gray-200 dark:bg-gray-700 rounded-2xl' />
)

export default {
  ProductCardSkeleton,
  ProductImageSkeleton,
  ProductDetailsSkeleton,
  ProductPageSkeleton,
  ProductGridSkeleton,
  HeroBannerSkeleton
}
