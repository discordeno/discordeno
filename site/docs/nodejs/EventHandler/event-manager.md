---
sidebar_position: 2
---

# Create Event Manager

In order to process certain events, you must provide the Discordeno client with functions for these events.

```js
const Discord = require("discordeno");
const config = require("./config.json");

const client = Discord.createBot({
  events: {
    ready(client, payload) {
      console.log(`Successfully connected Shard ${payload.shardId} to the gateway`);
    },

    async messageCreate(client, message) {
      if (message.content === "!ping") {
        await client.helpers.sendMessage(message.channelId, { content: "pong" });
      }

      console.log(`Received message: ${message.content || message.embeds}`);
    },
  },
  intents: ["Guilds", "GuildMessages"],
  token: config.token,
});

Discord.startBot(client);
```

As you listen to more and more events, the functions code grows along with them, so you can quickly lose track.

To avoid this, we recommend storing the event functions divided into files in a separate folder.

## Create Event Folder

Create a folder called `events` in your project folder.

:::info note

The event files have to be named using camelCase so that they can be understood by the client. e.g `message` ->
`messageCreate.js`. You can check the typings see how the events are called.

:::

Ready Event:

```js
module.exports = (client, payload) => {
  if (payload.shardId + 1 === client.gateway.maxShards) {
    // All Shards are ready
    console.log(`Successfully connected to the gateway as ${payload.user.username}#${payload.user.discriminator}`);
  }
};
```

## Load your Events

```js
const fs = require("fs");
const path = require("path");

const resolveFolder = (folderName) => path.resolve(__dirname, ".", folderName);

class EventManager {
  constructor(client) {
    this.cache = new Map();
    this._events = {};
  }

  load(options = {}) {
    const eventsFolder = resolveFolder("../events");
    fs.readdirSync(eventsFolder).map(async (file) => {
      if (!file.endsWith(".js")) return;

      const fileName = path.join(eventsFolder, file);
      const event = require(fileName);
      const eventName = file.split(".")[0];

      this._events[`${eventName}`] = event;
    });

    return this._events;
  }
}

module.exports = EventManager;
```

The code above, which can also be found in the
[template repo](https://github.com/discordeno/discordeno/tree/main/template/nodejs/Managers/EventManager.js) will loop
through all the files in the `events` folder and load the functions into the `_events` object.

In order to let the client know which events should be processed, you need to pass the functions in the
`createBot<options>.events` object.

```js
const Discord = require("discordeno");
const config = require("./config.json");

const EventManager = require("./Managers/EventManager.js");
const events = new EventManager({});

const client = Discord.createBot({
  events: events.load({}),
  intents: ["Guilds", "GuildMessages"],
  token: config.token,
});

Discord.startBot(client);
```

Moreover, you can customize the `EventManager` and add more functionality to it and make it exactly fit your your needs
or even emit events, by extending it.

Of course you wonder what you can do with all of this now. We will explain this further on the next page.
