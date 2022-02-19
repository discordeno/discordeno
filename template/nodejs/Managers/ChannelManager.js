const Channel = require("../Structures/Channel");
class Channels {
  constructor(client, data = {}, options = {}) {
    this.client = client;

    if (options.guild) this.guild = options.guild;
  }

  async create(options = {}, reason) {
    return new Channel(this.client, options).create(options, reason);
  }

  forge(data = {}) {
    return new Channel(this.client, data);
  }
}
module.exports = Channels;
