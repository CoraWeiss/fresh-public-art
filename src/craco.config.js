const path = require('path');

module.exports = {
  webpack: {
    alias: {},
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        tty: require.resolve('tty-browserify'),
      };
      return webpackConfig;
    },
  },
};
