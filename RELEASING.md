# Releasing

Use the [release skill][release-skill] for preparation, notes curation, the release PR, approved tagging, and recovery. This document defines the eslint-config release contract.

## Choose the version

Renovate's devkit preset merges minor and patch npm updates without review, so a release that can fail a consumer's lint must be major:

- **Major:** Any change that can make a passing project fail, such as an added or stricter rule, a new error-level plugin config, a raised peer range, or a removed preset.
- **Minor:** New presets and relaxed rules.
- **Patch:** Fixes that report nothing new.

typescript-eslint's `strictTypeChecked` and `stylisticTypeChecked` change in its minor releases, which reach a project through its own lockfile, so they are no version event here.

## Prepare the release

Bump the manifest without an npm-generated tag, then draft the notes:

```bash
pnpm version X.Y.Z --no-git-tag-version
nix run github:hakula139/devkit/v2#changelog -- vX.Y.Z
```

## Publish

The `tag.yml` workflow runs on the pushed tag:

1. It checks that the tag matches `package.json`'s version and waits for CI to pass on the tagged commit.
2. It runs `pnpm publish --provenance`, which authenticates through npm's GitHub OIDC trusted publisher and attaches a provenance attestation. Stable versions use `latest`, and prereleases use `next`.
3. It publishes the tag's `CHANGELOG.md` section as the GitHub Release.

The trusted publisher for `@hakula139/eslint-config` allows publishing from `hakula139/eslint-config` through `tag.yml`. npm versions are immutable, so fix an already published version with a new one.

Run npm commands such as `npm trust` and `npm unpublish` outside the checkout, since npm refuses to run in a project whose `devEngines` names pnpm.

[release-skill]: https://github.com/hakula139/plugins/blob/main/plugins/hakula-workflow/skills/release/SKILL.md
