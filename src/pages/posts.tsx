import React from "react"
import { graphql, PageProps } from "gatsby"
import PostList from "../components/PostList"
import { Pagination } from "@primer/components"
import { NumberParam, useQueryParam } from "use-query-params"
import { Helmet } from "react-helmet"

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
    <main className="p-4">
      <Helmet>
        <title>포스트</title>
      </Helmet>
      <h1>포스트</h1>
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
        title: string
        description: string
        date: string
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
          title
          description
          date
        }
        fields {
          slug
        }
      }
    }
  }
`
