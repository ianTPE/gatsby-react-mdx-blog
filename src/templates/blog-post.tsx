import type { FC, ReactNode } from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import type { MDXComponents as MDXComponentsType } from "mdx/types"
import { motion } from "framer-motion"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import MDXComponents from "../components/mdx/MDXComponents"
import * as ChartComponents from "content/posts/react-charts-guide/components"

// Merge MDX components with chart components
const components: MDXComponentsType = {
  ...MDXComponents,
  ...ChartComponents
} as MDXComponentsType

interface BlogPostTemplateProps {
  data: {
    mdx: {
      frontmatter: {
        title: string
        date: string
        description?: string
        tags?: string[]
      }
      tableOfContents?: {
        items?: Array<{
          url: string
          title: string
        }>
      }
    }
    previous?: {
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
      }
    }
    next?: {
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
      }
    }
  }
  children: React.ReactNode
}

const BlogPostTemplate: FC<BlogPostTemplateProps> = ({ data, children }) => {
  const { mdx, previous, next } = data
  const { title, date, description, tags } = mdx.frontmatter

  return (
    <Layout>
      <SEO title={title} description={description} />
      <MDXProvider components={components}>
        <article className="max-w-4xl mx-auto">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {title}
            </h1>
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <time dateTime={date}>{date}</time>
              {tags && tags.length > 0 && (
                <div className="flex gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.header>

          {mdx.tableOfContents?.items && mdx.tableOfContents.items.length > 0 && (
            <motion.nav
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
            >
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Table of Contents
              </h2>
                <ul className="space-y-1">
                {mdx.tableOfContents.items.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="prose prose-lg dark:prose-dark max-w-none"
          >
            {children}
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <ul className="flex flex-wrap justify-between list-none p-0">
              <li>
                {previous && (
                  <Link
                    to={previous.fields.slug}
                    rel="prev"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 transition-colors"
                  >
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link
                    to={next.fields.slug}
                    rel="next"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 transition-colors"
                  >
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </motion.nav>
        </article>
      </MDXProvider>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    mdx(id: { eq: $id }) {
      id
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

export default BlogPostTemplate
