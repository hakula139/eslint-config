# @hakula139/eslint-config

[![CI](https://github.com/hakula139/eslint-config/actions/workflows/ci.yml/badge.svg)](https://github.com/hakula139/eslint-config/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Shared ESLint flat configs for Hakula's JavaScript and TypeScript repositories. Each preset is a config array to compose with ESLint's `defineConfig`, and Prettier owns formatting, so no preset sets a formatting rule.

## Presets

### `@hakula139/eslint-config`

Lints every file ESLint lints with `@eslint/js` recommended, strict equality, braces on every block, `const`, no `var`, `no-throw-literal`, object shorthand, and sorted, deduplicated imports.

### `@hakula139/eslint-config/typescript`

Lints `**/*.{ts,tsx,mts,cts}` with typescript-eslint's `strictTypeChecked` and `stylisticTypeChecked`, PascalCase type names, separate type imports, exhaustive `switch`, and template literals that interpolate only strings and numbers.

### Exceptions

Both presets ignore an unused binding whose name starts with `_`, and a property destructured beside a rest element. The TypeScript preset turns off `@typescript-eslint/require-await`, so an `async` function can implement an interface without awaiting.

## Installation

Install ESLint 10 and `globals` beside the base preset:

```bash
pnpm add -D @hakula139/eslint-config eslint globals
```

The TypeScript preset also needs typescript-eslint 8.56 or later and a TypeScript version that release supports. typescript-eslint does not support TypeScript 7 yet, so the command installs TypeScript 6:

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

Each linted TypeScript file must belong to its discovered `tsconfig.json`. For files outside that project, the [project-service troubleshooting guide](https://typescript-eslint.io/troubleshooting/typed-linting/#project-service-issues) covers inclusion, ignores, a small default-project set, and disabling type-aware linting.

## Versioning

Any release that can make a passing project fail its lint is major, so minor and patch updates can merge without review. [RELEASING.md](RELEASING.md) defines the policy.

## Development

[`AGENTS.md`](AGENTS.md) is the contributor entry point for people and coding agents alike.

## License

Copyright (c) 2026 [Hakula](https://hakula.xyz). Licensed under the [MIT License](LICENSE).
