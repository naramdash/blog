import React from "react"

interface OpenGraphMetaProps {
  url?: string
  title?: string
  description?: string
  image?: string
  type?: string
  locale?: string
}

/**
 * [웹 마스터용 공유 가이드](https://developers.facebook.com/docs/sharing/webmasters/)
 * ### basic tags
 * @prop url - 페이지의 표준 URL입니다. 세션 변수, 사용자 식별 매개변수 또는 카운터가 포함되지 않은 그대로의 URL이어야 합니다. 이 URL의 좋아요 및 공유는 이 URL에서 집계됩니다. 예를 들어, 여러 버전의 페이지에서 좋아요와 공유를 집계하기 위해 모바일 도메인 URL은 표준 URL로 지정된 데스크톱 버전의 URL을 가리켜야 합니다.
 * @prop title - 사이트 이름과 같은 브랜드가 없는 기사의 제목입니다.
 * @prop description - 콘텐츠의 간략한 설명으로, 대개 2~4개의 문장으로 구성됩니다. 이 설명은 Facebook의 게시물 제목 아래에 표시됩니다.
 * @prop image - 사용자가 Facebook에 콘텐츠를 공유할 때 표시되는 이미지의 URL입니다. 자세한 내용은 아래를 참조하고, 고품질 미리 보기 이미지를 지정하는 방법에 대해 알아보려면 모범 사례 가이드를 확인하세요.
 * - Minimum image dimensions: 1200 (w) x 627 (h) pixels
 * - Recommended ratio: 1.91:1
 * ### addtional tags
 * @prop type - 콘텐츠의 미디어 유형입니다. 이 태그는 뉴스피드에 콘텐츠가 표시되는 방식에 영향을 줍니다. 유형을 지정하지 않는 경우 기본값은 website입니다. 각 URL은 단일 개체여야 하므로, 여러 og:type 값을 사용할 수 없습니다. 모든 개체 유형 리스트는 개체 유형 참고 자료에서 확인할 수 있습니다.
 * @prop locale - 리소스의 언어입니다. 기본값은 en_US입니다. 다른 언어로 번역 기능을 사용할 수 있으면 og:locale:alternate도 사용할 수 있습니다. 현지화에 대한 문서에서 지원되는 언어에 대해 알아보세요.
 *
 */
export default function OpenGraphMeta(props: OpenGraphMetaProps) {
  const nonNullableMetas = [
    { property: "og:url", content: props.url },
    { property: "og:title", content: props.title },
    { property: "og:description", content: props.description },
    { property: "og:image", content: props.image },
    { property: "og:type", content: props.type },
    { property: "og:locale", content: props.locale },
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
