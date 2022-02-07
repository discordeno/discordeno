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