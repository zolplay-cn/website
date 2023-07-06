const zolplay = require('@zolplay/prettier-config')

module.exports = {
  ...zolplay,
  plugins: [...zolplay.plugins, require('prettier-plugin-packagejson')],
}
