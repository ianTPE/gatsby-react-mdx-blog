# Migration from PrismJS to Prism React Renderer

## What Changed

### Removed Dependencies
- `prismjs` - Traditional Prism.js library
- `gatsby-remark-prismjs` - Gatsby plugin for Prism.js

### Added Dependencies
- `prism-react-renderer` (^2.3.0) - React-based syntax highlighting
- ESLint and Prettier dependencies for code quality

### Updated Components
- **CodeBlock.tsx** - Completely rewritten to use prism-react-renderer
  - Added Night Owl theme
  - Enhanced with line numbers support
  - Added line highlighting capability
  - Improved copy button with hover effects
  - Better responsive design
- **InlineCode.tsx** - New component for inline code styling
- **MDXComponents.tsx** - Updated to use new components

### Configuration Changes
- Removed `gatsby-remark-prismjs` from gatsby-config.js
- Removed Prism.js theme import from gatsby-browser.js
- Updated global.css to remove Prism-specific styles

### Version Adjustments for Compatibility
- React: 19.0.0 → 18.2.0 (stable LTS)
- React DOM: 19.0.0 → 18.2.0
- MDX: 3.1.0 → 2.3.0 (Gatsby 5 compatible)
- Tailwind CSS: 4.0.0 → 3.4.0 (stable version)
- Framer Motion: 11.12.0 → 10.16.0 (React 18 compatible)

### New Features
- Line numbers with `showLineNumbers` prop
- Line highlighting with `highlightLines={[1, 2, 3]}` prop
- Better language detection and aliases
- Smooth animations on code blocks
- Improved dark mode support
- Hover effects on copy button

### Added Development Tools
- ESLint configuration
- Prettier configuration
- TypeScript strict mode
- Linting and formatting scripts

## Benefits

1. **Better React Integration**: prism-react-renderer is built specifically for React
2. **Smaller Bundle Size**: Only includes necessary languages
3. **More Control**: Easy to customize themes and behavior
4. **Type Safety**: Full TypeScript support
5. **Performance**: Virtual DOM rendering instead of direct DOM manipulation

## Usage

### Basic Code Block
```mdx
```javascript
const hello = "world";
```
```

### With Title
```mdx
```javascript title="example.js"
const hello = "world";
```
```

### With Line Numbers
```mdx
```javascript showLineNumbers
function example() {
  return "Hello";
}
```
```

### With Line Highlighting
```mdx
```javascript highlightLines={[2, 4]}
function example() {
  const important = "This is highlighted";
  const normal = "This is not";
  return important; // This is highlighted
}
```
```
