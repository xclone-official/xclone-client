const CracoAlias = require("craco-alias");

module.exports = {
  webpack: {
    alias: {},
    plugins: [
      {
        plugin: CracoAlias,
        options: {
          source: "options",
          baseUrl: "./",
          aliases: {
            crypto: require.resolve("crypto-browserify"),
          },
        },
      },
    ],
  },
};
