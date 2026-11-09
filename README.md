# @hakula139/eslint-config

[![CI](https://github.com/hakula139/eslint-config/actions/workflows/ci.yml/badge.svg)](https://github.com/hakula139/eslint-config/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Shared ESLint flat configs for Hakula's JavaScript and TypeScript repositories. Each preset is a config array to compose with ESLint's `defineConfig`, and Prettier owns formatting, so no preset sets a formatting rule.

## Presets

| Import                                | Files                   | Contents                                                                                                                   |
| ------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `@hakula139/eslint-config`            | Every file ESLint lints | `@eslint/js` recommended, strict equality, braces, `const`, no `var`, `no-throw-literal`, object shorthand, sorted imports |
| `@hakula139/eslint-config/typescript` | `**/*.{ts,tsx,mts,cts}` | typescript-eslint's `strictTypeChecked`, separate type imports, exhaustive `switch`, number-only templates                 |

Both presets ignore an unused binding whose name starts with `_`, and a property destructured beside a rest element. The TypeScript preset turns off `@typescript-eslint/require-await`, so an `async` function can implement an interface without awaiting.

## Installation

Install ESLint 10 or later and `globals` beside the base preset:

```bash
pnpm add -D @hakula139/eslint-config eslint globals
```

The TypeScript preset also needs typescript-eslint 8.56 or later and TypeScript 6:

```bash
pnpm add -D typescript@^6 typescript-eslint
```

## Usage

List `base`, then `typescript`, then the project's own globals, rules, and ignores in `eslint.config.js`:

```js
import base from '@hakula139/eslint-config';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  base,
  {
    languageOptions: {
      globals: globals.node,
    },
  },
]);
```

The base preset sets no globals, so add the environments the code runs in.

### TypeScript

The TypeScript preset lints with type information through typescript-eslint's project service, which finds each file's nearest `tsconfig.json`. Set `tsconfigRootDir` to the config's directory, since typescript-eslint can infer it only when `eslint.config.js` reads its configs directly:

```js
import base from '@hakula139/eslint-config';
import typescript from '@hakula139/eslint-config/typescript';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  base,
  typescript,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

## Versioning

Any release that can make a passing project fail its lint is major, so minor and patch updates can merge without review. [RELEASING.md](RELEASING.md) defines the policy.

## Development

The tests lint the fixtures under `test/fixtures/` with each preset and compare the reported rules. See [AGENTS.md](AGENTS.md) for contributor conventions.

## License

Copyright (c) 2026 [Hakula](https://hakula.xyz). Licensed under the [MIT License](LICENSE).
