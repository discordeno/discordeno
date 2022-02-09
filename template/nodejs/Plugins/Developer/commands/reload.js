const BaseCommand = require("../../../Structures/BaseCommand.js");
const Embed = require("../../../Structures/Embed.js");
class reloadcommand extends BaseCommand {
  static name = "reload";
  static description = "Reloads a Command";
  static category = "Developer";
  static slash = { name: "reload", category: "dev" };
  constructor(data) {
    super(data);
  }
  async execute() {
    if (!this.client.config.owners.includes(String(this.user.id))) return;
    if (!this.args[0]) return this.reply({ content: "**You must provide a command to reload!**" });
    const op = this.client.commands.reloadCommand(this.args[0]);
    if (!op) return this.reply({ content: "**That command doesn't exist!**" });
    return this.reply({ content: "**Reloaded Command: `" + this.args[0] + "`**" });
  }
}
module.exports = reloadcommand;
