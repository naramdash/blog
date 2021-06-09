import React from "react"
import { PageProps } from "gatsby"
import Header from "../components/Header"
import Footer from "../components/Footer"

const ClassName = "d-flex flex-column"
const Style = { minHeight: "100vh" }
export default function DefaultLayout(props: PageProps) {
  return (
    <div>
      <div className={ClassName} style={Style}>
        <Header location={props.location} />
        {props.children}
        <Footer />
      </div>
    </div>
  )
}
