import React from "react"
import { PageProps } from "gatsby"
import Header from "../components/Header"

export default function DefaultLayout(props: PageProps) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  )
}
