// @ts-check
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  extends: '@zolplay',
  rules: {
    'react-hooks/exhaustive-deps': 'error',
    'no-console': 'off',
  },
})
