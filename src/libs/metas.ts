type Meta =
  | { name: string; content: string }
  | { property: string; content: string }

enum BasicMetaName {
  description = "description",
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
enum OpenGraphMetaProperty {
  url = "og:url",
  title = "og:title",
  description = "og:description",
  image = "og:image",
  type = "og:type",
  locale = "og:locale",
}

/**
 *
 * [웹 마스터용 공유 가이드](https://developers.facebook.com/docs/sharing/webmasters/)
 * ### facebook tags
 * @prop appId - Facebook 인사이트를 사용하려면 페이지에 앱 ID를 추가해야 합니다. 인사이트를 사용하면 Facebook에서 개발자 사이트로 보내는 트래픽의 분석 결과를 볼 수 있습니다. 앱 대시보드에 앱 ID가 있습니다.
 *
 */
enum FacebookMetaProperty {
  appId = "fb:app_id",
}

/**
 * [Cards Markup Tag Reference](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup)
 * @prop card - The card type. Used with all cards.
 * @prop site - @username of website. Either twitter:site or twitter:site:id is required. Used with summary, summary_large_image, app, player cards.
 * @prop siteId - Same as twitter:site, but the user’s Twitter ID. Either twitter:site or twitter:site:id is required. Used with summary, summary_large_image, player cards.
 * @prop creator - @username of content creator. Used with summary_large_image cards.
 * @prop creatorId - Twitter user ID of content creator. Used with summary, summary_large_image cards.
 * @prop description - Description of content (maximum 200 characters). Used with summary, summary_large_image, player cards.
 * @prop title - Title of content (max 70 characters). Used with summary, summary_large_image, player cards.
 * @prop image - URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported. Used with summary, summary_large_image, player cards.
 * @prop imageAlt - A text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters. Used with summary, summary_large_image, player cards.
 * @prop player - HTTPS URL of player iframe. Used with player card.
 * @prop playerWidth - Width of iframe in pixels. Used with player card.
 * @prop playerHeight - Height of iframe in pixels. Used with player card.
 * @prop playerStream - URL to raw video or audio stream. Used with player card.
 * @prop appNameIphone - Name of your iPhone app. Used with app card.
 * @prop appIdIphone - Your app ID in the iTunes App Store (Note: NOT your bundle ID). Used with app card.
 * @prop appUrlIphone - Your app’s custom URL scheme (you must include ”://” after your scheme name). Used with app card.
 * @prop appNameIpad - A text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters. Used with summary, summary_large_image, player cards.
 * @prop appIdIpad - Your app ID in the iTunes App Store. Used with app card.
 * @prop appUrlIpad - Your app’s custom URL scheme. Used with app card.
 * @prop appNameGoogleplay - Name of your Android app. Used with app card.
 * @prop appIdGoogleplay - Your app ID in the Google Play Store. Used with app card.
 * @prop appUrlGoogleplay - Your app’s custom URL scheme. Used with app card.
 *
 */
enum TwitterMetaName {
  card = "twitter:card",
  site = "twitter:site",
  siteId = "twitter:site:id",
  creator = "twitter:creator",
  creatorId = "twitter:creator:id",
  description = "twitter:description",
  title = "twitter:title",
  image = "twitter:image",
  imageAlt = "twitter:image:alt",
  player = "twitter:player",
  playerWidth = "twitter:player:width",
  playerHeight = "twitter:player:height",
  playerStream = "twitter:player:stream",
  appNameIphone = "twitter:app:name:iphone",
  appIdIphone = "twitter:app:id:iphone",
  appUrlIphone = "twitter:app:url:iphone",
  appNameIpad = "twitter:app:name:ipad",
  appIdIpad = "twitter:app:id:ipad",
  appUrlIpad = "twitter:app:url:ipad",
  appNameGoogleplay = "twitter:app:name:googleplay",
  appIdGoogleplay = "twitter:app:id:googleplay",
  appUrlGoogleplay = "twitter:app:url:googleplay",
}

interface AllSEOMetas {
  url?: string
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  type?: "website" | "music" | "video" | "article" | "book" | "profile"
  locale?: "ko_KR" | "en_US"
  twitterCardType?: "summary" | "summary_large_image" | "player" | "app"
  twitterUsername?: string
  twitterID?: string

