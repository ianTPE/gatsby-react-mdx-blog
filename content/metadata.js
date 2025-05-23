// Central metadata for all blog posts
// This file is used for performance optimization and external tooling

const posts = [
  {
    slug: "hello-world",
    title: "Hello World: Getting Started with MDX",
    date: "2024-01-15",
    description: "An introduction to building a blog with Gatsby and MDX, featuring interactive components and modern web development practices.",
    tags: ["gatsby", "mdx", "react", "tutorial"],
    author: "Your Name",
    featured: true,
  },
  {
    slug: "react-charts-guide",
    title: "Building Interactive Charts with React and Chart.js",
    date: "2024-01-20",
    description: "Learn how to create responsive, interactive charts in your MDX blog posts using Chart.js and React.",
    tags: ["react", "charts", "data-visualization", "tutorial"],
    author: "Your Name",
    featured: false,
  },
  {
    slug: "code-highlighting-showcase",
    title: "Code Syntax Highlighting Showcase",
    date: "2024-01-25",
    description: "Explore the beautiful syntax highlighting capabilities powered by prism-react-renderer in this MDX blog.",
    tags: ["code", "syntax-highlighting", "mdx", "developer-tools"],
    author: "Your Name",
    featured: true,
  },
  // Add more posts as you create them
]

// Export for use in gatsby-node.js, RSS feed generation, sitemaps, etc.
module.exports = {
  posts,
  // Helper functions
  getPostBySlug: (slug) => posts.find(post => post.slug === slug),
  getFeaturedPosts: () => posts.filter(post => post.featured),
  getPostsByTag: (tag) => posts.filter(post => post.tags.includes(tag)),
}
