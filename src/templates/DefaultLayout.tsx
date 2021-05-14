import React from "react"
import { PageProps } from "gatsby"
import { Helmet } from "react-helmet"
import Header from "../components/Header"

export default function DefaultLayout(props: PageProps) {
  return (
    <div>
      <Helmet>
        <body
          data-color-mode="auto"
          data-light-theme="light"
          data-dark-theme="dark_dimmed"
          data-pathname={props.location.pathname}
        />
      </Helmet>
      <Header />
      {props.children}
    </div>
  )
}
