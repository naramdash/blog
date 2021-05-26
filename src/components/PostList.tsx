import React from "react"
import { Link } from "gatsby"
import { formatRelative } from "date-fns"
import { ko } from "date-fns/locale"
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"
import * as styles from "./PostList.module.css"
import clsx from "clsx"
import { BorderBox } from "@primer/components"

interface PostListProps {
  posts: Post[]
}
export default function PostList(props: PostListProps) {
  const now = new Date()
  return (
    <ul className={styles.list}>
      {props.posts.map((post) => (
        <BorderBox key={post.id} as="li" className={clsx("p-2", styles.item)}>
          <GatsbyImage
            image={getImage(post.frontmatter.primaryImage.source)!}
            alt={post.frontmatter.primaryImage.alt}
          />
          <div className={clsx("p-3", styles.frontmatter)}>
            <Link to={post.fields.slug}>
              <h3>{post.frontmatter.title}</h3>
            </Link>
            <time dateTime={post.frontmatter.date}>
              {formatRelative(new Date(post.frontmatter.date), now, {
                locale: ko,
              })}
            </time>
            <p>{post.frontmatter.description}</p>
          </div>
        </BorderBox>
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
