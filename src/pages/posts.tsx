import React from "react"
import { graphql, PageProps } from "gatsby"
import PostList from "../components/PostList"
import { Pagination } from "@primer/components"
import { NumberParam, useQueryParam } from "use-query-params"
import { Helmet } from "react-helmet-async"
import { ImageDataLike } from "gatsby-plugin-image"
import * as styles from "./posts.module.css"
import clsx from "clsx"
import { Title } from "../consts/Site"

const size = 10

export default function Posts(props: PageProps & { data: Data }) {
  const [page, setPage] = useQueryParam("page", NumberParam)

  const posts = props.data.allMarkdownRemark.nodes

  // querying at front
  const filteredPosts = posts.filter((post) => true)
  const pageCount = Math.ceil(filteredPosts.length / size)

  // pagination slicing
  const currentPage = page ?? 1
  const pagedPosts = filteredPosts.slice(
    (currentPage - 1) * size,
    currentPage * size,
  )

  function onPageChange(
    event: React.MouseEvent<Element, MouseEvent>,
    page: number,
  ) {
    setPage(page)
  }

  return (
    <main className={clsx("p-4", styles.main)}>
      <Helmet>
        <title>Posts | {Title}</title>
      </Helmet>
      <h1 className="h1 mb-4">Posts</h1>
      <PostList posts={pagedPosts} />
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={onPageChange}
      />
    </main>
  )
}

interface Data {
  allMarkdownRemark: {
    nodes: {
      id: string
      frontmatter: {
        date: string
        title: string
        description: string
        primaryImage: {
          source: ImageDataLike
          alt: string
        }
      }
      fields: {
        slug: string
      }
    }[]
  }
}
export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { public: { eq: true } } }
    ) {
      nodes {
        id
        frontmatter {
          date
          title
          description
          primaryImage {
            source {
              childImageSharp {
                gatsbyImageData
              }
            }
            alt
          }
        }
        fields {
          slug
        }
      }
    }
  }
`
