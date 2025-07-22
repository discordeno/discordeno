---
sidebar_position: 2
sidebar_label: Using with Node.js
---

# Using with Node.js

Discordeno supports Node.js by installing the `@discordeno/bot` package

## Pre-Requirements

Before, going forward, please make sure to have finished everything on this list.

- Create an application and get the bot token. [Create Application Guide](../beginner/token)
- Add your bot to a server you own. [Invite Bot Guide](../beginner/inviting)
- Install Discordeno. [Installation Guide](../getting-started.md)
- Setup environment variables. [Environment Variables Guide](../beginner/env)

After you installed the `@discordeno/bot` package with npm, yarn, pnpm or bun you can start using it.

This is how you can use it to create a bot that logs into discord:

```ts
import 'dotenv/config'
import { createBot } from '@discordeno/bot'

const bot = createBot({
  token: process.env.token,
  events: {
    ready: ({ shardId }) => console.log(`Shard ${shardId} ready`),
  },
})

await bot.start()
```

:::note
For this example we will be using the env setup with `dotenv`
:::

You are free to expand from this point with whatever code you want. Happy coding!
