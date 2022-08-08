module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}

// const px2viewport = require('postcss-px-to-viewport')
// module.exports = {
//   plugins: [
//     px2viewport({
//       unitToConvert: 'px',
//       viewportwidth: 375,
//       unitPrecision: 3,
//       viewportunit: 'vw'
//     }),
//     px2viewport({
//       unitToConvert: 'px',
//       viewportWidth: 750,
//       unitPrecision: 3,
//       viewportUnit: 'vw',
//       exclude: [/node modules/]
//     })
//   ]
// }
