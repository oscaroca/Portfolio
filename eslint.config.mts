import { FlatCompat } from '@eslint/eslintrc';
const compat = new FlatCompat({ baseDirectory: process.cwd() });

export default [
  ...compat.extends('react-app'),
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      prettier: require('eslint-plugin-prettier'),
      import: require('eslint-plugin-import'),
    },
    rules: {
      'prettier/prettier': 'error',
      'import/no-duplicates': 'error',
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },
];
