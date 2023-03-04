module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  semi: false,
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('prettier-plugin-packagejson'),
  ],
}
