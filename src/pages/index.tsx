import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { motion } from "framer-motion"

interface IndexPageProps {
  data: {
    allMdx: {
      nodes: Array<{
        id: string
        excerpt: string
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
          date: string
          description?: string
          tags?: string[]
        }
      }>
    }
  }
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const posts = data.allMdx.nodes

  return (
    <Layout>
      <SEO title="Home" />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Welcome to My Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Thoughts on web development, React, and modern JavaScript
          </p>
        </motion.div>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <header className="mb-4">
                <h2 className="text-2xl font-bold mb-2">
                  <Link
                    to={post.fields.slug}
                    className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {post.frontmatter.title}
                  </Link>
                </h2>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <time dateTime={post.frontmatter.date}>
                    {post.frontmatter.date}
                  </time>
                  {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    <div className="flex gap-2">
                      {post.frontmatter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </header>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {post.frontmatter.description || post.excerpt}
              </p>
              <Link
                to={post.fields.slug}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 transition-colors"
              >
                Read more
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.article>
          ))}
        </div>

        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No blog posts yet. Create your first post in the content/posts directory!
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        excerpt(pruneLength: 160)
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          description
          tags
        }
      }
    }
  }
`

export default IndexPage
