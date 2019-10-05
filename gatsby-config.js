module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-blog`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-136789855-1"
      },
    }
  ],
  // Customize your site metadata:
  siteMetadata: {
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
}
