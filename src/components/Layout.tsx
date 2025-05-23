import React from "react"
import { Link } from "gatsby"
import { motion } from "framer-motion"

interface LayoutProps {
  children: React.ReactNode
  title?: string
}

const Layout: React.FC<LayoutProps> = ({ children, title = "My MDX Blog" }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {title}
            </Link>
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {children}
      </motion.main>

      <footer className="bg-gray-100 dark:bg-gray-800 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} {title}. Built with Gatsby and MDX.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
