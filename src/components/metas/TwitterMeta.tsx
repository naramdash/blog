import React from "react"

interface TwitterMetaProps {
  card?: string
  site?: string
  siteId?: string
  creator?: string
  creatorId?: string
  description?: string
  title?: string
  image?: string
  imageAlt?: string
  player?: string
  playerWidth?: string
  playerHeight?: string
  playerStream?: string
  appNameIphone?: string
  appIdIphone?: string
  appUrlIphone?: string
  appNameIpad?: string
  appIdIpad?: string
  appUrlIpad?: string
  appNameGoogleplay?: string
  appIdGoogleplay?: string
  appUrlGoogleplay?: string
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
export default function TwitterMeta(props: TwitterMetaProps) {
  const nonNullableMetas = [
    { name: "card", content: props.card },
    { name: "site", content: props.site },
    { name: "siteId", content: props.siteId },
    { name: "creator", content: props.creator },
    { name: "creatorId", content: props.creatorId },
    { name: "description", content: props.description },
    { name: "title", content: props.title },
    { name: "image", content: props.image },
    { name: "imageAlt", content: props.imageAlt },
    { name: "player", content: props.player },
    { name: "playerWidth", content: props.playerWidth },
    { name: "playerHeight", content: props.playerHeight },
    { name: "playerStream", content: props.playerStream },
    { name: "appNameIphone", content: props.appNameIphone },
    { name: "appIdIphone", content: props.appIdIphone },
    { name: "appUrlIphone", content: props.appUrlIphone },
    { name: "appNameIpad", content: props.appNameIpad },
    { name: "appIdIpad", content: props.appIdIpad },
    { name: "appUrlIpad", content: props.appUrlIpad },
    { name: "appNameGoogleplay", content: props.appNameGoogleplay },
    { name: "appIdGoogleplay", content: props.appIdGoogleplay },
    { name: "appUrlGoogleplay", content: props.appUrlGoogleplay },
  ].filter((meta) => meta.content)
  return (
    <>
      {nonNullableMetas.map((meta) => (
        <meta key={meta.name} name={meta.name} content={meta.content}></meta>
      ))}
    </>
  )
}
