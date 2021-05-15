import React from "react"
import { graphql, PageProps } from "gatsby"
import { Helmet } from "react-helmet-async"
import CombinedMetas from "../components/metas/CombinedMeta"

export default function BlogPost(props: PageProps & { data: Data }) {
  const post = props.data.markdownRemark
  return (
    <main>
      <Helmet>
        <CombinedMetas
          url={props.location.pathname}
          title={props.data.markdownRemark.frontmatter.title}
          description={props.data.markdownRemark.frontmatter.description}
        />
        <title>{post.frontmatter.title} | KimJuho's blog</title>
      </Helmet>
      <header>
        <h1>{post.frontmatter.title}</h1>
      </header>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  )
}

interface Data {
  markdownRemark: {
    html: string
    frontmatter: {
      title: string
      description: string
    }
  }
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`
