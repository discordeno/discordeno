---
sidebar_position: 4
---

# Initial Setup

## Config File

On long-term you should save your configs in a `.env` file. Out of simplicity we are saving it in a `config.json` file.

Create a file named `config.json` in your project folde and insert the following content:

```json
{
  "token": "YOUR_TOKEN_HERE",
  "prefix": "!"
}
```

## Create Main File

Create a file named `index.js` in your project folder and insert the following content:

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

Now you can run your bot by running the following command:

```cli
node index.js
```

You are now ready to use your bot and add other functionalities. Besides that you are probably asking yourself, how you
should design your code, so it is maintable and scalable. Go to the next page [design](/docs/nodejs/design) to learn
more about how to design your code and other good code practices.
