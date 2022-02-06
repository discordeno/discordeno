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

        const exampleEmbed = new Embed()
	.setColor(0x00AE86)
	.setTitle('A Random Title')
	.setURL('https://github.com/discordeno/')
	.setAuthor({ name: 'Author name', iconUrl: 'https://raw.githubusercontent.com/discordeno/guide/main/src/.vuepress/public/logo.png', url: 'https://github.com/discordeno' })
	.setDescription('A Random Description')
	.setThumbnail('https://raw.githubusercontent.com/discordeno/guide/main/src/.vuepress/public/logo.png')
	.addFields(
		{ name: 'Field 1 Name', value: 'Normal Field Value' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Field 2 Name', value: 'Inline Field Value', inline: true },
		{ name: 'Field 3 Name', value: 'Inline Field Value', inline: true },
	)
	.addField({name: 'Field 4', value: 'Field Value'})
	.setImage('https://raw.githubusercontent.com/discordeno/guide/main/src/.vuepress/public/logo.png')
	.setTimestamp()
	.setFooter({ text: 'A Footer Text', iconUrl: 'https://raw.githubusercontent.com/discordeno/guide/main/src/.vuepress/public/logo.png' })
    .toJSON();
    this.message.channel.send({embeds: [exampleEmbed]});
    }
};
module.exports = pingcommand;