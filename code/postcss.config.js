const varCss = require('./src/scss/vars');
const mixins = require('./src/scss/mixins');
module.exports = {
  plugins: [
    require('postcss-cssnext')({
      browsers: ['last 10 versions'],
      features: {
        customProperties: {
          variables: varCss
        },
        applyRule: {
          sets: mixins
        }
      }
    })
  ]
};