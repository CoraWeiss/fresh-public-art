const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      tty: require.resolve('tty-browserify')
    }
  },
  // Your other Webpack configurations...
};



