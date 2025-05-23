const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
// Use TypeScript file with CommonJS syntax
const { posts } = require('./content/metadata.ts')

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
      title: String
      description: String
      date: Date @dateformat
      tags: [String]
      author: String
      featured: Boolean
      slug: String
    }
  `)
}
