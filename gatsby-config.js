module.exports = {
  siteMetadata: {
    siteUrl: `https://www.hwclass.dev`,
    title: `hwclass.dev`,
    author: `Baris Guler`,
    description: `Personalized Generalizations: Baris Guler Personal Blog`,
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/hwclass`,
      },
      {
        name: `github`,
        url: `https://github.com/hwclass`,
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-theme-blog`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `green`,
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-136789855-1"
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        exclude: [],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
  
            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`,
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq: `daily`,
              priority: 0.7,
            }
          })
      }
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: 'https://www.hwclass.dev',
        sitemap: 'https://www.hwclass.dev/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/content/posts/*`]
      }
    }
  ]
}
