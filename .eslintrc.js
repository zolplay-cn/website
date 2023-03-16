// @ts-check
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  extends: 'next',
  plugins: ['simple-import-sort', 'unused-imports', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'warn',
    'react-hooks/exhaustive-deps': 'error',
    'unused-imports/no-unused-imports': 'error',
  },
})
