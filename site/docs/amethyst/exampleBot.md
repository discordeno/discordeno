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
import { ActivityTypes, Bot, createBot, GatewayIntents, startBot } from "discordeno";
import { enableCachePlugin, enableCacheSweepers } from "discordeno/cache-plugin";
import { AmethystBot, Context, enableAmethystPlugin } from "@thereallonewolf/amethystframework";

config();
let baseClient = createBot({
  token: "TOKEN",
  intents: GatewayIntents.Guilds | GatewayIntents.GuildMessages | GatewayIntents.MessageContent,
});

//@ts-ignore
let client = enableAmethystPlugin(enableCachePlugin(baseClient), {
  botMentionAsPrefix: true,
  prefix: "!", //Can be a function or a string.
  ignoreBots: false,
});
enableCacheSweepers(client);

client.on("ready", () => {
  console.log("I am up and running");
});

client.amethystUtils.createCategory({
  name: "general",
  description: "My general commands",
  uniqueCommands: true,
  default: "",
});
client.amethystUtils.createCommand({
  name: "ping",
  description: "Pong!",
  commandType: ["application", "message"],
  category: "general",
  args: [],
  async execute(bot: AmethystBot, ctx: Context) {
    ctx.reply({ content: "Pong!" });
  },
});

client.amethystUtils.updateSlashCommands();
startBot(client);
```

- **Step 5**: Invite your bot and compile index.ts and run it. Then you can use `/general ping` or `!ping`

- **Step 6**: Useful links:

1. Command Options can be found
   [here](https://github.com/AmethystFramework/framework/blob/master/src/types/commandOptions.ts).
2. Category Options [here](https://github.com/AmethystFramework/framework/blob/master/src/types/categoryOptions.ts)
3. Full [Documentation](https://deno.land/x/amethyst)
