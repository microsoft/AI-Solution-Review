# Troubleshooting

Messages you might see in the Agent Review Center, what they mean, and what to do. Search this page
for the exact wording on your screen.

[← Back to the README](../README.md)

## Contents

- [Setup and install](#setup-and-install)
- [Starting a review](#starting-a-review)
- [Transcripts and runtime analysis](#transcripts-and-runtime-analysis)
- [Review results](#review-results)
- [Still stuck?](#still-stuck)

> [!TIP]
> Start with the readiness checklist. In the Agent Review Center, select the **Settings** (gear)
> button on the reviews list, then **Run checks**. Each item says what it blocks and links to where
> it is fixed.

## Setup and install

| You see | What it means | What to do |
|---|---|---|
| **Setup could not complete** (in the Copilot Agent Kit Installer app) | The setup app could not confirm the connections or start the review workflow. | Check that both connections exist and are signed in, and that [data policies](prerequisites.md#data-policies) allow the Microsoft Dataverse, Agents, and Power Automate Management connectors together. Then open the setup app again — it repairs what it can on each run. |
| Import fails, or the apps are missing after import | The environment is not ready for code apps, or the import did not complete. | Confirm **code apps** are on and that you are a **System Administrator**. See [Environment configurations](prerequisites.md#environment-configurations). |
| Import fails with **AcpDlpPolicyEvaluation** … connectors it uses **'shared_flowmanagement'** are blocked by Advanced Connector Policy (ACP) or Data Policies (DLP) | A data policy in the environment blocks the **Power Automate Management** connector used by the setup app. | In the Power Platform admin center, go to **Security → Data and privacy → Data policies** (older layouts: **Policies → Data policies**) and open the policy named in the error. On the **Prebuilt connectors** step, move **Power Automate Management** from **Blocked** to **Business**, in the same group as **Microsoft Dataverse** and **Agents (preview)** — check those two are in **Business** too, or the next attempt fails with a **BusinessAndNonBusinessConnector** violation. Save, wait a few minutes, then retry the import. |
| Import fails with **AcpDlpPolicyEvaluation**, and the violation names an **Advanced Connector Policy (ACP)** — for example blocking **'shared_agentnode'** (the Agents connector) | Advanced connector policies block every connector that is not explicitly allowed. | Add **Microsoft Dataverse**, **Agents**, and **Power Automate Management** to the allowed list: **Security → Data and privacy → Advanced connector policies** for a single environment, or the environment group's **Rules → Advanced connector policies**, then **Save** and **Publish rules**. Wait a few minutes, then retry the import. Environment admins cannot edit policies a tenant admin created. See [Advanced connector policies](https://learn.microsoft.com/power-platform/admin/advanced-connector-policies). |
| **Copilot Studio does not appear to be provisioned** | The environment has no Copilot Studio. | Install into an environment where Copilot Studio is available — ideally the one that holds your agents. |
| **No active agents in this environment.** | There is nothing to review in the environment you selected. | Choose a different environment, or check that the agent exists and is active there. |
| **…connection references still need a connection.** | A connection reference has no connection. | Run the **Copilot Agent Kit Installer** app, or select the connection in the readiness checklist. |
| **Current connection is not one of yours** | Another user created the connection the solution is using. | Choosing one of your own connections repoints the reference. Only do this if you mean to take it over. |
| **…required flows are off. Map every connection first.** | The **Review Agent Components** workflow is off because a connection is missing. | Fix the connections first, then turn the flow on from the readiness checklist or re-run the setup app. |
| **You need owner or co-owner rights on this flow to turn this flow on.** | Your account cannot change the flow's state. | Ask the person who installed the solution, or a System Administrator, to turn it on in Power Automate. |
| **This managed flow cannot be changed from here.** | The flow is part of the managed solution and must be changed in Power Automate. | Open it in Power Automate, or ask the solution owner. |
| **You have the access this environment needs** shows yellow | Your roles in the environment were checked and may not cover runtime transcript analysis. Configuration reviews still run. | Ask your admin to confirm the [reviewer roles](prerequisites.md#roles-and-permissions). |
| A reviewer cannot see or create reviews | Their account is missing a role, a license, or access to the app. | Confirm the [reviewer roles](prerequisites.md#roles-and-permissions), [licenses](prerequisites.md#licensing), and that the app is [shared with them](install.md#6-give-reviewers-access). |

## Starting a review

| You see | What it means | What to do |
|---|---|---|
| **The review workflow didn't run** | The **Review Agent Components** workflow did not start. | Check **Flows enabled** and **Connections enabled** in the readiness checklist, or run the setup app again. In Power Automate, the flow's run history shows the cause. |
| **The requested AI model is not provisioned in this environment.** | The AI-assisted stage could not use its model in this environment. | Ask your admin to confirm Copilot Credits are [allocated to the environment](prerequisites.md#environment-configurations). If it continues, raise it with your Microsoft contact. |
| **Content withheld from the AI stage because a credential pattern was detected.** | Something in the uploaded files looks like a secret, so it was not sent to the AI-assisted stage. | Remove the secret from the files — it is also reported as a finding — and review again. |
| **That file could not be read.** | The upload could not be opened. | Check it is a `.zip`, `.md`, `.yaml`, `.yml`, or `.json` file and is not damaged, then upload it again. |
| **That file is larger than 16 MB. Upload a smaller artifact.** | Uploads can be up to 16 MB. | Remove files the review does not need, then upload again. |
| **This snapshot is saved but its review never finished.** | The run stopped part-way. | Upload the same file again. Work that already finished is reused rather than run again. |

## Transcripts and runtime analysis

| You see | What it means | What to do |
|---|---|---|
| **Conversation transcript recording is turned off for this environment** | There are no transcripts to analyze. | Turn on transcript recording — see [Turn on transcripts early](prerequisites.md#turn-on-transcripts-early). It is not retroactive. |
| **No transcript records in this range** | Nothing was recorded in the dates you chose. | Widen the date range. Recording only captures conversations after it was turned on. |
| **Transcript viewing is blocked for this environment.** | The analysis still runs, but individual conversations cannot be opened to confirm a finding. | Turn on **Allow agent owners and editors to see session transcripts…** for the environment. |
| **Conversation transcripts are analysed only in the environment this app runs in.** | The agent is in a different environment from the Agent Review Center. | The configuration review still runs. To include runtime analysis, select the current environment, or install the Agent Review Center in the agent's environment. |
| **Couldn't read conversation transcripts just now.** | Transcripts could not be read at that moment. | Try again, or run the review without runtime analysis. Check the reviewer has the **Bot Transcript Viewer** role. |
| **This review isn't linked to an agent** | Runtime analysis needs a review of a Copilot Studio agent. | Uploaded declarative agents and skills have no transcripts to analyze. |
| **ZIP reviews cannot resolve live connected agents.** | A review of uploaded files cannot look up connected agents in your environment. | Expected. Review the Copilot Studio agent directly to include its connected agents. |

## Review results

| You see | What it means | What to do |
|---|---|---|
| **The AI stage did not run for this review** — the score is partial | The AI-assisted checks did not run, so their weight was spread across the rest. | Check connections, flows, and credits in the readiness checklist, then **Review again**. |
| **The review workflow returned only part of its answer** | Some AI-assisted results did not come back. | **Review again**. |
| **Legacy score (basis version 1) — rerun recommended**, or **This review was stored before the current result format** | The result was produced by an earlier version. | **Review again** to get the current scoring, components, and findings. |
| A finding does not apply to your agent | The rule is not relevant in your context. | Use **Mark as manual pass**. See [Work through the findings](run-a-review.md#work-through-the-findings). |

## Still stuck?

- **During an engagement**, raise it with your Microsoft contact — they have the context.
- **Questions about these docs or the review**, [open an issue](https://github.com/microsoft/AI-Solution-Review/issues/new/choose).
  Issues are public — do not post tenant data, transcripts, or screenshots with real data.
- **A live production problem** goes to your normal Microsoft Support channel. See
  [SUPPORT.md](../SUPPORT.md).
