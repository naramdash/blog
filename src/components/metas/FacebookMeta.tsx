import React from "react"

interface FacebookMetaProps {
  appId?: string
}

/**
 *
 * [웹 마스터용 공유 가이드](https://developers.facebook.com/docs/sharing/webmasters/)
 * ### facebook tags
 * @prop appId - Facebook 인사이트를 사용하려면 페이지에 앱 ID를 추가해야 합니다. 인사이트를 사용하면 Facebook에서 개발자 사이트로 보내는 트래픽의 분석 결과를 볼 수 있습니다. 앱 대시보드에 앱 ID가 있습니다.
 *
 */
export default function FacebookMeta(props: FacebookMetaProps) {
  const nonNullableMetas = [
    { property: "fb:app_id", content: props.appId },
  ].filter((meta) => meta.content)
  return (
    <>
      {nonNullableMetas.map((meta) => (
        <meta
          key={meta.property}
          property={meta.property}
          content={meta.content}
        ></meta>
      ))}
    </>
  )
}
