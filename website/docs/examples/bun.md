---
sidebar_position: 4
sidebar_label: Using with Bun
---

# Using with Bun

Discordeno supports Bun by installing the `@discordeno/bot` package

## Pre-Requirements

Before, going forward, please make sure to have finished everything on this list.

- Create an application and get the bot token. [Create Application Guide](https://discordeno.js.org/docs/beginner/token)
- Add your bot to a server you own. [Invite Bot Guide](https://discordeno.js.org/docs/beginner/inviting)
- Install Discordeno. [Installation Guide](https://discordeno.js.org)
- Setup environment variables. [Environment Variables Guide](https://discordeno.js.org/docs/beginner/env)

After you installed the `@discordeno/bot` package with bun you can start using it.

This is how you can use it to create a bot that logs into discord:

```ts
import { createBot } from '@discordeno/bot'

const bot = createBot({
  token: Bun.env.token,
  events: {
    ready: ({ shardId }) => console.log(`Shard ${shardId} ready`),
  },
})

await bot.start()
```

:::note
If you want you can use bun with any package manager, so if you want to can use npm to install the `node_modules` and use bun to run the code
:::

You are free to expand from this point with whatever code you want. Happy coding!
