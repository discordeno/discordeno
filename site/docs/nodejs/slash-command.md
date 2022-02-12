---
sidebar_position: 5
---
# Slash Commands
Due to the depreciation of message intent, message commands will play a subordinate role in the future. Discord users will be more used to slash commands. That's why it's essential that every bot offers them.

In the following we will show how to create slash commands 

## Deploying Slash Commands
There is a distinction between global commands and guild commands. Global Commands take a while to appear in all guilds. Guild Commands are deployed directly, but have a strict rate limit. 

That is the reason, why we are showing now how to deploy guild commands, in order to test them immediately.

```js
const command = {
    name: 'ping',
    description: 'Retrives the Bot latency',
    options:[],
}
client.helpers.createApplicationCommand(command, BigInt('GUILDID'));
```

This is a very simple example, you can also add sub commands group and sub commands...

## Handling Slash Commands

Discord sends a Websocket Event, when a user runs a slash command.
You can listen to this event by add the `interactionCreate` function in the client.


```js
const Discord = require("discordeno");
const config = require("./config.json");

const client = Discord.createBot({
  events: {
    ready(client, payload) {
      console.log(`Successfully connected Shard ${payload.shardId} to gateway`);
    },
    interactionCreate(client, interaction) {
      if (interaction.data?.name === "ping") {
        client.helpers.sendInteractionResponse(interaction.id, interaction.token, { type: Discord.InteractionResponseTypes.ChannelMessageWithSource, data: { content: "Pong!" } });
      }
    },
  },
  intents: ["Guilds", "GuildMessages"],
  token: configs.token,
});

Discord.startBot(client);
```

The handling may see complicated in the beginning, but as mentioned before, we will introduce [structures](./design) to make it easier.