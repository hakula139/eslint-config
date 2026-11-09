# AGENTS.md: eslint-config

This repository owns the `@hakula139/eslint-config` npm package, the ESLint flat configs that Hakula's JavaScript and TypeScript repositories share.

## Preset contract

Each preset's entry module default-exports a config array, and `package.json`'s `exports` maps one subpath to each preset. Consumers compose them with `defineConfig`, so keep presets free of options or factories. Rules that only restate typescript-eslint's strict and stylistic sets or that format code stay out, since Prettier formats and those sets already apply.

Pass an option only where it differs from the rule's default or from the value the extended set gives it. An option object replaces the extended set's options for that rule and merges over the rule's own defaults, so an override restates each value where the set and the default disagree.

## Tests

`test/presets.test.js` lints each fixture under `test/fixtures/` through ESLint's Node API with that preset directory's `eslint.config.js`, which imports the presets by package name the way a consumer does. Each case asserts the exact sorted set of reported rule IDs. A rule change updates the violations fixture so the rule fires, and the clean fixture so its exceptions stay quiet. devkit's hooks skip `fixtures/` paths, so the fixtures keep their deliberate violations.

## Dependencies

pnpm comes from devkit's Node.js toolchain in the dev shell, and `devEngines` rejects other package managers. Plugins the presets load are `dependencies`, and ESLint and typescript-eslint are peers, with typescript-eslint optional so JavaScript-only consumers don't install TypeScript.

Add project spellings to `.cspell/words.txt`, one per line in alphabetical order.

## Verification

```bash
nix develop -c run-hooks
nix develop -c pnpm test
nix flake check --all-systems
```

## Releases

Follow [RELEASING.md](RELEASING.md) for the versioning policy and the tag-driven npm publish.
