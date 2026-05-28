import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tsEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  prettierConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    languageOptions: {
      parser: {
        parseForESLint: (code, options) => {
          // Vue files are handled by eslint-plugin-vue parser
          return require('@typescript-eslint/parser').parseForESLint(code, options)
        },
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'vue/multi-word-component-names': 'off',
      'no-console': 'warn',
      'no-debugger': 'error',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.js'],
  },
]
