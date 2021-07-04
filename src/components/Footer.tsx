import {
  FileIcon,
  HomeFillIcon,
  MailIcon,
  MarkGithubIcon,
  PencilIcon,
  PersonIcon,
  PinIcon,
  SquirrelIcon,
  TerminalIcon,
} from "@primer/octicons-react"
import clsx from "clsx"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import React from "react"
import FacebookSvg from "../resources/images/services/FacebookSvg"
import InstagramSvg from "../resources/images/services/InstagramSvg"
import LinkedInSvg from "../resources/images/services/LinkedInSvg"
import * as styles from "./Footer.module.css"

const IconSize = 30

export default function Footer() {
  return (
    <footer className={clsx("px-6 pt-6 pb-6 color-bg-tertiary", styles.footer)}>
      <div className="d-flex flex-row flex-wrap flex-justify-around">
        <Navigation />
        <Tools />
        <Address />
      </div>

      <Copyright />
    </footer>
  )
}

function Navigation() {
  return (
    <nav className="col-12 col-md-3 mb-6">
      <h3 className="mb-5">Pages</h3>
      <ul>
        <li>
          <Link to="/" className={styles.pageItem}>
            <HomeFillIcon className="color-text-primary" size={IconSize} />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/about" className={styles.pageItem}>
            <PersonIcon className="color-text-primary" size={IconSize} />
            <span>About</span>
          </Link>
        </li>
        <li>
          <Link to="/portfolio" className={styles.pageItem}>
            <TerminalIcon className="color-text-primary" size={IconSize} />
            <span>Portfolio</span>
          </Link>
        </li>
        <li>
          <Link to="/posts" className={styles.pageItem}>
            <FileIcon className="color-text-primary" size={IconSize} />
            <span>Posts</span>
          </Link>
        </li>
        <li>
          <Link to="/diet" className={styles.pageItem}>
            <SquirrelIcon className="color-text-primary" size={IconSize} />
            <span>Diet</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

function Tools() {
  return (
    <nav className="col-12 col-md-3 mb-6">
      <h3 className="mb-5">Tools</h3>
      <ul>
        <li>
          <Link to="/tools/azure-resource-namer" className={styles.pageItem}>
            <PencilIcon className="color-text-primary" size={IconSize} />
            <span>Azure Resource Namer</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

function Address() {
  return (
    <address className="col-12 col-md-3 mb-6">
      <h3 className="mb-5">Contacts</h3>
      <ul>
        <li>
          <a
            href="mailto:juho_kim@outlook.com"
            target="_blank"
            className={clsx(styles.contactItem)}
          >
            <MailIcon className="color-text-primary" size={IconSize} />
            <span>Mail</span>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/naramdash"
            target="_blank"
            className={clsx(styles.contactItem)}
          >
            <MarkGithubIcon className="color-text-primary" size={IconSize} />
            <span>GitHub</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/kimjuhodev/"
            target="_blank"
            className={clsx(styles.contactItem)}
          >
            <LinkedInSvg iconSize={IconSize} />
            <span>LinkedIn</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.rocketpunch.com/@kimjuho"
            target="_blank"
            className={clsx(styles.contactItem)}
          >
            <StaticImage
              src="../resources/images/services/rocketpunch.png"
              alt="rocketpunch icon"
              height={IconSize}
            />
            <span>RocketPunch</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/profile.php?id=100009368721140"
            target="_blank"
            className={clsx(styles.contactItem)}
          >
            <FacebookSvg iconSize={IconSize} />
            <span>Facebook</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/naram.dash/"
            target="_blank"
            className={clsx(styles.contactItem)}
          >
            <InstagramSvg iconSize={IconSize} />
            <span>Instagram</span>
          </a>
        </li>
      </ul>
    </address>
  )
}

function Copyright() {
  return (
    <div className="d-flex flex-justify-center mt-md-4">
      <span>Copyright 2021. Kim Juho. All rights reserved.</span>
    </div>
  )
}
