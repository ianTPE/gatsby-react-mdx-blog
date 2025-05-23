import React from "react"
import { useStaticQuery, graphql } from "gatsby"

interface SEOProps {
  title?: string
  description?: string
  lang?: string
  meta?: Array<{
    name: string
    content: string
  }>
}

const SEO: React.FC<SEOProps> = ({ title, description, lang = "en", meta = [] }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const finalTitle = title ? `${title} | ${defaultTitle}` : defaultTitle

  return (
    <>
      <html lang={lang} />
      <title>{finalTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {meta.map((item, index) => (
        <meta key={index} name={item.name} content={item.content} />
      ))}
    </>
  )
}

export default SEO
