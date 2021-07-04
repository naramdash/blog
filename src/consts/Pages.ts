import { Title } from "./Site"

export interface Page {
  name: string
  subPath: string
  subPages: Page[]
}

// 2-depth

const AzureResourceNamer: Page = {
  name: "Azure Resource Namer",
  subPath: "azure-resource-namer",
  subPages: [],
}

// 1-depth

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

const Tools: Page = {
  name: "Tools",
  subPath: "tools",
  subPages: [AzureResourceNamer],
}

// 0-depth

export const Home: Page = {
  name: Title,
  subPath: "",
  subPages: [About, Portfolio, Posts, Diet, Tools],
}
