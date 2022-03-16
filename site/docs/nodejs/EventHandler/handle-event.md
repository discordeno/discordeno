---
sidebar_position: 3
---

# Handle Events

When an event is fired, Discordeno sends two important things: the `client` instance and the `payload`.

As mentioned in the `Structure` section, the `payload` object does not contain any functions as it's a plain json object.

In order to take use of our nice built structures, we need to transform the payload into a structure.

:::info

The Structures can be found [here](https://github.com/discordeno/discordeno/tree/main/template/nodejs/Structures)

:::

Sometimes it's important to listen to events, in order to get informed of changes and updating the cache based on it.

### Message Event

This file should be called `messageCreate.js`.

```js
const Message = require("./structures/Message");

module.exports = async (client, payload) => {
  const message = new Message(client, payload);

  if (message.isBot) return;
  if (message.content === "!ping") return await message.reply("pong");
};
```

### Interaction Event

This file should be called `interactionCreate.js`.

```js
const Interaction = require("./structures/Interaction");

module.exports = async (client, payload) => {
  const interaction = new Interaction(client, payload);

  if (interaction.data.name === "ping") return await interaction.reply({ content: "pong" });
};
```

### Ready Event

This file should be called `ready.js`.

:::tip

There is a small difference with the `ready` Event. The Event is fired `shard` wise, in other words it fires every time
a `shard` becomes ready.

:::

In order to fire the "real event" a small code snippet has to be added to the `ready` Event.

```js
const User = require("../Structures/User");

module.exports = async (client, payload) => {
  client.user = new User(client, payload.user);

  if (payload.shardId + 1 === client.gateway.maxShards) {
    // All Shards are ready
    console.log(`Successfully connected to the gateway as ${client.user.tag}`);
  }
};
```
