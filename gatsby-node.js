const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
// Use TypeScript file with CommonJS syntax
const { posts } = require('./content/metadata.ts')

// Ensure the components directory is included in the build
const { createRequire } = require('module')
const fs = require('fs')

// Copy components to generated directory to make them available during build
const copyComponents = () => {
  const componentsDir = path.join(process.cwd(), 'content/posts/react-charts-guide/components')
  const generatedComponentsDir = path.join(process.cwd(), 'src/generated/components')

  console.log('Source components directory:', componentsDir)
  console.log('Destination components directory:', generatedComponentsDir)

  // Ensure the generated components directory exists
  if (!fs.existsSync(generatedComponentsDir)) {
    console.log('Creating generated components directory...')
    fs.mkdirSync(generatedComponentsDir, { recursive: true })
  }

  // Clean the generated directory first to avoid stale files
  console.log('Cleaning generated components directory...')
  if (fs.existsSync(generatedComponentsDir)) {
    const existingFiles = fs.readdirSync(generatedComponentsDir, { withFileTypes: true })
    for (const file of existingFiles) {
      if (file.isFile()) {
        const filePath = path.join(generatedComponentsDir, file.name)
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
          console.log(`Removed old file: ${filePath}`)
        }
      }
    }
  } else {
    // Create the directory if it doesn't exist
    fs.mkdirSync(generatedComponentsDir, { recursive: true })
    console.log(`Created directory: ${generatedComponentsDir}`)
  }

  // Check if source directory exists
  if (!fs.existsSync(componentsDir)) {
    console.error('Source components directory does not exist:', componentsDir)
    return false
  }

  console.log('Source components directory exists, reading files...')

  // Read all files from the source directory
  const files = fs.readdirSync(componentsDir, { withFileTypes: true })
  console.log('Found files in components directory:', files.map(f => f.name))

  if (files.length === 0) {
    console.error('No files found in components directory')
    return false
  }

  // Create an index.ts file that re-exports all components
  let indexContent = '// Auto-generated file - do not edit\n\n'
  let copiedFiles = 0

  for (const file of files) {
    if (!file.isFile()) continue
    
    const fileName = file.name
    
    // Skip non-component files
    if (!fileName.endsWith('.tsx') && !fileName.endsWith('.ts') && !fileName.endsWith('.js') && !fileName.endsWith('.jsx')) {
      console.log(`Skipping non-component file: ${fileName}`)
      continue
    }
    
    // Skip index files to prevent circular imports
    if (fileName === 'index.ts' || fileName === 'index.tsx' || fileName === 'index.js' || fileName === 'index.jsx') {
      console.log(`Skipping index file: ${fileName}`)
      continue
    }
    
    const srcPath = path.join(componentsDir, fileName)
    const destPath = path.join(generatedComponentsDir, fileName)

    try {
      // Read the file content
      let content = fs.readFileSync(srcPath, 'utf8')
      
      // Ensure the file has a default export
      if (!content.includes('export default')) {
        console.warn(`File ${fileName} does not have a default export, skipping`)
        continue
      }
      
      // Get the component name from the file name (without extension)
      const componentName = path.basename(fileName, path.extname(fileName))
      
      // Ensure the file has a default export
      if (!content.includes('export default')) {
        // If no default export, add both named and default exports
        content += `\n\nexport { ${componentName} }\nexport default ${componentName};`
      } else if (!content.includes(`export { ${componentName} }`)) {
        // Add named export before the default export
        content = content.replace(
          /export default/g,
          `export { ${componentName} }\nexport default`
        )
      }
      
      // Write the file to the generated directory
      fs.writeFileSync(destPath, content)
      console.log(`Successfully copied ${fileName} to ${destPath}`)
      
      // Add export statement to index.ts
      indexContent += `export { default as ${componentName} } from './${componentName}'\n`
      copiedFiles++
      
    } catch (err) {
      console.error(`Error processing ${fileName}:`, err)
    }
  }
  
  // Write the index.ts file if we found any components
  if (copiedFiles > 0) {
    console.log(`  // Write index.ts file with proper exports`)
    const indexPath = path.join(generatedComponentsDir, 'index.ts')
    const newIndexContent = `// Auto-generated file - do not edit

${indexContent}
`
    fs.writeFileSync(indexPath, newIndexContent)
    console.log(`Successfully created index.ts with ${copiedFiles} components at ${indexPath}`)
    return copiedFiles > 0
  } else {
    console.error('No components were copied, something went wrong')
    return false
  }
}

// Run the component copy process
if (!copyComponents()) {
  console.error('Failed to copy components')
  process.exit(1)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    // Get the parent directory name to use in the URL
    const fileNode = getNode(node.parent)
    const fileName = fileNode.relativeDirectory
      ? `${fileNode.relativeDirectory}`
      : fileNode.name
    
    // Create the basic slug field
    createNodeField({
      name: 'slug',
      node,
      value: `/posts/${fileName}`
    })
    
    // Find corresponding post in metadata
    const slugFromPath = fileName.split('/').pop()
    const metadataForFile = posts.find(post => post.slug === slugFromPath)
    
    if (metadataForFile) {
      // Add all metadata fields from metadata.js
      Object.entries(metadataForFile).forEach(([key, value]) => {
        createNodeField({
          name: key,
          node,
          value,
        })
      })
    }
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogPost = path.resolve('./src/templates/blog-post.tsx')

  const result = await graphql(`
    query {
      allMdx(sort: { fields: { date: DESC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
            title
            date
            description
            tags
            author
            featured
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)


  if (result.errors) {
    reporter.panicOnBuild('There was an error loading your blog posts', result.errors)
    return
  }

  const posts = result.data.allMdx.nodes

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: `${blogPost}?__contentFilePath=${post.internal.contentFilePath}`,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type Mdx implements Node {
      fields: Fields
    }
    type Fields {
      slug: String
      title: String!
      date: Date! @dateformat
      description: String
      tags: [String!]
      author: String
      featured: Boolean
    }
  `)
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        // This alias allows us to import components from the content directory
        'content': path.resolve(__dirname, 'content')
      }
    }
  })
}
