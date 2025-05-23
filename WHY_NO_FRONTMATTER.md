# Why No Frontmatter?

This blog uses a **centralized metadata** approach instead of frontmatter in MDX files. Here's why:

## 🎯 Benefits

### 1. **Cleaner Content Files**
```mdx
// With frontmatter (traditional)
---
title: "My Post"
date: "2024-01-30"
tags: ["react", "tutorial"]
---

Content starts here...

// Without frontmatter (our approach)
Content starts immediately! Pure and simple.
```

### 2. **Single Source of Truth**
All metadata in `content/metadata.js`:
- Easy to see all posts at a glance
- Simple to update multiple posts
- Type-safe with TypeScript
- Great for generating sitemaps, RSS feeds, etc.

### 3. **Better Performance**
- No need to parse MDX files for metadata
- Faster build times
- Metadata available immediately

### 4. **Easier Management**
- Update post dates, titles, tags without touching content
- Bulk operations are simple
- Clean git history (metadata changes separate from content)

## 📝 How It Works

1. **Metadata File** (`content/metadata.js`):
   ```javascript
   const posts = [
     {
       slug: "hello-world",
       title: "Hello World",
       date: "2024-01-15",
       description: "My first post",
       tags: ["intro"],
     }
   ]
   ```

2. **MDX File** (`content/posts/hello-world/content.mdx`):
   ```mdx
   Welcome to my blog! No frontmatter needed.
   
   Just start writing...
   ```

3. **Gatsby Creates Fields**: During build, Gatsby reads metadata and attaches it to MDX nodes

## 🚀 Quick Start

Add a new post:
1. Add to `metadata.js`
2. Create `content/posts/[slug]/content.mdx`
3. Write content
4. Done!

No frontmatter = Cleaner code + Better performance + Easier management 🎉
