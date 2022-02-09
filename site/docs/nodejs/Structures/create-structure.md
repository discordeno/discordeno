---
sidebar_position: 2
---

# Create Structure

Structures are often used to transform data and adding new functions to the existing object. Inorder to execute the
functions on the object, without requiring a external function...

You got a channel object and now you want to use it for sending a message to the channel.

```js
{
    id: 828928992002n,
    name: 'test',
}
```

The first recommended way would be:

```js
client.helpers.sendMessage(channelId, { content: "hello" });
```

But you probably want to have a shorter code, so you can use the following structure:

```js
const Channel{
    constructor(client, data){
        this.client = client;
        this.id = data.id;
        this.name = data.name;
    }
    async send(options){
        return client.helpers.sendMessage(this.id, options)
    }
}
```

Now you can use the `.send()` on the channel object without using a so long code...

```js
const channel = new Channel(client, data);
channel.send({ content: "hello" });
```

Moreoever, you can edit the `.send()` function to your usecase and not send the message, when the channel is blacklisted
or is currently ratelimited...

This naturally opens a lot of opportunitues and makes your coding a lot easier. Because you decide what you want to do
with the data, how the functions are named and how you process the request.

When you are migrating from another library, you'll likely choose to continue using the structures. That's why we
already have ready-made structures in our template repo, which are mentioned below

## Using Template Structures:

- [Guild](https://github.com/discordeno/discordeno/tree/main/template/nodejs/structures/Guild.js)
- [Channel](https://github.com/discordeno/discordeno/tree/main/template/nodejs/structures/Channel.js)
- [Role](https://github.com/discordeno/discordeno/tree/main/template/nodejs/structures/Role.js)
- [Member](https://github.com/discordeno/discordeno/tree/main/template/nodejs/structures/Member.js)
- [User](https://github.com/discordeno/discordeno/tree/main/template/nodejs/structures/User.js)

- [Message](https://github.com/discordeno/discordeno/tree/main/template/nodejs/structures/Message.js)
- [Interaction](https://github.com/discordeno/discordeno/tree/main/template/nodejs/structures/Interaction.js)

We recommend to clone the whole template repo, since some structures are based on some other files.

**Using the Structures:**

```js
const Guild = require("./structures/Guild"); //Path to your structure
const guild = new Guild(client, data); //DenoClient and DenoPayloadData
```

Some popular functions have been added to the structure, so you can use them. You as a user can of course add your own
functions and customize the structures to fit your needs

We're going to give a better insight into how create 'Embeds' or 'Components' with the template structures.
