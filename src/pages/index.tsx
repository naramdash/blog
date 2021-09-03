import React from "react"
import { graphql, Link, PageProps } from "gatsby"
import { ArrowRightIcon } from "@primer/octicons-react"
import PostList from "../components/PostList"
import { Helmet } from "react-helmet-async"
import clsx from "clsx"
import * as styles from "./index.module.css"
import { ImageDataLike } from "gatsby-plugin-image"
import { Title } from "../consts/Site"
import CodeOfConduct from "../components/CodeOfConduct"

export default function Home(props: PageProps & { data: Data }) {
  return (
    <div>
      <Helmet>
        <title>{Title}</title>
      </Helmet>
      <Intro />
      <About />
      {/* TODO portfolio */}
      <Posts posts={props.data.allMarkdownRemark.nodes} />
    </div>
  )
}

function Intro() {
  return (
    <main className={clsx("px-5 pt-5 pb-6 mx-auto", styles.main)}>
      <h1 className="mb-2 anim-fade-in pr-6">Pits of Success</h1>
      <CodeOfConduct />
    </main>
  )
}

function About() {
  return (
    <section className={clsx(styles.about)}>
      <Link
        to="/about"
        className={clsx(
          "p-4 d-flex flex-row flex-items-center col-md-8 mx-md-auto",
          styles.title,
        )}
      >
        <h2 className="mr-1 h1">About</h2>
        <ArrowRightIcon />
      </Link>
    </section>
  )
}

interface PostsProps {
  posts: Data["allMarkdownRemark"]["nodes"]
}
function Posts(props: PostsProps) {
  return (
    <section className={clsx(styles.posts)}>
      <Link
        to="/posts"
        className={clsx(
          "p-4 d-flex flex-row flex-items-center col-md-8 mx-md-auto",
          styles.title,
        )}
      >
        <h2 className="mr-1 h1">Post</h2>
        <ArrowRightIcon />
      </Link>
      <PostList
        className={"px-4 pb-6 col-md-8 mx-md-auto"}
        posts={props.posts}
      />
    </section>
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
      excerpt: string
    }[]
  }
}
export const query = graphql`
  query {
    allMarkdownRemark(
      limit: 3
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
