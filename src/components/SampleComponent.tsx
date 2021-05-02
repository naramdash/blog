import React from "react"
import * as styles from "./sample-component.module.css"

export default function SampleComponent() {
  console.log(styles)
  return (
    <div>
      Sample... with button <button type="button">click me</button>
    </div>
  )
}
