import { Link } from "gatsby"
import React from "react"

export default function Header() {
  return (
    <nav className="p-3 d-flex flex-row flex-items-center flex-justify-between color-bg-info">
      <Link to="/">
        <span
          className="h3 color-text-primary"
          style={{ fontFamily: "'Nanum Gothic Coding', monospace" }}
        >
          blog.juho.kim
        </span>
      </Link>
    </nav>
  )
}
