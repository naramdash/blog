import React from "react"
import { Link, PageProps } from "gatsby"
import { Flex, Link as PrimerLink } from "@primer/components"

export default function NotFound(props: PageProps) {
  return (
    <div className="p-4">
      <pre className="mb-4">
        {`
██╗  ██╗ ██████╗ ██╗  ██╗                                                   
██║  ██║██╔═████╗██║  ██║                                                   
███████║██║██╔██║███████║                                                   
╚════██║████╔╝██║╚════██║                                                   
     ██║╚██████╔╝     ██║                                                   
     ╚═╝ ╚═════╝      ╚═╝                                                   
                                                                            
███╗   ██╗ ██████╗ ████████╗    ███████╗ ██████╗ ██╗   ██╗███╗   ██╗██████╗ 
████╗  ██║██╔═══██╗╚══██╔══╝    ██╔════╝██╔═══██╗██║   ██║████╗  ██║██╔══██╗
██╔██╗ ██║██║   ██║   ██║       █████╗  ██║   ██║██║   ██║██╔██╗ ██║██║  ██║
██║╚██╗██║██║   ██║   ██║       ██╔══╝  ██║   ██║██║   ██║██║╚██╗██║██║  ██║
██║ ╚████║╚██████╔╝   ██║       ██║     ╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝
╚═╝  ╚═══╝ ╚═════╝    ╚═╝       ╚═╝      ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝                                                                            
`}
      </pre>

      <Flex flexDirection="column" style={{ gap: "10px" }}>
        <Link to="/">홈으로 가기</Link>
        <PrimerLink as="a" onClick={() => history.back()}>
          뒤로 가기
        </PrimerLink>
      </Flex>
    </div>
  )
}
