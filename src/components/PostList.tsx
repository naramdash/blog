import React from "react"
import { Link } from "gatsby"
import { formatRelative } from "date-fns"
import { ko } from "date-fns/locale"

interface PostListProps {
  posts: Post[]
}
export default function PostList(props: PostListProps) {
  const now = new Date()
  return (
    <ul style={{ listStyle: "none" }}>
      {props.posts.map((post) => (
        <li key={post.id}>
          <img />
          <Link to={post.fields.slug}>
            <h3>{post.frontmatter.title}</h3>
          </Link>
          <time dateTime={post.frontmatter.date}>
            {formatRelative(new Date(post.frontmatter.date), now, {
              locale: ko,
            })}
          </time>
          <p>{post.excerpt}</p>
        </li>
      ))}
    </ul>
  )
}

interface Post {
  id: string
  frontmatter: {
    title: string
    date: string
  }
  fields: {
    slug: string
  }
  excerpt: string
}
