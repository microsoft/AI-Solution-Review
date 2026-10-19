# Releasing a new version

Maintainer steps for publishing a new Agent Review Center managed solution. Customers find new
versions through the [README download table](../README.md#download), the
[changelog](../CHANGELOG.md), and [Releases](https://github.com/microsoft/AI-Solution-Review/releases).

## 1. Prepare the file

1. Export the **Agent Review Center** solution as **managed**.
2. Name it `AgentReviewCenter_<version>_managed.zip`, where `<version>` is the solution version, for
   example `AgentReviewCenter_20261016.1_managed.zip`.
3. Before publishing, confirm the package contains no customer data, credentials, or environment
   identifiers.
4. Get its size and SHA-256:

   ```powershell
   Get-FileHash .\AgentReviewCenter_<version>_managed.zip -Algorithm SHA256
   (Get-Item .\AgentReviewCenter_<version>_managed.zip).Length / 1MB
   ```

## 2. Update the repository

In one pull request:

1. Add the new `.zip` at the repository root and remove the previous one. Older versions stay
   available from [Releases](https://github.com/microsoft/AI-Solution-Review/releases) and git
   history.
2. Update the **Download** table in [`README.md`](../README.md#download): version, file name, both
   download links, size, and SHA-256.
3. Add a section at the top of [`CHANGELOG.md`](../CHANGELOG.md) with the version, file, SHA-256, and
   what changed for customers.
4. Update the version in the `Get-FileHash` example in [`guides/install.md`](../guides/install.md#2-download-the-solution)
   and the placeholder in [`ISSUE_TEMPLATE/2-setup-problem.yml`](ISSUE_TEMPLATE/2-setup-problem.yml).
5. If setup steps, prerequisites, or messages in the app changed, update the
   [guides](../guides/README.md).

## 3. Publish the release

After the pull request is merged, create a release with the `.zip` attached, using the new changelog
section as the notes:

```powershell
gh release create v<version> .\AgentReviewCenter_<version>_managed.zip `
  --repo microsoft/AI-Solution-Review `
  --title "Agent Review Center <version>" `
  --notes-file notes.md `
  --latest
```

Then check that the README links and
[latest release](https://github.com/microsoft/AI-Solution-Review/releases/latest) both download the
new file.
