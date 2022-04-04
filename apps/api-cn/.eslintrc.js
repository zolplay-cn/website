const config = require('config/eslint-nest')

module.exports = {
  ...config,
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    '.eslintrc.js',
    'prisma',
    'dist',
    'node_modules',
    'src/schema.graphql',
    'ecosystem.config.js',
  ],
}
