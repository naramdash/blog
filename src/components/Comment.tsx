import React from "react"
import { DefaultRepo, DefaultLabel } from "../consts/Comment"

export default function Comment() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isUserThemeDark =
    globalThis?.matchMedia &&
    globalThis.matchMedia("(prefers-color-scheme: dark)").matches

  React.useEffect(() => {
    const utterances = document.createElement("script")
    const attributes = {
      src: "https://utteranc.es/client.js",
      repo: DefaultRepo,
      "issue-term": "pathname",
      label: DefaultLabel,
      theme: isUserThemeDark ? "github-dark" : "github-light",
      crossOrigin: "anonymous",
      async: "true",
    }
    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })
    containerRef?.current?.appendChild(utterances)
  }, [isUserThemeDark])

  return <div id="comment" ref={containerRef} />
}
