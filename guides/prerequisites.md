# Prerequisites

Everything that must be in place before you install the Agent Review Center. Most of it needs a
Power Platform admin, and some of it takes time to arrange — **send this page to your admin early.**

[← Back to the README](../README.md) · Next: [Install guide](install.md)

## Contents

- [Checklist](#checklist)
- [Licensing](#licensing)
- [Choose the environment](#choose-the-environment)
- [Environment configurations](#environment-configurations)
- [Turn on transcripts early](#turn-on-transcripts-early)
- [Data policies](#data-policies)
- [Roles and permissions](#roles-and-permissions)

## Checklist

Use this to track progress with your admin. Each item links to the detail below.

- [ ] [Copilot Studio](#licensing) tenant license, plus a Copilot Studio User License for each
      Agent Review Center user
- [ ] [Power Apps Premium](#licensing) coverage for each Agent Review Center user
- [ ] [Copilot Credits](#licensing), allocated to the environment
- [ ] A [Dataverse environment, standard release](#choose-the-environment)
- [ ] [Code apps](#environment-configurations) turned on in that environment
- [ ] [Both transcript settings](#turn-on-transcripts-early) turned on in that environment
- [ ] [Data policies](#data-policies) allow the Microsoft Dataverse and Agents connectors
- [ ] The person installing is a [System Administrator](#roles-and-permissions) in the environment
- [ ] Each reviewer has the [reviewer roles](#roles-and-permissions)

## Licensing

| Requirement | Detail |
|---|---|
| **Copilot Studio** | Copilot Studio tenant license, plus a **Copilot Studio User License** for each Agent Review Center user. |
| **Power Apps Premium** | Power Apps Premium coverage for each Agent Review Center user (Premium license, pay-as-you-go, or App Pass). |
| **Copilot Credits** | Copilot Credits (Copilot Studio capacity pack or pay-as-you-go billing plan). Running a review consumes credits, and credits must be **allocated to the environment** where the Agent Review Center runs — owning them at tenant level is not enough. |

## Choose the environment

The Agent Review Center is installed into one Power Platform environment.

- **Dataverse environment, standard release.** The environment must
  [have a Dataverse database](https://learn.microsoft.com/power-platform/admin/create-environment)
  and must not be an early-release or preview environment.
- **Prefer the environment that holds the agents you want reviewed.** The configuration review can
  cover agents in other environments, but **conversation transcripts are only analyzed in the
  environment the Agent Review Center runs in.** To include runtime analysis, install it in the same
  environment as the agent.
- **Already using the Copilot Agent Kit there?** The kit includes an earlier tool from the same
  publisher. Check with your Microsoft contact before importing the Agent Review Center into an
  environment that already has the kit installed.

## Environment configurations

| Setting | Where | Who can set it |
|---|---|---|
| **Dataverse environment, standard release** | Power Platform admin center (PPAC) > Manage > Environments | Power Platform admin |
| **Copilot Credits allocated to the environment** | PPAC > Licensing > Copilot Studio > Manage capacity | Power Platform admin |
| **Enable code apps: On** | PPAC > Environments > [env] > Settings > Product > Features > Code Apps | Environment System admin |
| **Both transcript settings On** — see [below](#turn-on-transcripts-early) | PPAC > Environments > [env] > Settings > Product > Features > Copilot Studio agents | Environment System admin |

The Agent Review Center and its setup app are both
[code apps](https://learn.microsoft.com/power-apps/developer/code-apps/overview), which is why code
apps must be on before you import.

## Turn on transcripts early

Runtime analysis reads your agents' conversation transcripts. Two settings must both be on, under
**PPAC > Environments > [env] > Settings > Product > Features > Copilot Studio agents**:

1. **Allow conversation transcripts and their associated metadata to be saved in Dataverse**
2. **Allow agent owners and editors to see session transcripts…**

> [!IMPORTANT]
> **Transcript recording is not retroactive.** Nothing is backfilled. If recording is switched on
> the day before the review starts, there is almost no history to analyze, and the runtime analysis
> will have little to say.

Two things to tell your admin:

- Transcript recording is an **environment setting**, so it applies to every agent in that
  environment, not only the ones under review. Environment-group rules can override a
  per-environment setting.
- **Retention is configurable.** Check that the retention window covers the period you want
  reviewed.

After switching it on, run a test conversation with your agent and confirm a transcript appears
before you rely on it.

What each setting affects:

| If this is off | What happens |
|---|---|
| Transcripts saved in Dataverse | There is nothing to analyze. Runtime analysis and credit estimation are blocked. Configuration reviews still run. |
| Agent owners and editors can see transcripts | The analysis still runs, but reviewers may not be able to open the individual conversations behind a finding. |

## Data policies

The solution uses two connectors. Your environment's
[data policies](https://learn.microsoft.com/power-platform/admin/wp-data-loss-prevention) must allow
both of them to be used together:

| Connector | Connection reference in the solution | Used for |
|---|---|---|
| **Microsoft Dataverse** | Agent Review Center | Reading agent configuration and transcripts, and storing reviews and results. |
| **Agents** | Agent Review Tool | The AI-assisted checks run by the **Review Agent Components** workflow. |

## Roles and permissions

| Who | What they need |
|---|---|
| **The person who installs the solution** | **System Administrator** in the environment where the Agent Review Center runs, to import the solution and run its one-time setup app. |
| **Each reviewer** | All of: **Environment Maker**, **Bot Viewer**, and **Bot Transcript Viewer**. |

Transcript access is
[governed by environment security roles](https://learn.microsoft.com/microsoft-copilot-studio/admin-share-bots).
After install, the app is shared with each reviewer — see
[Give reviewers access](install.md#6-give-reviewers-access).

---

Next: [Install the Agent Review Center →](install.md)