  // not using
  player?: string
  playerHeight?: string
  playerWidth?: string
  playerStream?: string
  facebookAppId?: string
  iphoneAppName?: string
  iphoneAppId?: string
  iphoneAppUrl?: string
  ipadAppName?: string
  ipadAppId?: string
  ipadAppUrl?: string
  googlePlayAppName?: string
  googlePlayAppId?: string
  googlePlayAppUrl?: string
}

export function combineMeta(meta: AllSEOMetas): Meta[] {
  const basicMeta = [
    ...new Map<BasicMetaName, string | undefined>([
      [BasicMetaName.description, meta.description],
    ]),
  ]
    .filter(hasContent)
    .map(toNameAndContent)

  const openGraphMeta = [
    ...new Map<OpenGraphMetaProperty, string | undefined>([
      [OpenGraphMetaProperty.url, meta.url],
      [OpenGraphMetaProperty.title, meta.title],
      [OpenGraphMetaProperty.description, meta.description],
      [OpenGraphMetaProperty.image, meta.image],
      [OpenGraphMetaProperty.type, meta.type],
      [OpenGraphMetaProperty.locale, meta.locale],
    ]),
  ]
    .filter(hasContent)
    .map(toPropertyAndContent)

  const facebookMeta = [
    ...new Map<FacebookMetaProperty, string | undefined>([
      [FacebookMetaProperty.appId, meta.description],
    ]),
  ]
    .filter(hasContent)
    .map(toPropertyAndContent)

  const twitterMeta = [
    ...new Map<TwitterMetaName, string | undefined>([
      [TwitterMetaName.card, meta.twitterCardType],
      [TwitterMetaName.site, meta.twitterUsername],
      [TwitterMetaName.siteId, meta.twitterID],
      [TwitterMetaName.creator, meta.twitterUsername],
      [TwitterMetaName.creatorId, meta.twitterID],
      [TwitterMetaName.description, meta.description],
      [TwitterMetaName.title, meta.title],
      [TwitterMetaName.image, meta.image],
      [TwitterMetaName.imageAlt, meta.imageAlt],
      [TwitterMetaName.player, meta.player],
      [TwitterMetaName.playerWidth, meta.playerWidth],
      [TwitterMetaName.playerHeight, meta.playerHeight],
      [TwitterMetaName.playerStream, meta.playerStream],
      [TwitterMetaName.appNameIphone, meta.iphoneAppName],
      [TwitterMetaName.appIdIphone, meta.iphoneAppId],
      [TwitterMetaName.appUrlIphone, meta.iphoneAppUrl],
      [TwitterMetaName.appNameIpad, meta.ipadAppName],
      [TwitterMetaName.appIdIpad, meta.ipadAppId],
      [TwitterMetaName.appUrlIpad, meta.ipadAppUrl],
      [TwitterMetaName.appNameGoogleplay, meta.googlePlayAppName],
      [TwitterMetaName.appIdGoogleplay, meta.googlePlayAppId],
      [TwitterMetaName.appUrlGoogleplay, meta.googlePlayAppUrl],
    ]),
  ]
    .filter(hasContent)
    .map(toNameAndContent)

  return [
    ...basicMeta,
    ...openGraphMeta,
    ...facebookMeta,
    ...twitterMeta,
  ] as Meta[]
}

function hasContent(meta: [string, string?]) {
  return typeof meta[1] === "string" && meta[1].length > 0
}
function toNameAndContent(meta: [string, string?]) {
  return { name: meta[0], content: meta[1] }
}
function toPropertyAndContent(meta: [string, string?]) {
  return { property: meta[0], content: meta[1] }
}
