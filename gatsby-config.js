module.exports = {
  siteMetadata: {
    title: `gold-2ct-order-funnel`,
    siteUrl: `https://offers.lucianarose.store/`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-WWCSW8Z",

        includeInDevelopment: true,
      },
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-apollo",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-57087514-16",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/lulu-favicon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-plugin-apollo",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "API",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "orderAPI",
        // Url to query from
        url: "http://localhost:3000/graphql",
      },
    },
  ],
};
