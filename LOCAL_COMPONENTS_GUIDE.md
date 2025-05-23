# Local Components in MDX - Solution Guide

## Problem
When using local components in MDX files with Gatsby, you may encounter:
1. Components not being recognized in MDX files
2. SSR (Server-Side Rendering) errors with client-only libraries like Chart.js
3. "Component is not available" warnings in the browser

## Solution Overview

The solution involves:
1. Dynamic imports for local components
2. Browser environment checks for SSR compatibility
3. Lazy loading with loading states

## Implementation

### 1. Blog Post Template (`src/templates/blog-post.tsx`)

The template uses a `ChartComponentLoader` that:
- Only loads components in the browser environment
- Shows loading states during component initialization
- Handles dynamic imports based on component names

```typescript
const ChartComponentLoader = ({ componentName }: { componentName: string }) => {
  const [Component, setComponent] = React.useState<React.ComponentType<any> | null>(null)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dynamic import based on componentName
    }
  }, [componentName])

  // Loading state
  if (!Component) {
    return <div>Loading {componentName}...</div>
  }

  return <Component />
}
```

### 2. Component Wrappers

Each local component is wrapped to use the loader:
```typescript
const SalesChart = () => <ChartComponentLoader componentName="SalesChart" />
```

### 3. SSR Protection in Components

Each chart component includes browser checks:
```typescript
if (typeof window === 'undefined') {
  return <div>Loading chart...</div>
}
```

## Adding New Posts with Local Components

1. Create your post folder: `content/posts/my-new-post/`
2. Add components in `content/posts/my-new-post/components/`
3. Update `blog-post.tsx`:

```typescript
// In ChartComponentLoader
case 'MyComponent':
  import('../../content/posts/my-new-post/components/MyComponent').then(mod => {
    setComponent(() => mod.default)
  })
  break

// In getLocalComponents
case '/posts/my-new-post/':
  return {
    MyComponent,
  }

// Create wrapper
const MyComponent = () => <ChartComponentLoader componentName="MyComponent" />
```

## Benefits

1. **No Build Errors**: SSR issues are handled gracefully
2. **Better Performance**: Components are loaded on-demand
3. **User Experience**: Loading states prevent layout shifts
4. **Scalability**: Easy to add new posts with local components

## Alternative Approaches

If you prefer a different approach:

1. **gatsby-plugin-mdx componentPath**: Configure MDX plugin to auto-import from specific paths
2. **Static Imports with SSR Wrapper**: Import all components statically but wrap in SSR checks
3. **Webpack Aliases**: Configure webpack to resolve component paths

The current solution balances simplicity, performance, and maintainability for most use cases.
