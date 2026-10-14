# Release Workflow

Releases are cut with `pnpm release`, which runs the build, bumps the version,
commits, tags, pushes, and moves the floating major tag.

## Before releasing

- Make sure `main` is current and the worktree is clean.
- Decide the semantic version bump: `major`, `minor`, or `patch`.
- Add the new entry at the top of [CHANGELOG.md](CHANGELOG.md) and commit it.
  - Summarize the release in 1 short paragraph.
  - Prefer user-facing fixes and features over internal churn.
  - Keep the merged PR list aligned with `.github/release.yml` categories.
- Run the local verification set:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`

## Releasing

```sh
pnpm release
```

This runs `pnpm build`, then `bumpp --commit 'Release: %s' --all`, then
[scripts/sync-major-tag.sh](scripts/sync-major-tag.sh):

1. `bumpp` prompts for the new version and writes it to
   [package.json](package.json).
2. It commits everything in the worktree — including the rebuilt `dist/` — as
   `Release: <version>`, tags it `v<version>`, and pushes both.
   - `--all` stages every dirty file, so the worktree must contain only intended
     release content when you start.
3. `sync-major-tag.sh` force-moves the bare major tag (`v2`) to the new version
   tag so `uses: …@v2` resolves to the latest release. Prereleases are skipped.

Pushing the `v*.*.*` tag triggers
[.github/workflows/github-release.yml](.github/workflows/github-release.yml),
which verifies the tag is on the default branch, generates release notes from
the commits since the previous tag, and creates the GitHub release.

## After releasing

- Verify the GitHub release shows the expected tag, title, notes, and attached
  artifacts.
- Verify the `v2` tag points at the same commit as the new full tag.

## Notes

- Behavior changes should already have matching updates in
  [README.md](README.md), [action.yml](action.yml), and tests before you
  release. `dist/index.js` is rebuilt for you by `pnpm release`.
- Docs-only releases still need an intentional changelog entry and version bump
  decision.
- If a release is mainly bug fixes, keep the title and summary patch-oriented;
  do not bury the actual fixes under dependency noise.
