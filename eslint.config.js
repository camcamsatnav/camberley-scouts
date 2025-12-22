import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import react from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'coverage']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'typescript-eslint': tseslint,
    },
    'rules': {
      'semi': ['error', 'always'],
      'space-in-brackets': 'off',
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-in-parens': ['error', 'never'],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'indent': ['error', 2],
      'eol-last': ['error', 'always'],
      'max-len': [
        'error', {
          'code': 120,
          'tabWidth': 2,
          'ignoreStrings': true,
          'ignoreTemplateLiterals': true,
          'ignoreComments': true,
        },
      ],
      'react/jsx-tag-spacing': ['error', { 'beforeSelfClosing': 'always' }],
      'react-hooks/purity': 'off',
      'eqeqeq': ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'curly': 'error',
      'no-undef': 'error',
      'no-redeclare': 'error',
      'no-dupe-keys': 'error',
      'no-fallthrough': 'error',
      'no-empty': 'warn',
      'no-multiple-empty-lines': ['error', { 'max': 1 }],
      'quotes': ['error', 'single'],
      'quote-props': ['error', 'as-needed'],
      'react-hooks/set-state-in-effect': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'caughtErrorsIgnorePattern': '^_' }],
    },
  },
]);
