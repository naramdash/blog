import clsx from "clsx"
import React, { useEffect, useState } from "react"
import * as styles from "./FixedButtons.module.css"

type ScrollDirection = "UP" | "DOWN"

function navigateToTop() {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" })
}

export default function FixedButtons() {
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("UP")

  useEffect(() => {
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
    <div className={styles.container}>
      <button
        type="button"
        className={clsx(
          styles.button,
          styles.top,
          scrollDirection === "UP" && styles.hidden,
        )}
        onClick={navigateToTop}
      >
        🔝
      </button>
    </div>
  )
}
