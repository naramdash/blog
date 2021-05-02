import React from "react"
import { graphql, PageProps } from "gatsby"
import { Helmet } from "react-helmet"

export default function BlogPost(props: PageProps & { data: Data }) {
  const post = props.data.markdownRemark
  return (
    <div>
      <Helmet>
        <title>{post.frontmatter.title} | KimJuho's blog</title>
      </Helmet>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
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
