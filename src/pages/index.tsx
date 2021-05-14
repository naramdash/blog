import React from "react"
import { graphql, Link, PageProps } from "gatsby"

import Typewriter from "typewriter-effect"
import { ArrowRightIcon } from "@primer/octicons-react"
import PostList from "../components/PostList"
import { Helmet } from "react-helmet"
// import introMainBackground from "../resources/images/intro-main-background.jpg"

export default function Home(props: PageProps & { data: Data }) {
  return (
    <div>
      <Helmet>
        <title>blog.juho.kim</title>
      </Helmet>
      <Intro />
      <Posts posts={props.data.allMarkdownRemark.nodes} />
    </div>
  )
}

function Intro() {
  return (
    <main
      className="px-4 py-6"
      style={{
        opacity: "0.5",
        // backgroundImage: ` url(${introMainBackground})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="mb-2 anim-fade-in">함수형 패러다임으로</h1>
      <div style={{ height: "8em" }}>
        <Typewriter
          onInit={(typewriter) => {
            const typeDelay = 50
            const initPause = 800
            const phrasePause = 1000
            const lastPhraseTypeDelay = 80

            const wrap = (phrase: string, noBreak?: boolean) =>
              `- ${phrase}${noBreak ? "" : "<br/>"}`

            const phrases = [
              "주어진 문제 해결에 집중하기",
              "쉽게 읽을 수 있는 코드 작성하기",
              "복잡성을 최소화하기",
              "검증 비용을 최소화하기",
            ]
            const lastPhrase = "<em>...그리고 워라밸을 지키기!</em>"

            const initTypewriter = typewriter
              .changeDelay(typeDelay)
              .pauseFor(initPause)
            // typing phrases
            phrases
              .reduce(
                (typewriter, phrase) =>
                  typewriter.typeString(wrap(phrase)).pauseFor(phrasePause),
                initTypewriter,
              )
              // typing last phrase
              .changeDelay(lastPhraseTypeDelay)
              .typeString(wrap(lastPhrase, true))
              .pauseFor(phrasePause)
              .start()
          }}
        />
      </div>
    </main>
  )
}
interface PostsProps {
  posts: Data["allMarkdownRemark"]["nodes"]
}
function Posts(props: PostsProps) {
  return (
    <section className="p-4">
      <Link to="/posts" className="mb-2 d-flex flex-row flex-items-center">
        <h2>포스트</h2>
        <ArrowRightIcon />
      </Link>
      <PostList posts={props.posts} />
    </section>
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
