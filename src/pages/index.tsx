import React from "react"
import { PageProps } from "gatsby"

import theme from "@primer/components/lib/theme"
import Header from "@primer/components/lib/Header"
import StyledOcticon from "@primer/components/lib/StyledOcticon"
import Avatar from "@primer/components/lib/Avatar"
import { MarkGithubIcon } from "@primer/octicons-react"
import Endpoint from "../consts/Endpoints"

export default function Home(props: PageProps) {
  console.log(theme.colorSchemes.dark.colors.bg)
  return (
    <div data-color-mode="auto">
      <Header>
        <Header.Item>
          <Header.Link href="#" fontSize={2}>
            <StyledOcticon icon={MarkGithubIcon} size={32} mr={2} />
            <span>GitHub</span>
          </Header.Link>
        </Header.Item>
        <Header.Item full>Menu</Header.Item>
        <Header.Item mr={0}>
          <Avatar
            src="https://github.com/octocat.png"
            size={20}
            square
            alt="@octocat"
          />
        </Header.Item>
      </Header>

      <button
        type="button"
        onClick={() =>
          fetch(`${Endpoint}/api/comments`).then((succ) => {
            const json = succ.json()
            console.log(json)
          })
        }
      >
        api를 테스트 해보아요
      </button>
    </div>
  )
}
