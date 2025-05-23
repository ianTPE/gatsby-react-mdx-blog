import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { motion } from "framer-motion"

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="About" description="Learn more about this blog and its author" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          About This Blog
        </h1>
        <div className="prose prose-lg dark:prose-dark max-w-none">
          <p>
            Welcome to my blog! This site is built with Gatsby, React, and MDX,
            combining the power of static site generation with the flexibility of
            React components in Markdown.
          </p>
          <h2>Features</h2>
          <ul>
            <li>MDX support for interactive content</li>
            <li>TypeScript for type safety</li>
            <li>Tailwind CSS for styling</li>
            <li>Framer Motion for animations</li>
            <li>Chart.js integration for data visualization</li>
            <li>Dark mode support</li>
            <li>SEO optimized</li>
          </ul>
          <h2>Get Started</h2>
          <p>
            To create a new blog post, add a new folder in <code>content/posts/</code> 
            with a <code>content.mdx</code> file. You can also add local components 
            specific to that post in a <code>components</code> subfolder.
          </p>
        </div>
      </motion.div>
    </Layout>
  )
}

export default AboutPage
