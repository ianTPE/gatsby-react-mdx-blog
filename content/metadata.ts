// Central metadata for all blog posts
// This file is used for performance optimization and external tooling

/**
 * @typedef {Object} PostMetadata
 * @property {string} slug - Unique identifier for the post URL
 * @property {string} title - Title of the post
 * @property {string} date - Publication date (YYYY-MM-DD)
 * @property {string} description - Brief description of the post
 * @property {string[]} tags - Array of tag identifiers
 * @property {string} author - Author name
 * @property {boolean} featured - Whether this is a featured post
 */

/** @type {PostMetadata[]} */
const posts = [
  {
    slug: "hello-world",
    title: "Hello World: Getting Started with MDX",
    date: "2025-05-23",
    description: "An introduction to building a blog with Gatsby and MDX, featuring interactive components and modern web development practices.",
    tags: ["gatsby", "mdx", "react", "tutorial"],
    author: "Ian Chou",
    featured: true,
  },
  {
    slug: "react-charts-guide",
    title: "Building Interactive Charts with React and Chart.js",
    date: "2025-05-23",
    description: "Learn how to create responsive, interactive charts in your MDX blog posts using Chart.js and React.",
    tags: ["react", "charts", "data-visualization", "tutorial"],
    author: "Ian Chou",
    featured: false,
  },
  {
    slug: "code-highlighting-showcase",
    title: "Code Syntax Highlighting Showcase",
    date: "2025-05-23",
    description: "Explore the beautiful syntax highlighting capabilities powered by prism-react-renderer in this MDX blog.",
    tags: ["code", "syntax-highlighting", "mdx", "developer-tools"],
    author: "Ian Chou",
    featured: true,
  },
  // Add more posts as you create them
];

// Helper functions
/**
 * Find a post by its slug
 * @param {string} slug - The slug to look for
 * @returns {PostMetadata|undefined} The post or undefined if not found
 */
const getPostBySlug = (slug) => posts.find(post => post.slug === slug);

/**
 * Get all featured posts
 * @returns {PostMetadata[]} Array of featured posts
 */
const getFeaturedPosts = () => posts.filter(post => post.featured);

/**
 * Get all posts with a specific tag
 * @param {string} tag - The tag to filter by
 * @returns {PostMetadata[]} Array of posts with the tag
 */
const getPostsByTag = (tag) => posts.filter(post => post.tags.includes(tag));

module.exports = {
  posts,
  getPostBySlug,
  getFeaturedPosts,
  getPostsByTag
};
