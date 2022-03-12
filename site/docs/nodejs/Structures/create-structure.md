---
sidebar_position: 2
---

# Create Structure

Structures are often used to transform data and add methods to existing objects. To make it easier to work with them.

Imagine you have a channel object to which you want to send a message.

```js
const data = {
  id: 806947972004839444n,
  name: "spam-and-bots",
};
```

The recommended way would be:

```js
await client.helpers.sendMessage(data.id, { content: "hello" });
```

However, you probably want to use something shorter, such as the following:

```js
const Channel {
    constructor(client, data) {
        this.client = client;
        this.id = data.id;
        this.name = data.name;
    }

    async send(options) {
        return await client.helpers.sendMessage(this.id, options);
    }
}
```

Now you can use the `.send()` method on the channel object without using such a long code:

```js
const channel = new Channel(client, data);
await channel.send({ content: "hello" });
```

Moreover, you can modify the `.send()` method to better suit your use case e.g not send the message if the channel is
blacklisted.

This naturally opens a lot of opportunities and makes coding a lot easier. Because you decide what you want to do with
the data, how the methods are named and how you want to process the request.

## Using Template Structures:

When you are migrating from another library, you'll likely choose to continue using special structures. Therefore why we
have ready-made structures in our template repo:

- [Guild](https://github.com/discordeno/discordeno/tree/main/template/nodejs/Structures/Guild.js)
- [Channel](https://github.com/discordeno/discordeno/tree/main/template/nodejs/Structures/Channel.js)
- [Role](https://github.com/discordeno/discordeno/tree/main/template/nodejs/Structures/Role.js)
- [Member](https://github.com/discordeno/discordeno/tree/main/template/nodejs/Structures/Member.js)
- [User](https://github.com/discordeno/discordeno/tree/main/template/nodejs/Structures/User.js)
- [Message](https://github.com/discordeno/discordeno/tree/main/template/nodejs/Structures/Message.js)
- [Interaction](https://github.com/discordeno/discordeno/tree/main/template/nodejs/Structures/Interaction.js)

We recommend that you clone the whole template repo, since some structures are based on other files.

**Using the Structures:**

```js
const Guild = require("./structures/Guild"); // Path to your structure
const guild = new Guild(client, data); // DiscordenoClient and DiscordenoPayloadData
```

Some popular methods have been added to the structures so that you can use them without having to come up with your own.
Of course, you can add your own methods and customize the structures to fit your needs.

Next we're going to give a better insight into how create [`Embeds`](embeds) and [`Components`](components) with the
template structures.
