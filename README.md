# Gatsby React MDX Blog

A modern, performant blog built with Gatsby, React, TypeScript, and MDX. Features interactive components, beautiful styling with Tailwind CSS, and smooth animations with Framer Motion.

## Features

- 📝 **MDX Support** - Write content in Markdown with embedded React components
- 🎨 **Tailwind CSS** - Modern utility-first styling with v3.4
- 🚀 **TypeScript** - Full type safety throughout the project
- ✨ **Framer Motion** - Smooth animations and transitions
- 📊 **Chart.js Integration** - Beautiful data visualizations
- 🎆 **Syntax Highlighting** - Beautiful code blocks with prism-react-renderer
- 🎯 **SEO Optimized** - Built-in SEO component and sitemap generation
- 🌙 **Dark Mode Ready** - Support for light and dark themes
- ⚡ **Fast Performance** - Static site generation with Gatsby
- 📱 **Fully Responsive** - Mobile-first design approach

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd gatsby-react-mdx-blog
```

2. Install dependencies:
```bash
npm install
```

3. Create an icon.png file:
   - Open `icon-generator.html` in your browser
   - Click "Download Icon as PNG"
   - Save it as `icon.png` in `src/images/`
   - Or create your own 512x512 PNG icon

4. Start the development server:
```bash
npm run develop
```

5. Open your browser and visit `http://localhost:8000`

## Project Structure

```
gatsby-react-mdx-blog/
├── content/
│   ├── metadata.js              # Centralized post metadata
│   └── posts/
│       └── {slug}/
│           ├── content.mdx      # Post content
│           └── components/      # Post-specific components
│               └── index.ts     # Barrel file for exports
├── src/
│   ├── components/
│   │   ├── Layout.tsx          # Main layout component
│   │   ├── SEO.tsx             # SEO component
│   │   └── mdx/
│   │       ├── MDXComponents.tsx    # Global MDX components mapping
│   │       └── global-components/   # Shared MDX components
│   ├── images/                 # Static images
│   ├── pages/                  # Gatsby pages
│   ├── styles/                 # Global styles
│   └── templates/              # Page templates
├── gatsby-config.js            # Gatsby configuration
├── gatsby-node.js              # Dynamic page creation
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## Creating Blog Posts

### 1. Create a new post directory

```bash
mkdir content/posts/my-new-post
```

### 2. Add metadata to `content/metadata.js`

```javascript
{
  slug: "my-new-post",
  title: "My Amazing New Post",
  date: "2024-01-25",
  description: "A brief description of your post",
  tags: ["tutorial", "react"],
  author: "Your Name",
  featured: false,
}
```

### 3. Create the MDX content file

Create `content/posts/my-new-post/content.mdx`:

```mdx
---
title: "My Amazing New Post"
date: "2024-01-25"
description: "A brief description of your post"
tags: ["tutorial", "react"]
---

Your content goes here...

<AlertBox type="info">
  You can use React components directly!
</AlertBox>
```

### 4. Add local components (optional)

For post-specific components:

1. Create `content/posts/my-new-post/components/` directory
2. Add your components (e.g., `CustomChart.tsx`)
3. Create `index.ts` to export all components:

```typescript
export { default as CustomChart } from './CustomChart'
```

## Available Global Components

- **AlertBox** - Styled alert boxes with different types (info, warning, error, success)
- **CodeBlock** - Enhanced code blocks with syntax highlighting powered by prism-react-renderer
- **InlineCode** - Styled inline code snippets

### Code Block Features

The blog now uses `prism-react-renderer` for superior syntax highlighting:

#### Basic Usage
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```

#### With Title
```jsx title="components/MyComponent.jsx"
import React from 'react';
const MyComponent = () => <div>Hello!</div>;
```

#### With Line Numbers
Add `showLineNumbers` to your code block:
```mdx
```javascript showLineNumbers
function example() {
  return "Hello";
}
```
```

#### With Line Highlighting
Highlight specific lines with `highlightLines`:
```mdx
```javascript highlightLines={[2, 4]}
function example() {
  const important = "This line is highlighted";
  const normal = "This line is not";
  return important; // This is also highlighted
}
```
```

## Commands

- `npm run develop` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Serve production build locally
- `npm run clean` - Clean cache and public directories
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with automatic fixes
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Customization

### Styling

- Edit `tailwind.config.js` for theme customization
- Modify `src/styles/global.css` for global styles
- Component styles can be customized in their respective files

### MDX Components

- Add global components in `src/components/mdx/global-components/`
- Update `src/components/mdx/MDXComponents.tsx` to include new components

### Site Metadata

Edit `gatsby-config.js` to update:
- Site title, description, author
- Site URL
- Social media links

## Performance Tips

1. **Images**: Use Gatsby Image for optimized loading
2. **Code Splitting**: Gatsby handles this automatically
3. **Lazy Loading**: Components are loaded as needed
4. **Static Generation**: All pages are pre-built for fast loading

## Deployment

This site can be deployed to any static hosting service:

- **Netlify**: Connect your GitHub repo for automatic deploys
- **Vercel**: Import your project for instant deployment
- **GitHub Pages**: Use `gatsby-plugin-gh-pages`
- **AWS S3**: Build and upload to S3 bucket

### 📊 Chart Components Issue Fixed

The chart components issue has been resolved! The problem was:
1. Local MDX components weren't being loaded properly in the blog post template
2. Chart.js has SSR (Server-Side Rendering) compatibility issues

**Solutions implemented:**
1. Added dynamic imports for chart components using React's lazy loading
2. Added browser environment checks to prevent SSR errors
3. Components now load only in the browser with loading states

### 🔧 Adding Local Components to New Posts

When adding local components to a new blog post:

1. Create components in `content/posts/[slug]/components/`
2. Update `src/templates/blog-post.tsx` to include the new components:
   ```typescript
   case '/posts/your-new-post/':
     return {
       YourComponent1,
       YourComponent2,
     }
   ```
3. Add dynamic imports in the `ChartComponentLoader` switch statement
4. Create wrapper components for each local component

## Troubleshooting

### Common Issues

1. **Icon missing error**: Add a `icon.png` file to `src/images/`
2. **Build errors**: Run `npm run clean` then rebuild
3. **Type errors**: Run `npm run typecheck` to identify issues

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Gatsby](https://www.gatsbyjs.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Charts by [Chart.js](https://www.chartjs.org/)
