import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { motion } from "framer-motion"

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="404: Not Found" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-20"
      >
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          404
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go back home
        </Link>
      </motion.div>
    </Layout>
  )
}

export default NotFoundPage
