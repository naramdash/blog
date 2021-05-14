import React from "react"
import BasicMeta from "./BasicMeta"
import FacebookMeta from "./FacebookMeta"
import OpenGraphMeta from "./OpenGraphMeta"
import TwitterMeta from "./TwitterMeta"

interface CombinedMetasProps {
  description?: string
  url?: string
  title?: string
  image?: string
  imageAlt?: string
  player?: string
  playerHeight?: string
  playerWidth?: string
  playerStream?: string
  type?: string
  locale?: string
  facebookAppId?: string
  twitterCardType?: string
  twitterUsername?: string
  twitterID?: string
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

export default function CombinedMetas(props: CombinedMetasProps) {
  return (
    <>
      <BasicMeta description={props.description} />
      <OpenGraphMeta
        url={props.url}
        title={props.title}
        description={props.description}
        image={props.image}
        type={props.type}
        locale={props.locale}
      />
      <FacebookMeta appId={props.facebookAppId} />
      <TwitterMeta
        card={props.twitterCardType}
        site={props.twitterUsername}
        siteId={props.twitterID}
        creator={props.twitterUsername}
        creatorId={props.twitterID}
        description={props.description}
        title={props.title}
        image={props.image}
        imageAlt={props.imageAlt}
        player={props.player}
        playerHeight={props.playerHeight}
        playerWidth={props.playerWidth}
        playerStream={props.playerStream}
        appNameIphone={props.iphoneAppName}
        appIdIphone={props.iphoneAppId}
        appUrlIphone={props.iphoneAppUrl}
        appNameIpad={props.ipadAppName}
        appIdIpad={props.ipadAppId}
        appUrlIpad={props.ipadAppUrl}
        appNameGoogleplay={props.googlePlayAppName}
        appIdGoogleplay={props.googlePlayAppId}
        appUrlGoogleplay={props.googlePlayAppUrl}
      />
    </>
  )
}
