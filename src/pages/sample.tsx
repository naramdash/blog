import React from "react"
import { Link, graphql } from "gatsby"
import PageProps from "../types/PageProps"
import SampleComponent from "../components/SampleComponent"

export default function Home(props: PageProps) {
  return (
    <div>
      Hello world!
      <SampleComponent />
      <Link to="/404">404 링크 </Link>
      <span>metadata: '{props.data.site.siteMetadata.title}'</span>
    </div>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
