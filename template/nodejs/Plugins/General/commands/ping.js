const BaseCommand = require("../../../Structures/BaseCommand.js");
const Embed = require("../../../Structures/Embed.js");
const Message = require("../../../Structures/Message.js");
class pingcommand extends BaseCommand {
  static name = "ping";
  static description = "See if the bot latency is okay";
  static usage = "";
  static category = "General";
  static slash = { name: "ping", category: "info" };
  constructor(data) {
    super(data);
  }
  async execute() {
    const response = await this.reply({ content: `Pinging...` });

    //Assign properties to the response
    const msg = new Message(this.client, response);

    const ping = msg.timestamp - this.message.timestamp;

    const embed = new Embed()
      .setTitle(`The Bots ping is ${ping} ms`)
      .toJSON();

    //Edit Message with the Embed
    return msg.edit({ embeds: [embed] });
  }
}
module.exports = pingcommand;
