---
sidebar_position: 2
---

# Command Manager

Currently, you probably have something like this in your code:

```js
const Discord = require("discordeno");
// Ideally you should move to an `.env` file
const config = require("./config.json");

const client = Discord.createBot({
  events: {
    messageCreate(client, message) {
      if (message.content === "!ping") {
        client.helpers.sendMessage(message.channelId, { content: "pong" });
      }
    },
  },
  intents: ["Guilds", "GuildMessages"],
  token: config.token,
});

Discord.startBot(client);
```

Of course, if you add more and more commands and as your code base grows, you can lose track very quickly.

To avoid this, it is recommended to store the commands in separate folders divided into different categories.

[Previously, we introduced you to our plugin structure, which has a lot of advantages.](../design.md)

```root
├Plugins/
├── General/
│   ├── commands/
│   │   ├── ping.js
│   │   └── ...
├── Developer/
│   ├── commands/
│   │   ├── eval.js
│   │   └── ...
└── ...
```

**Get [this file](https://github.com/discordeno/discordeno/tree/main/template/nodejs/Managers/CommandManager.js) from
the [nodejs template](https://github.com/discordeno/discordeno/tree/main/template)**

```js
const CommandManager = require("./template/Managers/CommandManager.js");
const manager = new CommandManager({});
manager.load({ plugin: true }); // Load the commands
client.commands = manager;

client.commands.cache.get("ping"); // Get the `ping` command
```

The Manager will automatically iterate through all files in the folder and then load them into the cache property, which
is mapped on the command name.

**Take a look at [Create Command](./create-command.md) to learn how to create a command.**

## Handle Command

The manager also contains a handler for executing the command when a message is received.

:::important

Currently checks for permissions, cooldowns, and rate limits are not covered, but these will be added soon.

:::

### Message Create Event:

```js
module.exports = async (client, message) => {
  client.commands.isCommand(message);
};
```

### Interaction Create Event:

```js
module.exports = async (client, interaction) => {
  client.commands.isInteraction(interaction);
};
```

You can also customize the `isCommand` function to your use case.
