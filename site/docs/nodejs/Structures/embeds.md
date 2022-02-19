---
sidebar_position: 3
---

# Create Embeds

Embeds are widely used by bots in order to display messages in a fancy way.

Unfortunately, the Discord API does not accept funky classes such as `new MessageEmbed().setTitle("hello")`, instead it
takes a json object, e.g. `{ title: "hello" }`. Therefore, we need to create an embed Structure that converts the
user-supplied data into the format which Discord uses.

:::note Runtime Overhead

Constructor classes are nice to use and make your code look better, but they incur a slight runtime overhead compared to
just using raw data because they still execute methods, which takes more time to process.

:::

```js
class Embed() {
    constructor() {}

    setTitle(title) {
        this.title = title;
    }
}
```

Now we have created a class which we can use to create embeds. But we can't just send this to Discord.

So we need an additional method which will convert the data from the class to the correct format.

```js
class Embed(){  
    constructor() {}

    setTitle(title) {
        this.title = title;
    }

    toJSON() {
        return {
          title: this.title
        }
    }
}
```

Wow, now you can create a embed and send it to Discord.

```js
const Channel = require("./structures/Channel"); // Path to structure

const channel = new Channel(client, data);
await channel.send({ embeds: [embed] });
```

You probably want more methods which you can use to create embeds.
[We also have a Template for this](https://github.com/discordeno/discordeno/tree/main/template/nodejs/structures/Embed.js)

### Using the Embed Structure:

```js
const Embed = require("./structures/Embed"); // Path to structure
const Channel = require("./structures/Channel"); // Path to structure

const channel = new Channel(client, data);
const showCaseEmbed = new Embed()
  .setColor(0x00AE86)
  .setTitle("A Random Title")
  .setURL("https://github.com/discordeno")
  .setAuthor({
    name: "Author name",
    iconUrl: "https://raw.githubusercontent.com/discordeno/discordeno/main/site/static/img/logo.png",
    url: "https://github.com/discordeno",
  })
  .setDescription("A Random Description")
  .setThumbnail("https://raw.githubusercontent.com/discordeno/discordeno/main/site/static/img/logo.png")
  .addFields(
    { name: "Field 1 Name", value: "Normal Field Value" },
    { name: "\u200B", value: "\u200B" },
    { name: "Field 2 Name", value: "Inline Field Value", inline: true },
    { name: "Field 3 Name", value: "Inline Field Value", inline: true },
  )
  .addField({ name: "Field 4", value: "Field Value" })
  .setImage("https://raw.githubusercontent.com/discordeno/discordeno/main/site/static/img/logo.png")
  .setTimestamp()
  .setFooter({
    text: "A Footer Text",
    iconUrl: "https://raw.githubusercontent.com/discordeno/discordeno/main/site/static/img/logo.png",
  })
  .toJSON();

await channel.send({ embeds: [showCaseEmbed] });
```

### Embed Limits:

- Title: 256 characters
- Description: 4096 characters
- Field Name: 256 characters
- Field Value: 1024 characters
- Footer Text: 2048 characters
- Author Name: 256 characters
- 10 Embeds per message
- In total over all 10 Embeds not more than 6000 characters
