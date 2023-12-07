---
sidebar_position: 2
---

# Create Structure

Structures are often used to transform data and add methods to existing objects. To make it easier to work with them.

Imagine you have a channel object to which you want to send a message.

```js
const data = {
  id: 806947972004839444n,
  name: 'spam-and-bots',
}
```

The recommended way would be:

```js
await client.helpers.sendMessage(data.id, { content: 'hello' })
```

However, you probably want to use something shorter, such as the following:

```js
class Channel {
  constructor(client, data) {
    this.client = client
    this.id = data.id
    this.name = data.name
  }

  async send(options) {
    return await this.client.helpers.sendMessage(this.id, options)
  }
}
```

Now you can use the `.send()` method on the channel object without using such a long code:

```js
const channel = new Channel(client, data)
await channel.send({ content: 'hello' })
```

Moreover, you can modify the `.send()` method to better suit your use case e.g not send the message if the channel is
blacklisted.

This naturally opens a lot of opportunities and makes coding a lot easier. Because you decide what you want to do with
the data, how the methods are named and how you want to process the request.

## Using Template Structures:

When you are migrating from another library and you want to utilize the djs-like wrapper, you'll likely choose to
continue using special structures. Therefore we have ready-made structures for the wrapper `Discordeno.js`.

- [Guild](https://github.com/meister03/discordeno.js/tree/master/Structures/Guild.js)
- [Channel](https://github.com/meister03/discordeno.js/tree/master/Structures/Channel.js)
- [Role](https://github.com/meister03/discordeno.js/tree/master/Structures/Role.js)
- [Member](https://github.com/meister03/discordeno.js/tree/master/Structures/Member.js)
- [User](https://github.com/meister03/discordeno.js/tree/master/Structures/User.js)
- [Message](https://github.com/meister03/discordeno.js/tree/master/Structures/Message.js)
- [Interaction](https://github.com/meister03/discordeno.js/tree/master/Structures/Interaction.js)
- [Emoji](https://github.com/meister03/discordeno.js/tree/master/Structures/Emoji.js)
- [Webhook](https://github.com/meister03/discordeno.js/tree/master/Structures/Webhook.js)
- [Embed](https://github.com/meister03/discordeno.js/tree/master/Structures/Embed.js)
- [Component](https://github.com/meister03/discordeno.js/tree/master/Structures/Component.js)
- [Collection](https://github.com/meister03/discordeno.js/tree/master/Structures/Collection.js)

We recommend that you check the wrappers [Readme](https://github.com/meister03/discordeno.js#discordclient) in order to
construct the client for following the Guide

**Using the Structures:**

```js
const Discord = require('discordeno.js')
const client = new Discord.Client(clientOptions, cacheOptions) //See the Readme above
Discord.startBot(client)
const guild = client.guilds.forge(guildData)
const channel = guild.channels.forge(channelData)
const role = guild.roles.forge(roleData)
const member = guild.members.forge(memberData)
const user = guild.users.forge(userData)
const message = guild.messages.forge(messageData)
const interaction = guild.interactions.forge(interactionData)
const emoji = guild.emojis.forge(emojiData)

const webhook = new Discord.Webhook(client, webhookData)
const embed = new Discord.Embed(embedData) // embedData is optional
const component = new Discord.Component(componentData) // componentData is optional
const collection = new Discord.Collection()
```

Some popular methods have been added to the structures so that you can use them without having to come up with your own.
In order to use the Structures from the Wrapper, you need to invoke the `.forge` method with the raw discord data,
whereas it will construct the structure for you.

Next we're going to give a better insight into how create [`Embeds`](embeds) and [`Components`](components) with the
wrappers structures.
