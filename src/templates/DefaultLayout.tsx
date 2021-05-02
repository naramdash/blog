import React from "react"
import { PageProps } from "gatsby"
import { Helmet } from "react-helmet"

export default function DefaultLayout(props: PageProps) {
  return (
    <div>
      <Helmet>
        <body
          data-color-mode="auto"
          data-light-theme="light"
          data-dark-theme="dark_dimmed"
        />
      </Helmet>
      {props.children}
    </div>
  )
}
