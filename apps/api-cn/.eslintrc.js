const config = require('config/eslint-nest')

module.exports = {
  ...config,
  parserOptions: {
    project: 'apps/api-cn/tsconfig.json',
    sourceType: 'module',
  },
  ignorePatterns: [
    '.eslintrc.js',
    'prisma',
    'dist',
    'node_modules',
    'src/schema.graphql',
  ],
}
