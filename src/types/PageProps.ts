import { PageProps as BasicPageProps } from "gatsby"

export default interface PageProps extends BasicPageProps {
  data: {} & Site
}

interface Site {
  site: {
    siteMetadata: {
      title: string
    }
  }
}
