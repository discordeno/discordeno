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

// Commands
import { ping } from "./cmd/ping.ts";

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
  return command;
};

addCommand(ping);
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

export const ping = addCommand({
  // this command will be used `/ping` in discord.
  name: "ping",
  // this will show up as the user is typing the command.
  description: "Ping the bot.",
  // this tells discord that we're going to be receiving text input, this is still required even if we aren't using it.
  type: ApplicationCommandTypes.ChatInput,
  // we should be able to DM the bot to ask for it's ping.
  scope: "Global",
  // this runs when the bot receives the interaction corresponding to this command.
  execute: async (bot, interaction) => {
    // Use the helper function to get the time when the command was executed.
    const speed = Date.now() - snowflakeToTimestamp(interaction.id);
    // Send a reply to the user with the time to receive the interaction.
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

## Registering Slash Commands

You may have noticed the `Command.scope` option when defining a command. This is because discord provides two scopes
when defining a slash command, one for just Guilds and one for Global commands. Guild commands need to be registered
per-guild, while Global commands can be used in any guild, and in DMs.

We need to tell discord about our commands, so we need to register them. We can do that on bot startup, and when the bot
joins a new guild (read the comments as they explain what each function does):

```typescript title="src/utils/helpers.ts, Lines 1-88"
import {
  Bot,
  BotWithCache,
  CreateApplicationCommand,
  getGuild,
  Guild,
  hasProperty,
  MakeRequired,
  upsertApplicationCommands,
} from "../../deps.ts";
import { logger } from "./logger.ts";
import { commands } from "../commands/mod.ts";
import { subCommand, subCommandGroup } from "../commands/mod.ts";

const log = logger({ name: "Helpers" });

/** This function will update all commands, or the defined scope */
export async function updateCommands(
  bot: BotWithCache,
  scope?: "Guild" | "Global",
) {
  // discordeno uses `CreateApplicationCommand` internally, so we need to match it to our `Command` object
  const globalCommands: MakeRequired<CreateApplicationCommand, "name">[] = [];
  const perGuildCommands: MakeRequired<CreateApplicationCommand, "name">[] = [];

  // This runs over every command in our command map, so it's important they are loaded before this function runs.
  for (const command of commands.values()) {
    // We should check if the command defines a specific scope, if not check the `else`
    if (command.scope) {
      // Push guild commands
      if (command.scope === "Guild") {
        perGuildCommands.push({
          name: command.name,
          description: command.description,
          type: command.type,
          options: command.options ? command.options : undefined,
        });
        // Push Global (all guilds + DMs) commands
      } else if (command.scope === "Global") {
        globalCommands.push({
          name: command.name,
          description: command.description,
          type: command.type,
          options: command.options ? command.options : undefined,
        });
      }
    } else {
      // Push commands without a scope to every guild (all guilds, no DMs)
      perGuildCommands.push({
        name: command.name,
        description: command.description,
        type: command.type,
        options: command.options ? command.options : undefined,
      });
    }
  }

  if (globalCommands.length && (scope === "Global" || scope === undefined)) {
    // Due to the way discord internally handles global commands, it might take up to an hour before they are available.
    log.info(
      "Updating Global Commands, changes should apply shortly...",
    );
    // Upsert will add commands, replace existing commands, and delete ones that do not exist anymore.
    await bot.helpers.upsertApplicationCommands(globalCommands).catch(
      log.error,
    );
  }

  if (perGuildCommands.length && (scope === "Guild" || scope === undefined)) {
    await bot.guilds.forEach(async (guild: Guild) => {
      // Upsert will add commands, replace existing commands, and delete ones that do not exist anymore.
      await upsertApplicationCommands(bot, perGuildCommands, guild.id);
    });
  }
}

/** Update commands for a guild */
export async function updateGuildCommands(bot: Bot, guild: Guild) {
  const perGuildCommands: MakeRequired<CreateApplicationCommand, "name">[] = [];

  // Goes over all commands in the command map, so it's important to load the commands before running this function.
  for (const command of commands.values()) {
    if (command.scope) {
      // Since we are only updating guild commands, we should only select commands with the "Guild" scope.
      if (command.scope === "Guild") {
        perGuildCommands.push({
          name: command.name,
          description: command.description,
          type: command.type,
          options: command.options ? command.options : undefined,
        });
      }
    }
  }

  if (perGuildCommands.length) {
    // Upsert will add commands, replace existing commands, and delete ones that do not exist anymore.
    await upsertApplicationCommands(bot, perGuildCommands, guild.id);
  }
}
// ...
```

We'll add this to our `mod.ts` to make sure that we always have the latest commands ready for users:

```typescript title="mod.ts"
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
// highlight-next-line
import { updateCommands } from "./src/utils/helpers.ts";

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
  // highlight-start
  // Update all commands
  await updateCommands(bot);
  // highlight-end
} else {
  throw "Error: No Token!";
}
```

Then add the following to the `guildCreate` event handler to make sure new guilds also get our guild only commands:

```typescript title="src/events/guildCreate.ts"
import { events } from "./mod.ts";
import { logger } from "../utils/logger.ts";
import { updateGuildCommands } from "../utils/helpers.ts";

const log = logger({ name: "Events: guildCreate", });

events.guildCreate = (rawBot, guild) => {
  const bot = rawBot as BotWithCache;

  log.info(`Bot joined guild ${guild.name} (${guild.id})`);
  updateGuildCommands(bot, guild);
}
```

## Handling Commands

We're nearly there! Our bot can now define and register commands; which is great, but it can't actually run any
commands. If we were to start the bot and run `/ping` in discord, it would show an error message and we would only log
that the interaction happened (see step 4). Let's fix that by adding onto the `interactionCreate` event handler:

```typescript title="src/events/interactionCreate.ts"
import {
  ApplicationCommandOptionTypes,
  bgBlack,
  bgYellow,
  black,
  BotWithCache,
  green,
  Guild,
  red,
  white,
  yellow,
} from "../../deps.ts";
import { Command, commands } from "../commands/mod.ts";
import { getGuildFromId, isSubCommand, isSubCommandGroup } from "../utils/helpers.ts";
import { logger } from "../utils/logger.ts";
import { events } from "./mod.ts";

const log = logger({ name: "Event: interactionCreate" });

events.interactionCreate = async (rawBot, interaction) => {
  const bot = rawBot as BotWithCache;

  if (interaction.data && interaction.id) {
    let guildName = "Direct Message";
    let guild = {} as Guild;

    // Set guild, if there was an error getting the guild, then just say it was a DM.
    if (interaction.guildId) {
      const guildOrVoid = await getGuildFromId(bot, interaction.guildId).catch(
        (err) => {
          log.error(err);
        },
      );
      if (guildOrVoid) {
        guild = guildOrVoid;
        guildName = guild.name;
      }
    }

    // Log the interaction in the first place.
    log.info(
      `[Command: ${bgYellow(black(String(interaction.data.name)))} - ${
        bgBlack(white(`Trigger`))
      }] by ${interaction.user.username}#${interaction.user.discriminator} in ${guildName}${
        guildName !== "Direct Message" ? ` (${guild.id})` : ``
      }`,
    );

    // Check if the command exists in our command map.
    let command: undefined | Command = interaction.data.name ? commands.get(interaction.data.name) : undefined;
    let commandName = command?.name;

    // If the command does exist:
    if (command !== undefined) {
      if (interaction.data.name) {
        if (interaction.data.options?.[0]) {
          const optionType = interaction.data.options[0].type;

          if (optionType === ApplicationCommandOptionTypes.SubCommandGroup) {
            // Check if command has subcommand and handle types
            if (!command.subcommands) return;

            // Try to find the subcommand group
            const subCommandGroup = command.subcommands?.find(
              (command) => command.name == interaction.data?.options?.[0].name,
            );
            if (!subCommandGroup) return;

            if (isSubCommand(subCommandGroup)) return;

            // Get name of the command which we are looking for
            const targetCmdName = interaction.data.options?.[0].options?.[0].name ||
              interaction.data.options?.[0].options?.[0].name;
            if (!targetCmdName) return;

            // Try to find the command
            command = subCommandGroup.subCommands.find((c) => c.name === targetCmdName);

            commandName += ` ${subCommandGroup.name} ${command?.name}`;

            // Normal
          }

          if (optionType === ApplicationCommandOptionTypes.SubCommandGroup) {
            // Check if command has subcommand and handle types
            if (!command?.subcommands) return;

            // Try to find the command
            const found = command.subcommands.find((command) => command.name == interaction.data?.options?.[0].name);
            if (!found) return;

            if (isSubCommandGroup(found)) return;

            command = found;
            commandName += ` ${command?.name}`;
          }
        }

        // Due to the nature of commands, we want to make sure that one failed command won't crash the whole bot.
        try {
          if (command) {
            await command.execute(rawBot, interaction);
            log.info(
              `[Command: ${bgYellow(black(String(interaction.data.name)))} - ${
                bgBlack(green(`Success`))
              }] by ${interaction.user.username}#${interaction.user.discriminator} in ${guildName}${
                guildName !== "Direct Message" ? ` (${guild.id})` : ``
              }`,
            );
          } else {
            throw "";
          }
          // Speaking of failed commands, this will just print out the error and move on:
        } catch (err) {
          log.error(
            `[Command: ${bgYellow(black(String(interaction.data.name)))} - ${
              bgBlack(red(`Error`))
            }] by ${interaction.user.username}#${interaction.user.discriminator} in ${guildName}${
              guildName !== "Direct Message" ? ` (${guild.id})` : ``
            }`,
          );
          err.length ? log.error(err) : undefined;
        }
        // Other than that, we should log that we couldn't find the command:
      } else {
        log.warn(
          `[Command: ${bgYellow(black(String(interaction.data.name)))} - ${
            bgBlack(yellow(`Not Found`))
          }] by ${interaction.user.username}#${interaction.user.discriminator} in ${guildName}${
            guildName !== "Direct Message" ? ` (${guild.id})` : ``
          }`,
        );
      }
    }
  }
};
```

