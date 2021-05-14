import React from "react"

interface BasicMetaProps {
  description?: string
}
export default function BasicMeta(props: BasicMetaProps) {
  const nonNullableMetas = [
    { name: "description", content: props.description },
  ].filter((meta) => meta.content)
  return (
    <>
      {nonNullableMetas.map((meta) => (
        <meta key={meta.name} name={meta.name} content={meta.content}></meta>
      ))}
    </>
  )
}
