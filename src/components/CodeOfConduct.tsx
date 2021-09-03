import React from "react"
import * as styles from "./CodeOfConduct.module.css"

// only for main page

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

async function type(element: HTMLElement, phrase: string, typeDelay: number) {
  for (const char of phrase) {
    element.innerHTML += char
    await sleep(typeDelay)
  }
}

async function typeInsideStrong(
  element: HTMLElement,
  phrase: string,
  typeDelay: number,
) {
  const strong = document.createElement("strong")
  element.appendChild(strong)

  await type(strong, phrase, typeDelay)
}

async function enter(element: HTMLElement, typeDelay: number) {
  element.innerHTML += "<br />"
  await sleep(typeDelay)
}

const initPause = 800
const typeDelay = 70
const phrasePause = 1100
const lastPhraseTypeDelay = 300
const lastPhrasePause = 500

const phrases = [
  "✔ 핵심 문제에 집중하기",
  "✔ 쉽게 읽을 수 있는 코드 작성하기",
  "✔ 필요할 때에만 복잡성 증가하기",
  "✔ 검증 비용을 최소화하기",
]

const lastPhrase1 = "✨...그리고 "
const lastPhrase2 = "워라밸을 지키기! 🎆😋🎇"

async function render(element: HTMLElement) {
  await sleep(initPause)

  await type(element, phrases[0], typeDelay)
  await enter(element, phrasePause)
  await type(element, phrases[1], typeDelay)
  await enter(element, phrasePause)
  await type(element, phrases[2], typeDelay)
  await enter(element, phrasePause)
  await type(element, phrases[3], typeDelay)
  await enter(element, phrasePause)

  await type(element, lastPhrase1, lastPhraseTypeDelay)
  await sleep(lastPhrasePause)
  await typeInsideStrong(element, lastPhrase2, typeDelay)
}

export default function CodeOfConduct() {
  const typeDiv = React.useRef<HTMLElement>(null)
  React.useEffect(() => {
    if (typeDiv.current) render(typeDiv.current)
  }, [typeDiv.current])
  return (
    <div className={styles.container}>
      <span ref={typeDiv}></span>
      <span className={styles.cursor}></span>
    </div>
  )
}
