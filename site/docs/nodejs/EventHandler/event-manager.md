---
sidebar_position: 2
---

# Create Event Manager

In order to listen to certain events, you have to provide functions for the event on the deno client.

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

If you now listen to many events and the functions also have a large code, the overview can of course get lost very
quickly.

To avoid this, we recommend storing the event functions in a separate folder.

## Create Event Folder

Create a folder named `events` in your project folder.

Add your first event in the file named `ready.js` in the `events` folder. The Event File will be named camelCase, so
that it can be understood by the client. e.g `message` -> `messageCreate.js`. You can check the Typings inorder to know
the namings of the events.

Ready Event:

```js
module.exports = (client, payload) => {
  console.log(`Successfully connected to gateway as ${payload.user.username}`);
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

This code above, which also can be found in the
[template repo](https://github.com/discordeno/discordeno/tree/main/template/nodejs/Managers/EventManager.js) will loop
through all the files in the `events` folder and load the functions into the `_events` object.

So that the client also knows which events it should execute, you need to pass the functions in the
`createBot<options>.events` object

```js
const Discord = require("discordeno");
const config = require("./config.json");

const EventManager = require("./Managers/EventManager.js");
const events = new EventManager({});

const client = Discord.createBot({
  events: events.load({}),
  intents: ["Guilds", "GuildMessages"],
  token: configs.token,
});
Discord.startBot(client);
```

Moreover, you can customize the EventManager to add more functionalities and fit it to your needs or even emit events,
by extending it...

Of course you wonder what you can do with all this data now. We will explain this further on the next page
`Handle-Event`.
