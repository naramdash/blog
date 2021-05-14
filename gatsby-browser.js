import "./src/styles/global.scss"
import "prismjs/themes/prism-tomorrow.css"

import React from "react"
import DefaultLayout from "./src/templates/DefaultLayout"

export function wrapPageElement({ element, props }) {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <DefaultLayout {...props}>{element}</DefaultLayout>
}
