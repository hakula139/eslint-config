# Releasing

Use the [release skill](https://github.com/hakula139/plugins/blob/main/plugins/hakula-workflow/skills/release/SKILL.md) for preparation, notes curation, the release PR, approved tagging, and recovery. This document defines the eslint-config release contract.

## Choose the version

Renovate's devkit preset merges minor and patch npm updates without review, so a release that can fail a consumer's lint must be major:

- **Major:** Any change that can make a passing project fail, such as an added or stricter rule, a new error-level plugin config, a raised peer range, or a removed preset.
- **Minor:** New presets and intentional policy relaxations.
- **Patch:** Fixes that report nothing new, including corrections that remove false positives.

typescript-eslint's `strictTypeChecked` and `stylisticTypeChecked` change in its minor releases, which reach a project through its own lockfile, so they are no version event here.

## Prepare the release

Bump the manifest without an npm-generated tag, then draft the notes:

```bash
pnpm version X.Y.Z --no-git-tag-version
nix run github:hakula139/devkit/v3#changelog -- vX.Y.Z
```

## Publish

Pushing the tag runs `tag.yml`, which publishes the npm package and the GitHub Release once CI passes on the tagged commit.

The trusted publisher for `@hakula139/eslint-config` allows publishing from `hakula139/eslint-config` through `tag.yml`. npm versions are immutable, so fix an already published version with a new one.

Run npm-only commands such as `npm trust` and `npm unpublish` outside the checkout, as [devkit's pnpm guide](https://github.com/hakula139/devkit/blob/v3/docs/hooks.md#declare-pnpm) explains.
