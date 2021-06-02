import { Home, Page } from "../consts/Pages"

function revisePathname(pathname: string) {
  const startWithSlash = pathname.startsWith("/") ? pathname : `/${pathname}`
  const endWithoutSlash =
    startWithSlash.length > 1 && startWithSlash.endsWith("/")
      ? startWithSlash.slice(0, startWithSlash.length - 1)
      : startWithSlash

  return endWithoutSlash
}

type Link = { name: string; subPath: string; pathname: string }
export function splitToSubLinks(pathname: string): Link[] {
  const revisedPathname = revisePathname(pathname)
  if (revisedPathname === "/")
    return [
      {
        name: Home.name,
        subPath: Home.subPath,
        pathname: "/",
      },
    ]

  function _find(
    subPaths: string[],
    subPages: Page[],
    hierarchy: Link[],
  ): Link[] {
    if (subPaths.length === 0) return hierarchy

    const retrievedSubpage = subPages.find(
      (subPage) => subPage.subPath === subPaths[0],
    )

    if (retrievedSubpage === null || retrievedSubpage === undefined)
      return [
        ...hierarchy,
        {
          name: subPaths[0],
          subPath: subPaths[0],
          pathname: [...hierarchy.map((h) => h.subPath), subPaths[0]].join("/"),
        },
      ]
    else {
      return _find(subPaths.slice(1), retrievedSubpage.subPages, [
        ...hierarchy,
        {
          name: retrievedSubpage.name,
          subPath: retrievedSubpage.subPath,
          pathname: [
            ...hierarchy.map((h) => h.subPath),
            retrievedSubpage.subPath,
          ].join("/"),
        },
      ])
    }
  }

  return _find(revisedPathname.split("/"), [Home], []).map((subLink) =>
    subLink.pathname === "" ? { ...subLink, pathname: "/" } : subLink,
  )
}
