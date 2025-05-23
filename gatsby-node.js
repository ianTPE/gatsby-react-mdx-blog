const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const metadata = require(`./content/metadata`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    
    // Get the slug from the directory name
    const slug = `/posts/${parsedFilePath.dir}/`
    
    // Find metadata for this post
    const postMetadata = metadata.posts.find(post => `/posts/${post.slug}/` === slug)
    
    // Create fields from metadata
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
    
    if (postMetadata) {
      createNodeField({
        name: `title`,
        node,
        value: postMetadata.title,
      })
      
      createNodeField({
        name: `date`,
        node,
        value: postMetadata.date,
      })
      
      createNodeField({
        name: `description`,
        node,
        value: postMetadata.description,
      })
      
      createNodeField({
        name: `tags`,
        node,
        value: postMetadata.tags || [],
      })
      
      createNodeField({
        name: `author`,
        node,
        value: postMetadata.author || '',
      })
      
      createNodeField({
        name: `featured`,
        node,
        value: postMetadata.featured || false,
      })
    }
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)

  const result = await graphql(`
    query {
      allMdx(sort: {fields: {date: DESC}}, limit: 1000) {
        nodes {
          id
          fields {
            slug
            title
            date
            description
            tags
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
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
          slug: post.fields.slug,
          metadata: post.fields,
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
      date: Date @dateformat
      description: String
      tags: [String]
      author: String
      featured: Boolean
    }
  `)
}

// Configure webpack to handle local component imports
exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  const config = getConfig()
  
  // Add alias for resolving local components
  config.resolve.alias = {
    ...config.resolve.alias,
    '@content': path.resolve(__dirname, 'content'),
  }
  
  actions.replaceWebpackConfig(config)
}
