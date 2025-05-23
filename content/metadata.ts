// Central metadata for all blog posts
// This file is used for performance optimization and external tooling

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  author: string;
  featured: boolean;
}

export const posts: PostMetadata[] = [
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
export const getPostBySlug = (slug: string): PostMetadata | undefined => 
  posts.find(post => post.slug === slug);

export const getFeaturedPosts = (): PostMetadata[] => 
  posts.filter(post => post.featured);

export const getPostsByTag = (tag: string): PostMetadata[] => 
  posts.filter(post => post.tags.includes(tag));
