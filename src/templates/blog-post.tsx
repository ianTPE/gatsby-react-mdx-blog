import React, { Suspense } from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import MDXComponents from "../components/mdx/MDXComponents"
import { motion } from "framer-motion"

// Lazy load chart components to handle SSR issues
const ChartComponentLoader = ({ componentName }: { componentName: string }) => {
  const [Component, setComponent] = React.useState<React.ComponentType<any> | null>(null)

  React.useEffect(() => {
    // Only load in browser environment
    if (typeof window !== 'undefined') {
      switch (componentName) {
        case 'SalesChart':
          import('../../content/posts/react-charts-guide/components/SalesChart').then(mod => {
            setComponent(() => mod.default)
          })
          break
        case 'BarChartDemo':
          import('../../content/posts/react-charts-guide/components/BarChartDemo').then(mod => {
            setComponent(() => mod.default)
          })
          break
        case 'PieChartDemo':
          import('../../content/posts/react-charts-guide/components/PieChartDemo').then(mod => {
            setComponent(() => mod.default)
          })
          break
        case 'DoughnutChartDemo':
          import('../../content/posts/react-charts-guide/components/DoughnutChartDemo').then(mod => {
            setComponent(() => mod.default)
          })
          break
      }
    }
  }, [componentName])

  if (!Component) {
    return (
      <div className="my-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md animate-pulse">
        <div className="h-[350px] flex items-center justify-center text-gray-500">
          Loading {componentName}...
        </div>
      </div>
    )
  }

  return <Component />
}

// Create wrapper components for each chart
const SalesChart = () => <ChartComponentLoader componentName="SalesChart" />
const BarChartDemo = () => <ChartComponentLoader componentName="BarChartDemo" />
const PieChartDemo = () => <ChartComponentLoader componentName="PieChartDemo" />
const DoughnutChartDemo = () => <ChartComponentLoader componentName="DoughnutChartDemo" />

interface BlogPostTemplateProps {
  data: {
    mdx: {
      tableOfContents?: {
        items?: Array<{
          url: string
          title: string
        }>
      }
      fields: {
        slug: string
      }
    }
    previous?: {
      fields: {
        slug: string
        title: string
      }
    }
    next?: {
      fields: {
        slug: string
        title: string
      }
    }
  }
  children: React.ReactNode
  pageContext: {
    id: string
    slug: string
    metadata: {
      title: string
      date: string
      description?: string
      tags?: string[]
      author?: string
    }
  }
}

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({ data, children, pageContext }) => {
  const { mdx, previous, next } = data
  const { metadata } = pageContext
  const { title, date, description, tags } = metadata
  const slug = pageContext.slug || mdx.fields.slug

  // Define local components for each post
  const getLocalComponents = (slug: string) => {
    switch (slug) {
      case '/posts/react-charts-guide/':
        return {
          SalesChart,
          BarChartDemo,
          PieChartDemo,
          DoughnutChartDemo,
        }
      default:
        return {}
    }
  }

  // Get local components for this post
  const localComponents = getLocalComponents(slug)

  // Merge global and local components
  const components = {
    ...MDXComponents,
    ...localComponents,
  }

  return (
    <Layout>
      <SEO title={title} description={description} />
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
            <time dateTime={date}>
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
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
          <MDXProvider components={components}>
            <Suspense fallback={<div>Loading content...</div>}>
              {children}
            </Suspense>
          </MDXProvider>
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
                  ← {previous.fields.title}
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
                  {next.fields.title} →
                </Link>
              )}
            </li>
          </ul>
        </motion.nav>
      </article>
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
      fields {
        slug
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
        title
      }
    }
  }
`

export default BlogPostTemplate
