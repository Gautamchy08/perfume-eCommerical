/**
 * App.jsx - Main Application Component
 *
 * This is the root component of our React application.
 * It sets up:
 * 1. React Router for navigation between pages
 * 2. Layout structure (Navbar at top, content in middle, Footer at bottom)
 * 3. Route definitions (which URL shows which page)
 * 4. Theme Provider for dark/light mode
 *
 * ROUTING:
 * - "/" → HomePage (shows all products)
 * - "/product/:id" → ProductPage (shows single product details)
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'

// Inner App component that uses theme context
const AppContent = () => {
  const { isDarkMode } = useTheme()

  return (
    // Router wraps the entire app to enable navigation
    <Router>
      {/* Decorative gradient orbs for background */}
      <div className='gradient-orb gradient-orb-1'></div>
      <div className='gradient-orb gradient-orb-2'></div>
      <div className='gradient-orb gradient-orb-3'></div>

      {/* Toast notifications */}
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 3000,
          style: {
            background: isDarkMode
              ? 'rgba(30, 30, 40, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            color: isDarkMode ? '#f3f4f6' : '#333',
            border: isDarkMode
              ? '1px solid rgba(147, 51, 234, 0.3)'
              : '1px solid rgba(147, 51, 234, 0.1)'
          },
          success: {
            iconTheme: {
              primary: '#9333ea',
              secondary: '#fff'
            }
          }
        }}
      />
      {/* Main app container */}
      <div className='flex flex-col min-h-screen'>
        {/* Navbar - appears on every page */}
        <Navbar />

        {/* Main content area - grows to fill available space */}
        <main className='flex-grow'>
          {/* Routes define which component to show for each URL */}
          <Routes>
            {/* Home Page Route */}
            <Route path='/' element={<HomePage />} />

            {/* Product Detail Page Route */}
            {/* :id is a URL parameter - can be any value */}
            <Route path='/product/:id' element={<ProductPage />} />
          </Routes>
        </main>

        {/* Footer - appears on every page */}
        <Footer />
      </div>
    </Router>
  )
}

// Main App component wrapped with ThemeProvider
const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
