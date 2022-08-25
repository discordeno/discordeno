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
+      cmd/
+        ping.ts
+    utils/
+      logger.ts
+      helpers.ts
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

```typescript title="mod.ts, Lines 2-3"
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
  console.log("Bot Ready!");
}
```

```typescript title="src/events/guildCreate.ts"
import { events } from "./mod.ts";

events.guildCreate = (_, guild) => {
  console.log(`Bot Joined Guild ${guild.name} (${guild.id})`);
}
```

```typescript title="src/events/interactionCreate.ts"
import { events } from "./mod.ts";

events.interactionCreate = (_, interaction) => {
  console.log(`Interaction ${interaction.id} created by ${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id})`);
}
```

Then, import all of these files into `src/events/mod.ts` to load their handlers:

```typescript title="src/events/mod.ts"
import { EventHandlers } from "../../deps.ts";

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
import { dotEnvConfig, createBot, GatewayIntents, startBot } from "./deps.ts";
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

## `src/utils/logger.ts`

We should have a nicer way to log information, so we will use this logger (you can find it in most, if not all of our
templates):

```typescript title="src/utils/logger.ts"
// deno-lint-ignore-file no-explicit-any
import { bold, cyan, gray, italic, red, yellow } from "../../deps.ts";

export enum LogLevels {
  Debug,
  Info,
  Warn,
  Error,
  Fatal,
}

const prefixes = new Map<LogLevels, string>([
  [LogLevels.Debug, "DEBUG"],
  [LogLevels.Info, "INFO"],
  [LogLevels.Warn, "WARN"],
  [LogLevels.Error, "ERROR"],
  [LogLevels.Fatal, "FATAL"],
]);

const noColor: (str: string) => string = (msg) => msg;
const colorFunctions = new Map<LogLevels, (str: string) => string>([
  [LogLevels.Debug, gray],
  [LogLevels.Info, cyan],
  [LogLevels.Warn, yellow],
  [LogLevels.Error, (str: string) => red(str)],
  [LogLevels.Fatal, (str: string) => red(bold(italic(str)))],
]);

export function logger({
  logLevel = LogLevels.Info,
  name,
}: {
  logLevel?: LogLevels;
  name?: string;
} = {}) {
  function log(level: LogLevels, ...args: any[]) {
    if (level < logLevel) return;

    let color = colorFunctions.get(level);
    if (!color) color = noColor;

    const date = new Date();
    const log = [
      `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`,
      color(prefixes.get(level) || "DEBUG"),
      name ? `${name} >` : ">",
      ...args,
    ];

    switch (level) {
      case LogLevels.Debug:
        return console.debug(...log);
      case LogLevels.Info:
        return console.info(...log);
      case LogLevels.Warn:
        return console.warn(...log);
      case LogLevels.Error:
        return console.error(...log);
      case LogLevels.Fatal:
        return console.error(...log);
      default:
        return console.log(...log);
    }
  }

  function setLevel(level: LogLevels) {
    logLevel = level;
  }

  function debug(...args: any[]) {
    log(LogLevels.Debug, ...args);
  }

  function info(...args: any[]) {
    log(LogLevels.Info, ...args);
  }

  function warn(...args: any[]) {
    log(LogLevels.Warn, ...args);
  }

  function error(...args: any[]) {
    log(LogLevels.Error, ...args);
  }

  function fatal(...args: any[]) {
    log(LogLevels.Fatal, ...args);
  }

  return {
    log,
    setLevel,
    debug,
    info,
    warn,
    error,
    fatal,
  };
}

export const log = logger();
```

We can define a logger instance with `const log = logger({ name: "Main" })`; you might also see a log level, which sets
the minimum log level for our logger (by default it's `info`). Next, update our files to use the logger:

```typescript title="mod.ts"
// Imports
import { logger } from "./src/utils/logger.ts";
import { dotEnvConfig, createBot, GatewayIntents, startBot } from "./deps.ts";
import { events } from "./src/events/mod.ts";

// highlight-next-line
const log = logger({ name: "Main" });

// Secrets
dotEnvConfig({ export: true });
export const BOT_TOKEN = Deno.env.get("BOT_TOKEN") || "";
export const BOT_ID = BigInt(atob(BOT_TOKEN.split(".")[0]));

// highlight-next-line
log.info("Starting Bot, this might take a while...");

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

```typescript title="src/events/ready.ts"
import { events } from "./mod.ts";
import { logger } from "../utils/logger.ts";

const log = logger({ name: "Events: ready" });

events.ready = () => {
  log.info("Bot Ready!");
}
```

```typescript title="src/events/guildCreate.ts"
import { events } from "./mod.ts";
import { logger } from "../utils/logger.ts";

const log = logger({ name: "Events: guildCreate", });

events.guildCreate = (_, guild) => {
  log.info(`Bot joined guild ${guild.name} (${guild.id})`);
}
```

```typescript title="src/events/interactionCreate.ts"
import { events } from "./mod.ts";
import { logger } from "../utils/logger.ts";

const log = logger({ name: "Events: interactionCreate" });

events.interactionCreate = () => {
  log.info(`Interaction ${interaction.id} created by ${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id})`);
}
```

---

We'll cover the `src/commands/` directory next...
