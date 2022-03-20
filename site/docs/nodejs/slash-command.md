---
sidebar_position: 5
---

# Slash Commands

Since Discord has decided to make message content accessible only to privileged bots, message commands will play a
subordinate role in the future. Discord users will be more used to slash commands. That's why it's essential that every
bot offers them.

In the following we will show you how to create slash commands:

## Deploying Slash Commands

There is a difference between global and guild commands. Global commands take a while to appear in all guilds. Guild
commands show up directly.

For this reason, we will now show how to create guild commands, in order to test them immediately.

```js
const guildId = BigInt("YOUR_GUILD_ID");
const command = {
  name: "ping",
  description: "Retrieves the Bot latency",
  options: [],
};

client.helpers.createApplicationCommand(command, guildId);
```

This is just very simple example, you can also add sub commands, select options and much more.

## Handling Slash Commands

Discord sends a WebSocket Event when a user runs a slash command. You can listen to this event by adding the
`interactionCreate` function in the client.

```js
const Discord = require("discordeno");
const config = require("./config.json");

const client = Discord.createBot({
  events: {
    ready(client, payload) {
      console.log(`Successfully connected Shard ${payload.shardId} to the gateway`);
    },
    async interactionCreate(client, interaction) {
      if (interaction.data?.name === "ping") {
        return await client.helpers.sendInteractionResponse(interaction.id, interaction.token, {
          type: Discord.InteractionResponseTypes.ChannelMessageWithSource,
          data: { content: "🏓 Pong!" },
        });
      }
    },
  },
  intents: ["Guilds"],
  token: config.token,
});

Discord.startBot(client);
```

The handling may see complicated in the beginning, but as mentioned before, we will introduce structures to make it
easier.
