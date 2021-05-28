import React from "react"
import { PageProps } from "gatsby"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function DefaultLayout(props: PageProps) {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}
