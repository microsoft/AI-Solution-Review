# Run a review

How to start a review in the Agent Review Center, read the results, share them, and measure your
fixes with a re-run.

[← Back to the README](../README.md) · Not installed yet? [Install guide](install.md)

## Contents

- [Start a review](#start-a-review)
- [Read the results](#read-the-results)
- [Work through the findings](#work-through-the-findings)
- [Share the results](#share-the-results)
- [Fix, then review again](#fix-then-review-again)
- [Investigate a conversation with the Agent Debugger](#investigate-a-conversation-with-the-agent-debugger)

## Start a review

1. Open **Agent Review Center** from **Apps** in Power Apps.
2. Select **Add review**.
3. In **New review**, give it a **Project name**. It is shown in the reviews list and is pre-filled
   with the asset type and the current date and time.
4. Under **What kind of asset are you reviewing?**, choose one:

   | Asset | What you provide |
   |---|---|
   | **Copilot Studio Agent** | Select the **environment** and **choose the agent**. |
   | **Declarative Agent** | Upload the agent's files. |
   | **Skill** | Upload the skill's files. |

   Uploads accept `.zip`, `.md`, `.yaml`, `.yml`, and `.json` files.

5. For a Copilot Studio agent, set the **date range for transcripts** to include runtime analysis.
   The app counts the transcript records in the range before you start — if it finds none, the
   runtime analysis would have nothing to analyze, so widen the range or check that
   [transcript recording](prerequisites.md#turn-on-transcripts-early) is on.
6. Start the review. Progress is shown as it runs — reading the agent configuration, handing off to
   the review agent, then **Review complete**. You can select **Continue in background** and come
   back later.

> [!NOTE]
> Runtime analysis only covers agents in the environment the Agent Review Center runs in. For an
> agent in another environment, the configuration review still runs. Uploaded declarative agents and
> skills are reviewed from their files, so live connected agents cannot be resolved.

## Read the results

![Review result showing a grade of B and a rolled-up score of 83 out of 100 across three agents, with per-agent tabs and a review summary.](../docs/assets/shot-scorecard.png)

| Part of the page | What it tells you |
|---|---|
| **Grade and rolled-up score** | One score across every agent in the review, for example `B · 83/100`. |
| **Per-agent tabs** | Each agent's own score, so you can see which one is dragging the total down. |
| **Review summary** | Total checks passed and failed, references cited, when it completed, how long it took, the model used, whether memory was on, and the score and weight for each area. |
| **Agent review** tab | The findings list. |
| **Architecture** tab | A map of the agent's components and the relationships between them, with a **List** view that has the same detail and full keyboard navigation. |
| **Runtime** tab | What happened in real conversations, in three views: **Errors**, **Latency**, and **Knowledge**. Set the analysis window with the date pickers. |

The **Runtime** tab is where most surprises turn up:

- **Errors** — conversations analyzed, conversations with errors, distinct error types, tool calls,
  and the failing tools ranked by how often they failed.
- **Latency** — where time goes: plan steps, tools, and connected agents, with the slowest runs.
- **Knowledge** — sources configured versus sources actually used and cited, with removal
  candidates.

## Work through the findings

![A finding expanded to show what the rule checks, what was found, why it matters, and a recommendation.](../docs/assets/shot-finding-detail.png)

Filter the list by **component** and **status**, or search it. Select a finding to see:

- **What this rule checks**
- **What we found** — the evidence, quoted from your agent where possible
- **Why it matters**
- **How to fix** — with **suggested text** where it helps
- **How to confirm the fix**
- **References** — Microsoft Learn and published sources such as OWASP

Findings labelled **AI generated** come from the AI-assisted stage of the review. AI-generated
content may be incorrect — check it before you act on it.

**If a rule does not apply to your agent**, use the menu beside it and select **Mark as manual pass**.
Where a rule covers several components, select **Choose which components…** to exclude only some of
them. **Restore the review's verdict** undoes it.

## Share the results

Select **Share results**, then **Download PDF report** or **Download JSON report**. The menu tells you
whether the snapshot includes runtime analysis or design findings only.

The reports are yours. Sharing them outside your team is your decision.

## Fix, then review again

![A score progress chart tracking one agent across three reviews, rising to 95 out of 100.](../docs/assets/shot-score-progress.png)

1. Make your fixes in Copilot Studio, or update the declarative agent or skill files.
2. Open the review and select **Review again**. Each run creates a new **snapshot**; earlier
   snapshots and their evidence are kept unchanged.
   - For an uploaded asset, upload the updated file.
   - For runtime analysis, choose a date range that covers conversations **after** your fix.
3. Select **View progress** to see the score across every snapshot. Use **Switch snapshot** on the
   results page to look at an earlier result.

If you upload a different skill than last time, the app marks the snapshots as not comparable.
Date ranges are inclusive UTC calendar days.

## Investigate a conversation with the Agent Debugger

The **Agent Debugger** analyzes and visualizes a single conversation transcript, the agent's
thought process, and any connected agents. Open a conversation from the **Runtime** tab to launch it.

| View | What it shows |
|---|---|
| **Conversation & activities** | The conversation turn by turn, with the activities behind each turn. Select **Inspect** on a turn for its detail, or **Raw JSON**. |
| **Execution flow** | The steps the agent took — topics, tools, knowledge searches, connected agents — with inputs, outputs, and variable values. |
| **Agent insights** | Issues detected in the conversation, such as escalations, abandonment, slow connected agents, or knowledge searched but never cited. |
| **Performance timeline** | Where the time went, step by step. |

It also shows **Estimated Copilot Credits** for the conversation. Use this as a diagnostic estimate,
not a billing statement.

---

Problems? See [Troubleshooting](troubleshooting.md) · Questions? See the [FAQ](faq.md)
