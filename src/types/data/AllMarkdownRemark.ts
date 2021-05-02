interface AllMarkdownRemark {
  totalCount: number

  edges: {
    node: {
      id: string
      frontmatter: {
        title: string
        date: string
      }
      html: string
    }
  }[]

  pageInfo: {
    currentPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    itemCount: number
    pageCount: number
    perPage?: number
    totalCount: number
  }
}
