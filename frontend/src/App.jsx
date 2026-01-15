/**
 * App.jsx - Main Application Component
 *
 * This is the root component of our React application.
 * It sets up:
 * 1. React Router for navigation between pages
 * 2. Layout structure (Navbar at top, content in middle, Footer at bottom)
 * 3. Route definitions (which URL shows which page)
 *
 * ROUTING:
 * - "/" → HomePage (shows all products)
 * - "/product/:id" → ProductPage (shows single product details)
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'

const App = () => {
  return (
    // Router wraps the entire app to enable navigation
    <Router>
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

export default App
