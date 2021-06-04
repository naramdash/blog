import { Breadcrumb } from "@primer/components"
import clsx from "clsx"
import { Link } from "gatsby"
import React from "react"
import { splitToSubLinks } from "../libs/breadcrumb"
import * as styles from "./Header.module.css"

interface HeaderProps {
  location: Location
}
export default function Header(props: HeaderProps) {
  const subPaths = splitToSubLinks(props.location.pathname)

  return (
    <nav
      className={clsx(
        "p-3 color-shadow-extra-large d-flex flex-row flex-items-center flex-justify-between",
        styles.header,
      )}
    >
      <Breadcrumb>
        {subPaths.map((subPath) => (
          <Breadcrumb.Item
            key={subPath.pathname}
            as={Link}
            to={subPath.pathname}
          >
            <span
              className="h4"
              style={{ fontFamily: "'Nanum Gothic Coding', monospace" }}
            >
              {subPath.name}
            </span>
          </Breadcrumb.Item>
        ))}
        <Breadcrumb.Item as="span"></Breadcrumb.Item>
      </Breadcrumb>
    </nav>
  )
}
