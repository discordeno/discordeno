---
sidebar_position: 4
---

# Initial Setup

## Config File

Ideally, you should save your configs in an `.env` file. Out of simplicity for this guide, we are saving it in a
`config.json` file.

Create a file named `config.json` in your project folder and insert the following content:

```json
{
  "token": "YOUR_TOKEN_HERE",
  "prefix": "!"
}
```

## Edit the main file

Open the `index.js` file which you have created earlier and then insert the following content:

```js
const Discord = require("discordeno");
const config = require("./config.json");

const client = Discord.createBot({
  events: {
    ready(client, payload) {
      console.log(`Successfully connected Shard ${payload.shardId} to the gateway`);
    },
  },
  intents: ["Guilds", "GuildMessages"],
  token: config.token,
});

Discord.startBot(client);
```

Now you can start your bot by running the following command in your terminal:

```cli
$ node index.js
```
