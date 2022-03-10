const DestructObject = require("./DestructObject");

class Emoji extends DestructObject {
  constructor(client, emoji = {}, options = {}) {
    super(emoji);
    this.client = client;

    if (options.guild) this.guild = options.guild;
    else if (emoji.guildId) this.guild = client.guilds.forge({ id: this.guildId });
  }
}
module.exports = Emoji;
