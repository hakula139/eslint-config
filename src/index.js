import js from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import { defineConfig } from 'eslint/config';

import { unusedVarsOptions } from './unused-vars.js';

export default defineConfig([
  js.configs.recommended,
  {
    name: 'hakula139/base',
    plugins: {
      perfectionist,
    },
    rules: {
      'curly': ['error', 'all'],
      'eqeqeq': ['error', 'always'],
      'no-throw-literal': 'error',
      'no-unused-vars': ['error', unusedVarsOptions],
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-const': 'error',
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            ['type-builtin', 'value-builtin'],
            ['type-external', 'value-external'],
            ['type-internal', 'value-internal'],
            'unknown',
          ],
        },
      ],
      'perfectionist/sort-named-imports': ['error', { groups: ['value-import', 'type-import'] }],
    },
  },
]);
