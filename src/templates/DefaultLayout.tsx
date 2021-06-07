import React from "react"
import { PageProps } from "gatsby"
import Header from "../components/Header"
import Footer from "../components/Footer"
import * as styles from "./DefaultLayout.module.css"

export default function DefaultLayout(props: PageProps) {
  return (
    <div className={styles.container}>
      <Header location={props.location} />
      {props.children}
      <Footer />
    </div>
  )
}
