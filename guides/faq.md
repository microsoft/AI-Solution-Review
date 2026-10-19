# Frequently asked questions

[← Back to the README](../README.md)

## Contents

- [About the program and the tool](#about-the-program-and-the-tool)
- [Data and security](#data-and-security)
- [Setup](#setup)
- [Reviews and results](#reviews-and-results)
- [Updates and removal](#updates-and-removal)

## About the program and the tool

### What is the difference between the Agent Review Program and the Agent Review Center?

The **Agent Review Program** is the expert-guided service: Microsoft experts work with you to
review your agent, walk through the findings, and validate your fixes. The **Agent Review Center** is
the tool behind it. It runs in your own environment, and it stays there after the engagement so you
can review your agents again whenever you want.

### How do I join the program?

Use the [nomination options on the website](https://microsoft.github.io/AI-Solution-Review/#nominate),
or ask the Microsoft team you already work with about the Agent Review Program. We scope it with you
before anything starts.

### What can it review?

**Copilot Studio agents** in your environment, and **declarative agents** and **skills** uploaded as
files. See [Start a review](run-a-review.md#start-a-review).

### Is the Agent Review Center the same as the Agent Review Tool in the Copilot Agent Kit?

No. The [Copilot Agent Kit](https://learn.microsoft.com/microsoft-copilot-studio/guidance/kit-overview)
includes an earlier tool called the Agent Review Tool. The Agent Review Center is distributed
separately, as the managed solution in this repository. You do not need the Copilot Agent Kit to
install it. If the kit is already installed in the environment you plan to use, check with your
Microsoft contact first.

### Does it cost anything to run?

Running a review consumes Copilot Credits, which must be allocated to the environment where the
Agent Review Center runs. Each user also needs the licenses listed in
[Prerequisites](prerequisites.md#licensing).

## Data and security

### Does my data leave my tenant?

The Agent Review Center is installed in your own tenant and runs against your own agents.
Transcripts, telemetry, and traces are analyzed where they already live, and reviews and results are
stored in Dataverse tables in the environment where you install it. Results are yours — sharing them
outside your team is your decision.

### What does the solution install, and which connectors does it use?

Two apps, two cloud flows, a plug-in, eight Dataverse tables, and two connection references — one
for **Microsoft Dataverse** and one for **Agents**. See
[What gets installed](install.md#what-gets-installed).

### Does it collect telemetry?

The solution includes a cloud flow, **Global | LogFeatureTelemetry I ARC**, that records which
features are used — for example, a review being created or run again — as flow runs in your own
environment. The flow contains no connectors and makes no calls outside your environment. Beyond
that, the two apps run on the Power Apps platform like any other Power Apps app.

### What happens if my files contain a secret?

If something in an uploaded file looks like a credential, it is withheld from the AI-assisted stage
of the review and reported as a finding.

### How do I report a security vulnerability?

Do not open a public issue. Follow [SECURITY.md](../SECURITY.md).

## Setup

### Who needs to be involved?

A Power Platform admin for licensing, credits, and environment settings; a System Administrator in
the environment to import the solution; and the reviewers themselves. See the
[prerequisites checklist](prerequisites.md#checklist).

### Can the Agent Review Center review agents in another environment?

Configuration reviews can cover agents in other environments, but conversation transcripts are only
analyzed in the environment the Agent Review Center runs in. To include runtime analysis, install it
in the same environment as the agent.

### I just turned on transcripts. Can I analyze older conversations?

No. Transcript recording is not retroactive — only conversations after it was turned on are
recorded. This is why we ask you to [turn it on early](prerequisites.md#turn-on-transcripts-early).

### Why is the setup app called "Copilot Agent Kit Installer"?

That is the name of the one-time setup app included in the solution. It connects the Agent Review
Center's connections and starts its review workflow. See
[Run the setup app once](install.md#4-run-the-setup-app-once).

## Reviews and results

### Can I review an agent that has little or no traffic?

Yes. The configuration and orchestration review still runs, but the runtime analysis will have little
to work with.

### Are the findings always right?

Findings labelled **AI generated** come from the AI-assisted stage of the review, and AI-generated
content may be incorrect. Each finding shows its evidence and references so you can check it. If a
rule does not apply to your agent, mark it as a manual pass. See
[Work through the findings](run-a-review.md#work-through-the-findings).

### How do I show that my fixes worked?

Select **Review again** after you make your fixes. Each run is kept as a snapshot, and **View
progress** shows the score across all of them. See [Fix, then review again](run-a-review.md#fix-then-review-again).

### How do I share results?

Select **Share results**, then download a PDF or JSON report. See
[Share the results](run-a-review.md#share-the-results).

## Updates and removal

### How do I know when there is a new version?

New versions are published as [releases](https://github.com/microsoft/AI-Solution-Review/releases)
and listed in the [changelog](../CHANGELOG.md). To be notified, select **Watch** > **Custom** >
**Releases** at the top of this repository.

### How do I upgrade?

Import the new solution file over the existing one. See
[Upgrade to a new version](install.md#upgrade-to-a-new-version).

### How do I remove it?

Delete the solution in Power Apps. This also deletes every review and result. See
[Uninstall](install.md#uninstall).
