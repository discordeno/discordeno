---
sidebar_position: 2
sidebar_label: Using with Deno
---

# Using with Deno

To be able to use Discordeno with Deno there is one workaround needed if you are using the gateway package.
We need to make Deno use the websocket from Deno instead of the one which is used in node, because the npm support in Deno cannot use our websocket correctly.

To do it you can use a workaround provided here: https://nest.land/package/katsura/files/src/discordenoFixes/gatewaySocket.ts

You would use it like this.

```ts
import { load } from 'https://x.nest.land/Yenv@1.0.0/mod.ts'
// Import it like this. There might be a newer version of this fix later, but I would not expect much changes.
import { fixGatewayWebsocket } from 'https://x.nest.land/katsura@1.3.9/src/discordenoFixes/gatewaySocket.ts'
import { createBot } from 'npm:@discordeno/bot@19.0.0-next.5c42bdd'

const env = await load({
  token: /[M-Z][A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27}/,
})

const bot = createBot({
  token: env.token,
  events: {
    ready: data => console.log(`Shard ${data.shardId} ready`),
  },
})

// Use this function with the gateway managerr
fixGatewayWebsocket(bot.gateway)

await bot.start()
```
