import clsx from "clsx"
import React from "react"
import * as styles from "./FixedButtons.module.css"

type ScrollDirection = "UP" | "DOWN"

function navigateToTop() {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" })
}

export default function FixedButtons() {
  const [scrollTop, setScrollTop] = React.useState(0)
  const [scrollDirection, setScrollDirection] = React.useState<ScrollDirection>(
    "UP",
  )

  React.useEffect(() => {
    window.onscroll = function () {
      setScrollTop((prev) => {
        setScrollDirection(
          prev < document.documentElement.scrollTop ? "DOWN" : "UP",
        )
        return document.documentElement.scrollTop
      })
    }
  }, [])
  return (
    <div className={styles.container} data-scroll-direction={scrollDirection}>
      <button
        type="button"
        className={clsx(styles.button, styles.top, styles.hidden)}
        onClick={navigateToTop}
      >
        🔝
      </button>
    </div>
  )
}
