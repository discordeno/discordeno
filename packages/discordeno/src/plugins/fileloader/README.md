# fileloader-plugin

This plugin leverages the ability to write files, and then import them.

## Code Example

```typescript
import { createBot, enableFileLoaderPlugin, Intents, startBot } from "./deps.ts"; // Import discordeno and this plugin.

console.log("Starting Up the Bot, this might take awhile...");

const bot = enableFileLoaderPlugin(
  createBot({
    token: "", // Your bot's token
    botId: 0n, // Your bot's "Application Id",
    intents: Intents.Guilds,
    events: {
      ready() {
        console.log("Bot Ready");
      },
    },
  }),
);

bot.fastFileLoader([
  // './src/commands', etc. This works just like `import [something] from [somewhere]`
]);

startBot(bot);
```

Make sure to ignore `fileloader.ts` in git as it is (re)generated where you (re)start the bot.
