import React from "react"
import { graphql, PageProps } from "gatsby"
import { Helmet } from "react-helmet-async"
import { combineMeta } from "../libs/metas"
import { TwitterID, TwitterUsername } from "../consts/Twitter"
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"

export default function Post(props: PageProps & { data: Data }) {
  console.log(props.data)
  const post = props.data.markdownRemark
  const primaryImage = getImage(post.frontmatter.primaryImage.source)!
  console.log(primaryImage)
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
    <main>
      <Helmet meta={meta}>
        <title>{post.frontmatter.title} | KimJuho's blog</title>
      </Helmet>
      <header>
        <GatsbyImage
          image={primaryImage}
          alt={post.frontmatter.primaryImage.alt}
          style={{ height: "300px" }}
        />
        {/* <img src={} /> */}
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
    }
  }
`
