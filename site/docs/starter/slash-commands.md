---
sidebar_position: 5
---

# Step 5 - Registering and Handling Slash Commands

As was mentioned in step 3, discord recommends that you implement slash command support in your bot. This is done via
the interaction system. We'll also need to have a list of the guilds our bot is in, so we'll add the discordeno cache
plugin to do this for us.

## Cache Plugin

The [Cache Plugin](https://github.com/discordeno/discordeno/blob/main/plugins/cache) provides a simple way to cache
users and guilds in memory. We need to add it into our dependencies:

```typescript title="deps.ts" {3}
export * from "https://deno.land/x/discordeno@v13.0.0-rc45/mod.ts";
export { config as dotEnvConfig } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";
export * from "https://deno.land/x/discordeno@13.0.0-rc45/plugins/mod.ts";
```

Then enable the plugin as well as it's sweepers:

```typescript title="mod.ts" {5,8,23,30}
// Imports
import { logger } from "./src/utils/logger.ts";
import {
  dotEnvConfig,
  enableCachePlugin, 
  createBot, 
  GatewayIntents, 
  enableCacheSweepers, 
  startBot 
} from "./deps.ts";
import { events } from "./src/events/mod.ts";

const log = logger({ name: "Main" });

// Secrets
dotEnvConfig({ export: true });
export const BOT_TOKEN = Deno.env.get("BOT_TOKEN") || "";
export const BOT_ID = BigInt(atob(BOT_TOKEN.split(".")[0]));

log.info("Starting Bot, this might take a while...");

// Create the Bot Object
export const bot = enableCachePlugin(createBot({
  token: BOT_TOKEN,
  botId: BOT_ID,
  intents: GatewayIntents.Guilds | GatewayIntents.GuildMembers | GatewayIntents.GuildMessages | GatewayIntents.DirectMessages,
  events
}));

enableCacheSweepers(bot);

if (BOT_TOKEN) {
  // Start the bot
  await startBot(bot);
} else {
  throw "Error: No Token!";
}
```

This then exposes `bot.guilds`, `bot.members`, and more. The sweepers will clean the cache to make sure we aren't using
too much memory.

## Creating a Command Type

Since we are writing this project in TypeScript, we should define a type for our commands to follow. This can be defined
in `src/commands/mod.ts`; as well as a `Map()` to contain all our commands:

```typescript title="src/commands/mod.ts"
import { ApplicationCommandOption, ApplicationCommandTypes, Bot, Collection, Interaction } from "../../deps.ts";

// Subcommands are just commands that can't define other subcommands.
export type subCommand = Omit<Command, "subcommands">;

export type subCommandGroup = {
  name: string;
  subCommands: subCommand[];
};

export interface Command {
  name: string;
  description: string;
  usage?: string[];
  options?: ApplicationCommandOption[];
  type: ApplicationCommandTypes;
  /** Defaults to `Guild` */
  scope?: "Global" | "Guild";
  execute: (bot: Bot, interaction: Interaction) => unknown;
  subcommands?: Array<subCommandGroup | subCommand>;
}

export const commands = new Map<string, Command>();

export function addCommand(command: Command) {
  commands.set(command.name, command);
};
```

You may have also noticed a helper function to add a command, this just makes sure that the command's name in the map
matches it's name in the command map. Anyways, you may have also noticed the definitions of `subCommand` and
`subCommandGroup`; these allow us to define the structure of sub-commands as well (because discord supports them, so we
should too).

## Defining Commands

All of our commands will follow the same structure:

```typescript title="src/commands/cmd/ping.ts"
import { addCommand } from "../mod.ts";
import { ApplicationCommandTypes } from "../../../deps.ts";
import { snowflakeToTimestamp, humanizeMilliseconds } from "../../helpers.ts"

addCommand({
  name: "ping",
  description: "Ping the bot.",
  type: ApplicationCommandTypes.ChatInput,
  scope: "Global",
  execute: async (bot, interaction) => {
    const speed = Date.now() - snowflakeToTimestamp(interaction.id);
    await bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `🏓 Pong! Ping ${speed}ms (${humanizeMilliseconds(speed)})`,
        },
      },
    );
  }
});
```

We should also add the following helper functions to `src/utils/helpers.ts`:

```typescript title="src/utils/helpers.ts"
/** Turn a discord snowflake into a millisecond value. */
export function snowflakeToTimestamp(id: bigint) {
  return Number(id / 4194304n + 1420070400000n);
}

/** Turn a millisecond value into a human readable string. */
export function humanizeMilliseconds(milliseconds: number) {
  // Gets ms into seconds
  const time = milliseconds / 1000;
  if (time < 1) return "1s";

  const days = Math.floor(time / 86400);
  const hours = Math.floor((time % 86400) / 3600);
  const minutes = Math.floor(((time % 86400) % 3600) / 60);
  const seconds = Math.floor(((time % 86400) % 3600) % 60);

  const dayString = days ? `${days}d ` : "";
  const hourString = hours ? `${hours}h ` : "";
  const minuteString = minutes ? `${minutes}m ` : "";
  const secondString = seconds ? `${seconds}s ` : "";

  return `${dayString}${hourString}${minuteString}${secondString}`.trim();
}
```
