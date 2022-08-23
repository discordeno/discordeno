---
sidebar_position: 2
---

# Step 2 - The Main File

If you don't already know, Deno (if not using the REPL) will take in a file, parse it, and run the JavaScript or
TypeScript contained within. (This is a very simple explanation of what Deno actually does, you can checkout the
[deno manual](https://deno.land/manual/introduction) for a better breakdown of how it works and how to use it.)

So we'll create a file called `mod.ts` in the project root containing the following:

```typescript showLineNumbers title="mod.ts"
// Imports
import { createBot, startBot } from "https://deno.land/x/discordeno@v13.0.0-rc45/mod.ts";
import { config as dotEnvConfig } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";

// Secrets
dotEnvConfig({ export: true });
export const BOT_TOKEN = Deno.env.get("BOT_TOKEN") || "";
export const BOT_ID = BigInt(atob(BOT_TOKEN.split(".")[0]));

console.log("Starting Bot, this might take a while...");

// Create the Bot Object
export const bot = createBot({
  token: BOT_TOKEN,
  botId: BOT_ID,
  intents: [],
  events: {
    ready: () => {
      console.log("Bot ready!");
    }
  }
});

if (BOT_TOKEN) {
  // Start the bot
  await startBot(bot);
} else {
  throw "Error: No Token!";
}
```

Let's go over what this file does before we start the bot.

## Imports

```typescript title="mod.ts, Lines 1-3"
// Imports
import { createBot, startBot } from "https://deno.land/x/discordeno@v13.0.0-rc45/mod.ts";
import { config as dotEnvConfig } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";
```

This example is using version `13.0.0-rc45` of the discordeno library; and version `3.1.0` of the dotenv library.
Discordeno provides an abstraction above the Discord API as well as utilities to create a good bot without too much
boilerplate code. Dotenv provides a parser for `.env` files, these are commonly used to hold secrets like our bot token.

## Secrets

```typescript title="mod.ts, Lines 5-8"
// Secrets
dotEnvConfig({ export: true });
export const BOT_TOKEN = Deno.env.get("BOT_TOKEN") || "";
export const BOT_ID = BigInt(atob(BOT_TOKEN.split(".")[0]));
```

In step 1, we created a Discord Application with an accompanying bot. That bot has a token which allows our bot's code
to access the discord API as our bot. We also created a `.env` file containing our bot token. This snippet allows us to
programmatically access that file and the token it contains.

## Create the Bot Object

```typescript title="mod.ts, Lines 12-22"
// Define the Bot Object
export const bot = createBot({
  token: BOT_TOKEN,
  botId: BOT_ID,
  intents: [],
  events: {
    ready: () => {
      console.log("Bot ready!");
    }
  }
});
```

Despite the notion of functional programming, we still need a way to refer to our bot in the source code. This
functionality is provided by the bot object. It contains helpers, and bot identification information which allows us to
refer to the bot when making API calls. The bot also holds other useful functions and values which are made available to
many different parts of your bot's code; [plugins](https://github.com/discordeno/discordeno/blob/main/plugins) mainly
use the bot object to contain their helpers and stored values.

## Starting the Bot

```typescript title="mod.ts, Lines 24-25"
if (BOT_TOKEN) {
  // Start the bot
  await startBot(bot);
} else {
  throw "Error: No Token!";
}
```

This snippet actually connects the bot to the discord API if we have a `BOT_TOKEN`; else, we error out. You can get a
better understanding of what this function does in [the big bot guide](/docs/big-bot-guide/big-bot-structure), but you
don't really need to know much more about it for right now. Just know that it connects your bot to discord.

---

Speaking of starting the bot, we should do that right about now. Run the following in your terminal (assuming you're in
the same directory as `mod.ts` and `.env`, which you should):

```bash
deno run -A mod.ts
```

This gives us the following output (you might see a bit more above these lines as deno caches our dependencies for the
first time):

```txt
Starting Bot, this might take a while...
Bot ready!
```

If you look in discord, you will see that your bot now appears to be online! You might also notice that our bot isn't
doing anything, as it doesn't have any other event handlers, or commands to execute. Let's fix that...
