---
sidebar_position: 3
---
# Create Command
One of the most important features we wanted in our template, was that you can use the same code for handling `slash commands` and `message based commands`.

This can be done by saving the static class in the command cache and creating a constructor and passing the wished data. 
Moreover the `BaseCommand` is extended with the `Response Command` class. So you can take advantage of functions such as `.reply()`

**Copy the [`BaseCommand`](https://github.com/discordeno/discordeno/tree/main/template/nodejs/Structures/BaseCommand.js) & [`CommandResponses`](https://github.com/discordeno/discordeno/tree/main/template/nodejs/Structures/CommandResponses.js) code from the template**

### Creating a Ping Command:
```js
const BaseCommand = require('../../../Structures/BaseCommand.js')
const Embed = require('../../../Structures/Embed.js')
const Message = require('../../../Structures/Message.js')
class pingcommand extends BaseCommand {
	static name = 'ping';
	static description = 'See if the bot latency is okay';
	static usage = '';
	static category = 'General';
	static slash = {name: "ping", category: "info"};
	constructor(data) {
		super(data)
	}
    async execute() {
        this.reply({content: "Pinging..."}).then(m => {
            // The math thingy to calculate the user's ping
            var ping = (m.timestamp - this.message.timestamp);
            // Basic embed
            var embed = new Embed()
                .setTitle(`The Bots ping is ${ping} ms`)
            // Then It Edits the message with the ping variable embed that you created
            const msg = new Message(this.client, m)
            msg.edit({embeds: [embed] })
        });

    }
};
module.exports = pingcommand;
```
* The `BaseCommand` is extended with the `CommandResponses` class.
* The Ping Command class is been extended with the `BaseCommand` class.
* Some static properties are assigned to the Ping Command class, inorder to access it in the cache, such as `name`, `description`, `usage`, `category` and `slash`...
* The `execute()` function will be called, when the command has been run by the user.
* The constructor allows to access data, such as `this.message`, `this.args`, `this.client`...

You can customize the CommandManager file, inorder to pass arguments in the `execute()` function.