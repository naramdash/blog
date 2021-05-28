import React from "react"
import Diet from "../consts/Diet"

export default function diet() {
  return (
    <main>
      <h1>다이어트</h1>
      <iframe
        style={{ width: "100%", maxWidth: "1170px", minHeight: "800px" }}
        src={Diet.menuTableLink}
      ></iframe>
    </main>
  )
}
