import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

const base = antfu(
  {
    react: true,
  },
  { ignores: ['*.md'] },
)

base.append([eslintPluginPrettierRecommended, eslintConfigPrettier])

base.append([
  {
    name: 'next',
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-duplicate-head': 'off',
      '@next/next/no-img-element': 'error',
      '@next/next/no-page-custom-font': 'off',
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
      'react/no-use-context': 'off',
    },
  },
])

base.overrideRules({
  'antfu/if-newline': 'off',
})

export default base
