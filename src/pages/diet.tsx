import React from "react"
import { Helmet } from "react-helmet-async"
import Diet from "../consts/Diet"
import * as style from "./diet.module.css"

export default function diet() {
  return (
    <main>
      <Helmet>
        <title>Diet | blog.juho.kim</title>
      </Helmet>
      <h1>Diet</h1>
      <iframe className={style.menu} src={Diet.menuTableLink}></iframe>
    </main>
  )
}
