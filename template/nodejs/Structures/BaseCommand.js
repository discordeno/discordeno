const UtilCommand = require("./CommandResponse.js");
const Message = require("./Message.js");
const Interaction = require("./Interaction.js");
class BaseCommand extends UtilCommand {
  constructor(data) {
    super(data);
    this.message = data.message && new Message(data.client, data.message);
    this.interaction = data.interaction && new Interaction(data.client, data.interaction);
    this.user = this.message ? this.message.author : this.interaction.user;
    this.guild = this.message ? this.message.guild : this.interaction.guild;
    this.member = this.message ? this.message.member : this.interaction.member;
    this.channel = this.message ? this.message.channel : this.interaction.channel;
    this.client = data.client;
    this.settings = data.settings ?? {};
  }
}
module.exports = BaseCommand;
