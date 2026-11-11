# AGENTS.md: eslint-config

This repository owns the `@hakula139/eslint-config` npm package, the ESLint flat configs that Hakula's JavaScript and TypeScript repositories share.

## Preset contract

Each preset is a config array that consumers compose with `defineConfig`, so keep presets free of options or factories. Leave out formatting rules, which Prettier owns, and rules that only restate typescript-eslint's strict and stylistic sets.

Pass an option only where it differs from the rule's default or from the value the extended set gives it. An option object replaces the extended set's options for that rule and merges over the rule's own defaults, so an override restates each value where the set and the default disagree.

## Tests

A rule change updates the violations fixture so the rule fires, and the clean fixture so its exceptions stay quiet.

## Verification

```bash
nix flake check --all-systems
nix develop -c run-hooks
nix develop -c pnpm test
```

## Releases

Follow [RELEASING.md](RELEASING.md) for the versioning policy and the tag-driven npm publish.
