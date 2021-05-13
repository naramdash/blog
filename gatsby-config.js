/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  // siteMetadata: { [key: string]: any }
  siteMetadata: {
    title: "Blog of Kim Juho",
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-use-query-params`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        // start with "gatsby-remark-..."
        // - gatsby-remark-images
        // - gatsby-remark-copy-linked-files
        // - gatsby-remark-prismjs
        plugins: [],
      },
    },
  ],
}
