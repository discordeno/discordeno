const BaseCommand = require("../../../Structures/BaseCommand.js");
const Embed = require("../../../Structures/Embed.js");
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
    const time1 = Date.now();
    
    const msg = await this.reply({ content: `Pinging...` });
    
    const ping = Date.now() - time1;
    
    const embed = new Embed()
      .setTitle(`The Bots ping is ${ping} ms`)
      .toJSON();

    if(this.interaction) { // if it's an interaction, edit reply
      return this.interaction.editReply({ content: "Pinged!", embeds: [embed] });
    } else {
      return msg.edit({ embeds: [embed] })
    }
  }
}
module.exports = pingcommand;