That might seem scary, however, we've included a lot of comments to help you understand what it does. We also need to
add some more helpers to the `src/utils/helpers.ts` file (make sure to import types from `src/commands/mod.ts` and
`deps.ts`):

```typescript title="src/utils/helpers.ts"
// ...

export async function getGuildFromId(
  bot: BotWithCache,
  guildId: bigint,
): Promise<Guild> {
  let returnValue: Guild = {} as Guild;

  if (guildId !== 0n) {
    if (bot.guilds.get(guildId)) {
      returnValue = bot.guilds.get(guildId) as Guild;
    }

    await getGuild(bot, guildId).then((guild) => {
      if (guild) bot.guilds.set(guildId, guild);
      if (guild) returnValue = guild;
    });
  }

  return returnValue;
}

export function isSubCommand(
  data: subCommand | subCommandGroup,
): data is subCommand {
  return !hasProperty(data, "subCommands");
}

export function isSubCommandGroup(
  data: subCommand | subCommandGroup,
): data is subCommandGroup {
  return hasProperty(data, "subCommands");
}
```

## Using Commands

Now that we have all of these files in place, we can test out the `/ping` command. So, restart the bot, and you should
see something like when you start up and run `/ping` in discord:

```txt
[8/25/2022 9:33:56 AM] INFO Main > Starting Bot, this might take a while...
[8/25/2022 9:33:57 AM] INFO Helpers > Updating Global Commands, changes should apply shortly...
[8/25/2022 9:33:57 AM] INFO Event: Ready > Bot Ready!
[8/25/2022 9:34:32 AM] INFO Event: InteractionCreate > [Command: ping - Trigger] by User#000 in Server (111111111111111111)
[8/25/2022 9:34:32 AM] INFO Event: InteractionCreate > [Command: ping - Success] by User#000 in Server (111111111111111111)
```

And the response in discord would be something like:

```txt
🏓 Pong! Ping 129ms (1s)
```

---

Amazing, You just created a working discord bot! This could be used for a small amount of guilds, or just for you and
your friends. However, this bot is definitely not optimized to work in many guilds with a large number of users per
guild. In this case, we need to manually write logic to handle these cases; but first, we should cover what goes into
building a bigger bot...
