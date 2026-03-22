import eslintPluginAstro from 'eslint-plugin-astro'
import prettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

const tsFiles = ['**/*.{ts,tsx,mts,cts}']

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...tseslint.configs.recommended.map((cfg) => ({
    ...cfg,
    files: cfg.files ?? tsFiles,
  })),
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    files: ['*.astro', '**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  prettierConfig,
]
