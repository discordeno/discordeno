---
name: Bug report
about: Create a report to help us improve
title: ""
labels: bug
assignees: ""
---

**Describe the bug** A clear and concise description of what the bug is.

**To Reproduce** Write a small mod.ts example to replicate the behavior.

```ts
import { createBot, startBot } from "https://deno.land/x/discordeno/mod.ts";

const token = "DO NOT PUT TOKEN HERE!!!";
const botId = BigInt(atob(TOKEN.split(".")[0]));

const bot = createBot({
  token,
  botId,
  events: {
    // ADD EVENTS NEEDED TO SHOW THE BUG HERE
  },
  intents: 0, // ADD INTENTS NEEDED HERE FOR YOUR TEST IF NECESSARY
});

await startBot(bot);
```

**Expected behavior** A clear and concise description of what you expected to happen.

**Screenshots** If applicable, add screenshots to help explain your problem.

**Version details (please complete the following information):**

- Discordeno version: [e.g. 10.5.0]
- Deno version: [e.g. 1.8.0]

**Additional context** Add any other context about the problem here.
