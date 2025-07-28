---
sidebar_position: 3
sidebar_label: Using with Deno
---

# Using with Deno

Discordeno supports Deno by using the npm: specifier for your import.

## Pre-Requirements

Before, going forward, please make sure to have finished everything on this list.

- Create an application and get the bot token. [Create Application Guide](../beginner/token)
- Add your bot to a server you own. [Invite Bot Guide](../beginner/inviting)
- Install Discordeno. [Installation Guide](../getting-started.md)
- Setup environment variables. [Environment Variables Guide](../beginner/env)

This is how you can use it to create a bot that logs into discord:

```ts
import { load } from 'https://deno.land/std@0.212.0/dotenv/mod.ts'
import { createBot } from 'npm:@discordeno/bot@21.0.0'

const env = await load()

const bot = createBot({
  token: env.token,
  events: {
    ready: ({ shardId }) => console.log(`Shard ${shardId} ready`),
  },
})

await bot.start()
```

You are free to expand from this point with whatever code you want. Happy coding!
