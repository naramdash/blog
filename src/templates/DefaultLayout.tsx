import React from "react"
import { PageProps } from "gatsby"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function DefaultLayout(props: PageProps) {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header location={props.location} />
      {props.children}
      <Footer />
    </div>
  )
}
