---
sidebar_position: 3
---

# Lets Create a simple bot in Node.js

- **Step 1**: Create a typescript project with index.ts as main file.

- **Step 2**: Installing packages. Install following packages.

```bash
npm i @thereallonewolf/amethystframework
```

- **Step 3**: Create a index.ts file.

- **Step 4**: Add following code in index.ts file, replacing TOKEN with your bot token.

```ts
import { createBot, GatewayIntents, startBot } from 'discordeno'
import { enableCachePlugin, enableCacheSweepers } from 'discordeno/cache-plugin'
import {
  AmethystBot,
  Category,
  Command,
  Context,
  enableAmethystPlugin,
  Event,
} from '@thereallonewolf/amethystframework'

let baseClient = createBot({
  token: 'TOKEN',
  intents:
    GatewayIntents.Guilds |
    GatewayIntents.GuildMessages |
    GatewayIntents.MessageContent,
})

//@ts-ignore
let client = enableAmethystPlugin(enableCachePlugin(baseClient), {
  botMentionAsPrefix: true,
  prefix: '!', //Can be a function or a string.
  ignoreBots: false,
})
enableCacheSweepers(client)

startBot(client)

@Category({
  name: 'general',
  description: 'My general commands',
  uniqueCommands: true,
  default: '', //As all the commands are unique so no need to set the default command.
})
export class General {
  @Command({
    name: 'ping',
    description: 'Pong!',
    commandType: ['application', 'message'],
    category: 'general',
    args: [],
  })
  async ping(bot: AmethystBot, ctx: Context) {
    ctx.reply({ content: 'Pong!' })
  }

  @Event('ready')
  async ready() {
    console.log('I am ready!')
    client.amethystUtils.updateSlashCommands()
  }
}
```

- **Step 5**: Invite your bot and compile index.ts and run it. Then you can use `/general ping` or `!ping`

- **Step 6**: Useful links:

1. Command Options can be found
   [here](https://github.com/AmethystFramework/framework/blob/master/src/types/commandOptions.ts).
2. Category Options [here](https://github.com/AmethystFramework/framework/blob/master/src/types/categoryOptions.ts)
3. Full [Documentation](https://deno.land/x/amethyst)
