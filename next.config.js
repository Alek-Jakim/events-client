module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com"
    ]
  },
  env: {
    MAPBOX_API_TOKEN: "pk.eyJ1IjoiYWxlazU1NCIsImEiOiJja3licHEzN3EwM204MnV1cjFlbG1xaGN4In0.1sHssLtA63pHXiX6kyZ4RA",
    GEOAPIFY_API_KEY: "f410b36b9b284381b850eeeebb3d2348"
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }, async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://djevents-aleksandar.vercel.app/:path*',
      },
    ]
  },
}
