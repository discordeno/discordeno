# Dynamic Command Creation!

Discordeno has one of the coolest ways to create commands for advanced level
developers. I call it Dynamic command creation. This allows you to basically
create a bunch of commands that are similar instantly.

This is some advanced level super magical command creation skills. Discordeno
gives you the power to dynamically create commands. What that means is you can
write the code for one command but dynamically create like 50 commands using
that same code.

## Nekos.Life API Commands

A lot of bot's have entertainment commands. Usually they have to create like 100
different files and each file is it's own code. Some might just take the
functionality and move it to a separate file and reuse that function in all
those files.

In Discordeno, there is a better way. Dynamically create the commands based on
the command name.

Let's create all the commands for the entire Nekos.Life API in a very short
time.

- Create a file in the commands folder called `nekos.ts` which will create all
  our fun commands.

```ts
import { botCache, sendMessage } from "../../deps.ts";

const nekosEndpoints = [
  { name: "tickle", path: "/img/tickle", nsfw: false },
  { name: "slap", path: "/img/slap", nsfw: false },
  { name: "poke", path: "/img/poke", nsfw: false },
  { name: "pat", path: "/img/pat", nsfw: false },
  { name: "neko", path: "/img/neko", nsfw: false },
  { name: "meow", path: "/img/meow", nsfw: false },
  { name: "lizard", path: "/img/lizard", nsfw: false },
  { name: "kiss", path: "/img/kiss", nsfw: false },
  { name: "hug", path: "/img/hug", nsfw: false },
  { name: "foxGirl", path: "/img/fox_girl", nsfw: false },
  { name: "feed", path: "/img/feed", nsfw: false },
  { name: "cuddle", path: "/img/cuddle", nsfw: false },
  { name: "why", path: "/why", nsfw: false },
  { name: "catText", path: "/cat", nsfw: false },
  { name: "OwOify", path: "/owoify", nsfw: false },
  { name: "8Ball", path: "/8ball", nsfw: false },
  { name: "fact", path: "/fact", nsfw: false },
  { name: "nekoGif", path: "/img/ngif", nsfw: false },
  { name: "kemonomimi", path: "/img/kemonomimi", nsfw: false },
  { name: "holo", path: "/img/holo", nsfw: false },
  { name: "smug", path: "/img/smug", nsfw: false },
  { name: "baka", path: "/img/baka", nsfw: false },
  { name: "woof", path: "/img/woof", nsfw: false },
  { name: "spoiler", path: "/spoiler", nsfw: false },
  { name: "wallpaper", path: "/img/wallpaper", nsfw: false },
  { name: "goose", path: "/img/goose", nsfw: false },
  { name: "gecg", path: "/img/gecg", nsfw: false },
  { name: "avatar", path: "/img/avatar", nsfw: false },
  { name: "waifu", path: "/img/waifu", nsfw: false },
  // All other paths have been removed for this guide as they are NSFW.
  { name: "nsfw_endpoint", path: "/img/nsfw_example", nsfw: true },
];

nekosEndpoints.forEach((endpoint) => {
  botCache.commands.set(endpoint.name, {
    name: endpoint.name,
    nsfw: endpoint.nsfw,
    botChannelPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    execute: async function (message) {
      const url = `https://nekos.life/api/v2${endpoint.path}`;
      const result = await fetch(url).then((res) => res.json());
      sendMessage(message.channelID, result?.url || result[endpoint.name]);
    },
  });
});
```

> **Note:** We have removed the endpoints that were leading to NSFW content.
> With them, we would just have created 68 different commands.

Take a minute to realize what just happened. This has made 29 different unique
commands dynamically. In 1 file, using the same piece of code, we created so
many commands. You can easily add more commands to this.

**That ladies and gentleman is the power and magic of Discordeno!**

## Understanding The Concept

If your still a little confused, don't worry. Let's break it down.

```ts
const nekosEndpoints = [
  { name: "tickle", path: "/img/tickle", nsfw: false },
  // ...
];
```

This is just an array of all the endpoints on the API giving a name, a path, and
a boolean to say if it is NSFW or not.

```ts
botCache.commands.set(endpoint.name, {
  name: endpoint.name,
  nsfw: endpoint.nsfw,
  botChannelPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  execute: async function (message) {
    const url = `https://nekos.life/api/v2${endpoint.path}`;
    const result = await fetch(url).then((res) => res.json());
    sendMessage(message.channelID, result?.url || result[endpoint.name]);
  },
});
```

This is the part where we are doing the magical stuff. So let's take a look at
this a bit.

We ran a loop `nekosEndpoints.forEach()` on that array and for each item in that
array, we created a command.

For the command name, we used the `endpoint.name` property. For the `nsfw`
property we used the `endpoint.nsfw` property. Since all of these commands, send
a message that is a URL we simply required those permissions in all 29 of these
commands.

Then we simply write the code for the commands and it all just works. If you
were to reload/restart your bot now with this. You will see that you have access
to 68 new commands.

Take a minute and try out some of the commands and how they function.
