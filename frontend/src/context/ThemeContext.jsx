/**
 * Theme Context
 *
 * Manages dark/light mode across the entire application.
 * - Stores theme preference in localStorage
 * - Provides toggle function to switch themes
 * - Applies theme class to document root
 */

import { createContext, useContext, useState, useEffect } from 'react'

// Create the context
const ThemeContext = createContext()

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  //  custom hook to  Check localStorage or system preference for initial theme
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  }

  const [theme, setTheme] = useState(getInitialTheme)

  // Apply theme class to html <html> when theme changes
  useEffect(() => {
    const root = document.documentElement

    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }

    // Save to localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  // Set specific theme => frocely want to set some theme
  const setThemeMode = mode => {
    setTheme(mode)
  }
//   complete object to be provided by the context for the components or the children to use
  const value = {
    theme,
    isDarkMode: theme === 'dark',
    isDark: theme === 'dark',
    toggleTheme,
    setThemeMode
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeContext
