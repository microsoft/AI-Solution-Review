# Install the Agent Review Center

Step-by-step install of the Agent Review Center managed solution into a Power Platform environment
in your own tenant.

[← Back to the README](../README.md) · Before you start: [Prerequisites](prerequisites.md)

## Contents

1. [Check the prerequisites](#1-check-the-prerequisites)
2. [Download the solution](#2-download-the-solution)
3. [Import the solution](#3-import-the-solution)
4. [Run the setup app once](#4-run-the-setup-app-once)
5. [Clear the readiness checklist](#5-clear-the-readiness-checklist)
6. [Give reviewers access](#6-give-reviewers-access)

Also on this page: [What gets installed](#what-gets-installed) ·
[Upgrade to a new version](#upgrade-to-a-new-version) · [Uninstall](#uninstall)

## 1. Check the prerequisites

Before you import anything, confirm with your admin that every item on the
[prerequisites checklist](prerequisites.md#checklist) is done. In particular:

- You are a **System Administrator** in the target environment.
- **Code apps** are turned on in that environment.
- **Transcript recording** is on — it is not retroactive, so the sooner the better.

## 2. Download the solution

Download the latest `AgentReviewCenter_<version>_managed.zip` from the
[Download section of the README](../README.md#download) or the
[latest release](https://github.com/microsoft/AI-Solution-Review/releases/latest).

> [!WARNING]
> Import the `.zip` file as-is. Do not extract it. Some browsers unzip downloads automatically — if
> you end up with a folder instead of a `.zip`, download it again with automatic unzipping turned off.

Optionally, confirm the file is intact by comparing its hash with the SHA-256 published in the
[README](../README.md#download) and the release notes:

```powershell
Get-FileHash .\AgentReviewCenter_20261016.1_managed.zip -Algorithm SHA256
```

## 3. Import the solution

1. Sign in to [Power Apps](https://make.powerapps.com).
2. In the environment picker at the top right, select the environment you prepared.
3. Select **Solutions** in the left navigation.
4. Select **Import solution**, then **Browse**, and choose the `.zip` file.
5. Select **Next**. Check the details — the solution is **Agent Review Center**, published by
   **PowerCAT** — and select **Next** again.
6. When asked for connections, select an existing connection or create a new one for each of the two
   connection references:

   | Connection reference | Connector |
   |---|---|
   | **Agent Review Center \| Dataverse** | Microsoft Dataverse |
   | **Agent Review Tool \| Agents** | Agents |

7. Select **Import** and wait for the success message. This can take several minutes.

If you cannot finish a connection here, continue. The setup app in the next step checks both
connections and repairs the workflow's connections if needed.

## 4. Run the setup app once

The solution includes a one-time setup app named **Copilot Agent Kit Installer**.

1. In Power Apps, select **Apps** and open **Copilot Agent Kit Installer**.
2. If Power Apps asks you to allow its connections, select **Allow**.
3. The **Agent Review setup** screen checks four things and fixes what it can:

   | Check | What it confirms |
   |---|---|
   | **Agents connection** | Power Apps assigned a connected Agents account. |
   | **Dataverse connection** | Power Apps assigned a connected Dataverse account. |
   | **Workflow connections** | The **Review Agent Components** workflow uses the assigned Agents and Dataverse connections. |
   | **Review workflow** | The **Review Agent Components** workflow is started. |

4. Wait for **Setup is complete**.

If you see **Setup could not complete**, see [Troubleshooting](troubleshooting.md#setup-and-install).
You can run the setup app again at any time to repair connections and the workflow.

## 5. Clear the readiness checklist

1. In Power Apps, select **Apps** and open **Agent Review Center**.
2. On first launch, a **Welcome — let's set you up!** message appears with a readiness checklist. You
   can return to it any time from the **Settings** (gear) button on the reviews list.
3. Select **Run checks** and work through anything red or yellow:

   | Check | If it is not green |
   |---|---|
   | **Environment reachable** | Blocks every check below. |
   | **Copilot Studio provisioned** | Blocks every review in this environment. |
   | **You have the access this environment needs** | Configuration reviews still run; runtime transcript analysis may be blocked. |
   | **Transcript recording enabled at environment level** | Blocks runtime analysis and credit estimation. |
   | **Transcript viewing enabled for agent owners** | Reviewers may not be able to open the transcripts behind a score. |
   | **Connections enabled** | Blocks flow activation and analysis. |
   | **Flows enabled** | Blocks analysis runs. |

Anything red or yellow limits what the tool can do, but you can still run configuration reviews while
it is being fixed. Use **Copy admin link** to send your admin straight to the setting that needs
changing, then select **Run checks** again.

## 6. Give reviewers access

For each person who will run reviews:

1. **Assign the reviewer roles** — Environment Maker, Bot Viewer, and Bot Transcript Viewer. See
   [Roles and permissions](prerequisites.md#roles-and-permissions).
2. **Share the agent.** In Copilot Studio, open the agent, select **Share**, and add the reviewer.
3. **Share the app.** In Power Apps, select **Apps**, select **Agent Review Center**, then
   **Share**, and add the reviewer.
4. **Check their licenses** — a Copilot Studio User License and Power Apps Premium coverage. See
   [Licensing](prerequisites.md#licensing).

You're ready. Continue to [Run a review →](run-a-review.md)

---

## What gets installed

Everything is in one managed solution, **Agent Review Center** (`AgentReviewCenter`), from the
publisher **PowerCAT** (prefix `cat`).

| Type | Name | Purpose |
|---|---|---|
| Code app | **Agent Review Center** | The app you use to run reviews and read results. |
| Code app | **Copilot Agent Kit Installer** | One-time setup for Agent Review connections and workflow activation. |
| Cloud flow | **Review Agent Components** | Runs the review. Uses the Dataverse and Agents connections. |
| Cloud flow | **Global \| LogFeatureTelemetry I ARC** | Called by the app when you use a feature (for example, creating or re-running a review). It contains no connectors. |
| Plug-in | **AgentRuntimeAnalyzer** | Processes runtime analysis jobs asynchronously in Dataverse. |
| Connection references | **Agent Review Center \| Dataverse**, **Agent Review Tool \| Agents** | See [Data policies](prerequisites.md#data-policies). |
| Dataverse tables | Agent Review, Agent Review Job, Agent Review Job Item, Architecture Review, Architecture Review Agent, Architecture Review Result, Architecture Review Orchestration Record, Runtime Analysis Job | Store your reviews, snapshots, and results. |

The solution depends on Copilot Studio being provisioned in the environment.

## Upgrade to a new version

1. Download the new `.zip` from the [latest release](https://github.com/microsoft/AI-Solution-Review/releases/latest).
2. In Power Apps, select **Solutions** > **Import solution**, and choose the new file.
3. Power Apps recognizes that **Agent Review Center** is already installed. Keep the default upgrade
   option and select **Import**.
4. Open **Agent Review Center** and select **Run checks** in the readiness checklist. If connections
   or flows show as off, run the **Copilot Agent Kit Installer** app again.

Your existing reviews and results stay in place. See the [changelog](../CHANGELOG.md) for what
changed.

## Uninstall

> [!CAUTION]
> Deleting the solution deletes its Dataverse tables, and **every review and result stored in
> them**. Download the PDF or JSON report for any results you want to keep first.

In Power Apps, select **Solutions**, select **Agent Review Center**, then **Delete**.

---

Next: [Run a review →](run-a-review.md) · Problems? [Troubleshooting](troubleshooting.md)
