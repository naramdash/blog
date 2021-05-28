import React from "react"
import Diet from "../consts/Diet"
import * as style from "./diet.module.css"

export default function diet() {
  return (
    <main>
      <h1>다이어트</h1>
      <iframe className={style.menu} src={Diet.menuTableLink}></iframe>
    </main>
  )
}
