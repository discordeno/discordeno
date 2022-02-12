---
sidebar_position: 4
---

# Initial Setup

## Config File

Ideally, you should save your configs in a `.env` file. Out of simplicity for this guide, we are saving it on a `config.json` file.

Create a file named `config.json` in your project folder and insert the following content:

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
    ready(client, payload) {
      console.log(`Successfully connected Shard ${payload.shardId} to gateway`);
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

**Go to the page [Slash Command](./slash-command) and deploy your first command inorder to test your bot.**

You are now ready to use your bot and add other functionalities. Besides that you are probably asking yourself, how you
should design your code, so it is maintable and scalable. Go to the next page [design](/docs/nodejs/design) to learn
more about how to design your code and other good code practices.
