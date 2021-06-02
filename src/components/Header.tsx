import { Breadcrumb } from "@primer/components"
import { Link } from "gatsby"
import React from "react"
import { splitToSubLinks } from "../libs/breadcrumb"

interface HeaderProps {
  location: Location
}
export default function Header(props: HeaderProps) {
  const subPaths = splitToSubLinks(props.location.pathname)

  console.log(subPaths)

  return (
    <nav className="p-3 color-shadow-extra-large d-flex flex-row flex-items-center flex-justify-between color-bg-info">
      <Breadcrumb>
        {subPaths.map((subPath) => (
          <Breadcrumb.Item
            key={subPath.pathname}
            as={Link}
            to={subPath.pathname}
          >
            <span
              className="h4 color-text-primary"
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
