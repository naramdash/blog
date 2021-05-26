import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import SampleComponent from "../components/SampleComponent"

export default function Home(props: PageProps & { data: Data }) {
  return (
    <div>
      Hello world!
      <SampleComponent />
      <Link to="/404">404 링크 </Link>
      <span>metadata: '{props.data.site.siteMetadata.title}'</span>
      <span>
        metadata: '
        {props.data.allMarkdownRemark.edges.map(
          (edge) => edge.node.frontmatter.date,
        )}
        '
      </span>
    </div>
  )
}

interface Data {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        frontmatter: {
          date: string
        }
      }
    }[]
  }
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            date
          }
        }
      }
    }
  }
`
