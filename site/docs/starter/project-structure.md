---
sidebar_position: 4
---

# Step 4 - Project Structure

Although the previous page's method of creating a bot is available, it isn't the greatest, as we only have one large
file. This is okay for extremely simple bots, but becomes very hard to maintain as you add more commands. We can fix
this by defining all our event handlers in separate files. To do this, we'll create an `src/` directory, as well as
other directories and files within it.

Let's create the following project structure. Items that end with a `/` are directories. Don't worry about the contents
of those files, we'll go over them in a second.:

```diff
 /
+  src/
+    events/
+      mod.ts
+      interactionCreate.ts
+      ready.ts
+      guildCreate.ts
+    commands/
+      mod.ts
+      user/
+        ping.ts
+      dev/
+        reload.ts
   mod.ts
+  deps.ts
   .gitignore
   .env
```

## `deps.ts`

Deno uses ES6 import syntax; to make sure we use the same version of all of our project dependencies, we can define them
in a file like `deps.ts`. Like so:

```typescript title="deps.ts"
export * from "https://deno.land/x/discordeno@v13.0.0-rc45/mod.ts";
export { config as dotEnvConfig } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";
```

And changing our imports:

```typescript title="mod.ts"
// Before
import { createBot, GatewayIntents, startBot } from "https://deno.land/x/discordeno@v13.0.0-rc45/mod.ts";
import { config as dotEnvConfig } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";

// After
import { dotEnvConfig, createBot, GatewayIntents, startBot } from "./deps.ts";
```

## `src/events/`

This directory contains all of our events and the code that glues them together. We'll setup an object to hold our
events which will then be imported into the main file.

First, define all our events:

```typescript title="src/events/ready.ts"
import { events } from "./mod.ts";

events.ready = () => {
  console.log("");
}
```

```typescript title="src/events/guildCreate.ts"
import { events } from "./mod.ts";

events.guildCreate = () => {
  
}
```

```typescript title="src/events/interactionCreate.ts"
import { events } from "./mod.ts";

events.interactionCreate = () => {

}
```

Then, import all of these files into `src/events/mod.ts` to load their handlers:

```typescript title="src/events/mod.ts"
import { EventHandlers } from "../../../deps.ts";

// Our actual event handler object.
export const events: Partial<EventHandlers> = {};

// We'll use a dynamic file loader for this later...
import "./ready.ts";
import "./guildCreate.ts";
import "./interactionCreate.ts";
```

And now we can import that into `mod.ts`:

```typescript title="mod.ts" {4,18}
// Imports
import { createBot, GatewayIntents, startBot } from "https://deno.land/x/discordeno@v13.0.0-rc45/mod.ts";
import { config as dotEnvConfig } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";
import { events } from "./src/events/mod.ts";

// Secrets
dotEnvConfig({ export: true });
export const BOT_TOKEN = Deno.env.get("BOT_TOKEN") || "";
export const BOT_ID = BigInt(atob(BOT_TOKEN.split(".")[0]));

console.log("Starting Bot, this might take a while...");

// Create the Bot Object
export const bot = createBot({
  token: BOT_TOKEN,
  botId: BOT_ID,
  intents: GatewayIntents.Guilds | GatewayIntents.GuildMembers | GatewayIntents.GuildMessages | GatewayIntents.DirectMessages,
  events
});

if (BOT_TOKEN) {
  // Start the bot
  await startBot(bot);
} else {
  throw "Error: No Token!";
}
```

---

We'll cover the `src/commands/` directory next...
