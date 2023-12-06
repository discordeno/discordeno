---
sidebar_position: 3
---

# Create Command

One of the most important features we wanted in our template, was that you can use the same code for handling
`slash commands` and `message based commands`.

This can be done by saving the static class in the command cache, creating a constructor and passing the desired data.
Moreover the `BaseCommand` is extended with the `Response Command` class, so you can take advantage of functions such as
`.reply()`

**Copy the [`BaseCommand`](https://github.com/discordeno/discordeno/tree/main/template/nodejs/Structures/BaseCommand.js)
&
[`CommandResponses`](https://github.com/discordeno/discordeno/tree/main/template/nodejs/Structures/CommandResponses.js)
code from the template**

### Creating a Ping Command:

```js
const BaseCommand = require("../../../Structures/BaseCommand.js");
const Embed = require("../../../Structures/Embed.js");

class pingCommand extends BaseCommand {
  static name = "ping";
  static description = "See if the bot latency is okay";
  static usage = "";
  static category = "General";
  static slash = { name: "ping", category: "info" };

  constructor(data) {
    super(data);
  }

  async execute() {
        const msg = await this.reply({content: `Pinging...`});
        // Assign properties to the response
        const ping = msg.timestamp - this.message.timestamp;

        const embed = new Embed()
          .setTitle(`The Bots ping is ${ping} ms`)
          .toJSON();

        // Edit Message with the Embed
        return await msg.edit({embeds: [embed] });
    });
  }
}

module.exports = pingCommand;
```

- The `BaseCommand` is extended with the `CommandResponses` class.
- The ping command class is extended with the `BaseCommand` class.
- Some static properties are assigned to the ping command class, in order to access it in the cache, such as `name`,
  `description`, `usage`, `category` and `slash`...
- The `execute()` function will be called, when the command has been run by the user.
- The constructor allows to access data, such as `this.message`, `this.args`, `this.client`...

You can customize the `CommandManager` file, in order to pass arguments in the `execute()` function.
