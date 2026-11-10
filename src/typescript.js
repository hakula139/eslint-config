import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

import { unusedVarsOptions } from './unused-vars.js';

export default defineConfig({
  name: 'hakula139/typescript',
  files: ['**/*.{ts,tsx,mts,cts}'],
  extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'typeLike', format: ['PascalCase'], leadingUnderscore: 'allow' },
    ],
    '@typescript-eslint/no-unused-vars': ['error', unusedVarsOptions],
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowAny: false,
        allowBoolean: false,
        allowNullish: false,
        allowNumber: true,
        allowRegExp: false,
      },
    ],
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
  },
});
