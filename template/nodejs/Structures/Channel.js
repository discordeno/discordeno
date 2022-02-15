const DestructObject = require("./DestructObject");
const Guild = require("./Guild");

class Channel extends DestructObject {
  constructor(client, channel = {}, options = {}) {
    super(channel);
    if (options.guild) this.guild = options.guild;
    else if (channel.guildId) this.guild = new Guild(client, { id: channel.guildId });

    this.client = client;
  }

  async create(options = {}, reason) {
    return this.client.helpers.createChannel(this.guildId, options, reason);
  }

  async edit(options = {}, reason) {
    return this.client.helpers.editChannel(this.id, options, reason);
  }

  async delete(reason) {
    return this.client.helpers.deleteChannel(this.id, reason);
  }

  async send(options = {}) {
    return this.client.helpers.sendMessage(this.id, options);
  }
}
module.exports = Channel;
