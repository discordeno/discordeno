---
sidebar_position: 3
---

# Step 3 - Event Handlers

As was said earlier, our bot doesn't do anything other than appear online to let us know that it's running. Discordeno
uses event handlers to handle events; so let's set some up.

Back in `mod.ts`, add the highlighted changes:

```typescript title="mod.ts"
// Imports
import { createBot, GatewayIntents, startBot } from "https://deno.land/x/discordeno@v13.0.0-rc45/mod.ts";
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
  // highlight-next-line
  intents: GatewayIntents.Guilds | GatewayIntents.GuildMembers | GatewayIntents.GuildMessages | GatewayIntents.DirectMessages,
  events: {
    ready: () => {
      console.log("Bot ready!");
    },
    // highlight-start
    messageCreate: (_, message) => {
      console.log(`${message.authorId}: ${message.content}`);
    }
    // highlight-end
  }
});

if (BOT_TOKEN) {
  // Start the bot
  await startBot(bot);
} else {
  throw "Error: No Token!";
}
```

## Intents

```typescript title="mod.ts, Line 17"
{
  // ...
  intents: GatewayIntents.Guilds | GatewayIntents.GuildMembers | GatewayIntents.GuildMessages | GatewayIntents.DirectMessages,
  // ...
}
```

Due to the way that discord works, bots must specify intents to be able to access certain information and API endpoints.
Here we're just defining the ability for the bot to access guild information, the list of guild members for each guild,
and messages in channels the bot has access to.

:::note Guilds vs Servers

The term "Guild" is the technical name for a "Server". This can be confusing sometimes. But a group of channels on the
discord client which is called a "Server" is actually a "Guild" on the backend.

:::

## `messageCreate` Handler

```typescript title="mod.ts, Lines 21-23"
{
  // ...
  messageCreate: (_, message) => {
    console.log(`${message.authorId}: ${message.content}`);
  }
  // ...
}
```

As mentioned above, discordeno uses functions to handle events. In this case, we're defining an event handler for new
messages. This handler will just log the author's user ID and the message contents to the console. This is the way that
we searched for commands before discord introduced slash commands. Due to this fact, discord is encouraging users to not
use message commands; as well as requiring verification of this intent for bots in more than 100 servers. We'll cover
slash commands later.

---

We can try running the bot now with the following output:

```txt
Starting Bot, this might take a while...
Bot ready!
```

When you send "Hello, World!" in a channel that the bot can see, you should get the following output:

```txt
Starting Bot, this might take a while...
Bot ready!
111111111111111111: Hello, World!
```

That number will be different from the number you see as each user has a unique ID, and this function will print that
out. Great! You might start to notice a problem with our bot soon...
