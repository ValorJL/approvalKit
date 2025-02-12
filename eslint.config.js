import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    files: ['**/*.vue'], // 让 Vue 文件使用 Vue 解析器
    languageOptions: {
      parser: vueParser,
      sourceType: 'module',
      ecmaVersion: 'latest',
      parserOptions: {
        parser: tsparser, // 让 Vue 组件的 `<script>` 部分使用 TypeScript 解析器
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      vue: vue,
      '@typescript-eslint': tseslint,
      prettier: prettier,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': ['error', { endOfLine: 'lf' }],
    },
    ignores: ['node_modules', 'dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettier,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': 'error',
    },
    ignores: ['node_modules', 'dist'],
  },

  eslintConfigPrettier, // 让 Prettier 接管格式化
]
