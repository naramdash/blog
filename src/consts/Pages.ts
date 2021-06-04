import { Title } from "./Site"

export interface Page {
  name: string
  subPath: string
  subPages: Page[]
}

const About: Page = {
  name: "About",
  subPath: "about",
  subPages: [],
}

const Portfolio: Page = {
  name: "Portfolio",
  subPath: "portfolio",
  subPages: [],
}

const Pinned: Page = {
  name: "Pinned",
  subPath: "pinned",
  subPages: [],
}

const Posts: Page = {
  name: "Posts",
  subPath: "posts",
  subPages: [],
}

const Diet: Page = {
  name: "Diet",
  subPath: "diet",
  subPages: [],
}

export const Home: Page = {
  name: Title,
  subPath: "",
  subPages: [About, Portfolio, Pinned, Posts, Diet],
}
