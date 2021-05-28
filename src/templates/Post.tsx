import React from "react"
import { graphql, PageProps } from "gatsby"
import { Helmet } from "react-helmet-async"
import { combineMeta } from "../libs/metas"
import { TwitterID, TwitterUsername } from "../consts/Twitter"
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"
import { formatRelative } from "date-fns"
import { ko } from "date-fns/locale"
import { Label, LabelGroup } from "@primer/components"
import * as styles from "./Post.module.css"
import clsx from "clsx"

export default function Post(props: PageProps & { data: Data }) {
  const post = props.data.markdownRemark
  const primaryImage = getImage(post.frontmatter.primaryImage.source)!
  const meta = combineMeta({
    url: props.location.href,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    image: primaryImage.images.fallback!.src,
    imageAlt: post.frontmatter.primaryImage.alt,
    type: "website",
    locale: "ko_KR",
    twitterCardType: "summary",
    twitterUsername: TwitterUsername,
    twitterID: TwitterID,
  })
  return (
    <main className={clsx(styles.main)}>
      <Helmet meta={meta}>
        <title>{post.frontmatter.title} | blog.juho.kim</title>
      </Helmet>
      <header>
        <GatsbyImage
          image={primaryImage}
          alt={post.frontmatter.primaryImage.alt}
        />
        <div className={clsx("p-4 pb-6", styles.frontmatter)}>
          <h1>{post.frontmatter.title}</h1>
          <time dateTime={post.frontmatter.date}>
            {formatRelative(new Date(post.frontmatter.date), Date.now(), {
              locale: ko,
            })}
          </time>
          <p>{post.frontmatter.description}</p>
          <LabelGroup>
            {post.frontmatter.tags.map((tag) => (
              <Label outline>{tag}</Label>
            ))}
          </LabelGroup>
        </div>
      </header>
      <div
        className="px-3 py-6"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </main>
  )
}

interface Data {
  markdownRemark: {
    html: string
    frontmatter: {
      title: string
      date: string
      description: string
      tags: string[]
      primaryImage: {
        source: ImageDataLike
        alt: string
      }
    }
  }
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        description
        tags
        primaryImage {
          source {
            childImageSharp {
              gatsbyImageData
            }
          }
          alt
        }
      }
    }
  }
`
