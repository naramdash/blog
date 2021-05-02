import React from "react"
import { PageProps, Link } from "gatsby"
import SampleComponent from "../components/SampleComponent"

export default function Home(props: PageProps) {
  return (
    <div>
      Hello world!
      <SampleComponent />
      <Link to="/404">404 링크 </Link>
    </div>
  )
}
