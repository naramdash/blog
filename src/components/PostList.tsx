import React from "react"
import { Link } from "gatsby"
import { formatRelative } from "date-fns"
import { ko } from "date-fns/locale"
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"
import * as styles from "./PostList.module.css"
import clsx from "clsx"

interface PostListProps {
  className?: string
  posts: Post[]
}
export default function PostList(props: PostListProps) {
  const now = Date.now()
  return (
    <ul className={clsx(props.className, styles.list)}>
      {props.posts.map((post) => (
        <li
          key={post.id}
          className={"position-relative p-0 d-md-flex flex-row"}
        >
          <GatsbyImage
            image={getImage(post.frontmatter.primaryImage.source)!}
            alt={post.frontmatter.primaryImage.alt}
            className="col-md-5 col-lg-3 col-xl-2 float-md-left"
          />
          <div
            className={clsx(
              "p-3 position-absolute left-0 bottom-0 width-full position-md-relative",
              styles.frontmatter,
            )}
          >
            <Link to={post.fields.slug}>
              <h3 className="pb-1">{post.frontmatter.title}</h3>
            </Link>
            <time dateTime={post.frontmatter.date}>
              {formatRelative(new Date(post.frontmatter.date), now, {
                locale: ko,
              })}
            </time>
            <p>{post.frontmatter.description}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

interface Post {
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
}
