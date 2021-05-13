import React from "react"
import { graphql, PageProps } from "gatsby"
import { Helmet } from "react-helmet"

export default function BlogPost(props: PageProps & { data: Data }) {
  const post = props.data.markdownRemark
  return (
    <article>
      <Helmet>
        <title>{post.frontmatter.title} | KimJuho's blog</title>
      </Helmet>
      <header>
        <h1>{post.frontmatter.title}</h1>
      </header>
      <main>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </main>
    </article>
  )
}

interface Data {
  markdownRemark: {
    html: string
    frontmatter: {
      title: string
    }
  }
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
