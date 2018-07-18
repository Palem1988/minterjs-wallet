// Custom Jest transform implementation that wraps babel-jest and injects our
// babel presets, so we don't have to use .babelrc.

module.exports = require('babel-register')({
  presets: [
    [
      'env'
    ]
  ],
  ignore: /node_modules\/(?!minterjs-util|some-other-module)/,
  env: {
    test: {
      plugins: [
        'istanbul'
      ]
    }
  }
})
