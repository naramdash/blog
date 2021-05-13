import React from "react"
import { PageProps } from "gatsby"

import Typewriter from "typewriter-effect"
import Header from "../components/Header"

export default function Home(props: PageProps) {
  return (
    <div>
      <Header />
      <Intro />
    </div>
  )
}

function Intro() {
  return (
    <section className="p-4">
      <h2 className="mb-2">함수형 패러다임으로</h2>
      <Typewriter
        onInit={(typewriter) => {
          const typeDelay = 50
          const initPause = 1100
          const phrasePause = 1000
          const lastPhraseTypeDelay = 80

          const wrap = (phrase: string, noBreak?: boolean) =>
            `- ${phrase}${noBreak ? "" : "<br/>"}`

          const phrases = [
            "주어진 문제의 해결에 집중하기",
            "쉽게 읽을 수 있는 코드 작성하기",
            "복잡성을 최소화하기",
            "검증 비용을 최소화하기",
          ]
          const lastPhrase = "...그리고 워라밸을 지키기!"

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
        options={{
          // autoStart: true,
          loop: false,
          devMode: false,
        }}
      />
    </section>
  )
}
