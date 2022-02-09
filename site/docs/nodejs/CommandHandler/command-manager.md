---
sidebar_position: 2
---

# Command Manager

You probably have currently something like this in your code:

```js
const Discord = require("discordeno");
const config = require("./config.json");

const client = Discord.createBot({
  events: {
    ready() {
      console.log("Successfully connected to gateway");
    },
    messageCreate(client, message) {
      if (message.content === "!ping") {
        client.helpers.sendMessage(message.channelId, { content: "pong" });
      }
      console.log(`Recieved message: ${message.content || message.embeds}`);
    },
  },
  intents: ["Guilds", "GuildMessages"],
  token: configs.token,
});
Discord.startBot(client);
```

If you add many commands and also have a large code, the overview can of course get lost very quickly.

To avoid this, we recommend storing the commands in a separate folder with seperate categories.

[We introduced earlier our plugin structure, which has a lot of advantages.](../design.md)

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

**Clone this file from the
[template repo](https://github.com/discordeno/discordeno/tree/main/template/nodejs/Managers/CommandManager.js)**

```js
const CommandManager = require("./template/Managers/CommandManager.js");
const manager = new CommandManager({});
manager.load({ plugin: true }); ///loads the Command
client.commands = manager;

client.commands.cache.get("ping"); //returns the command
```

The Manager will automatically iterate through all files in the folder and load them in the cache property, which is
mapped on the command name.

**The [Create Command](./create-command.md) will show you how to create a command.**

## Handle Command

The Manager also includes a handler for executing the command, when a message has been recieved.

### Important Note:

**Currently it does not include any checks for permissions or for cooldowns/ratelimits, this will be added soon.**

Message Create Event

```js
module.exports = async (client, message) => {
  client.commands.isCommand(message);
};
```

You can also customize the `isCommand` function to your usecase.
