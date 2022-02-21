const Member = require("../Structures/Member");
class Members {
  constructor(client, data = {}, options = {}) {
    this.client = client;

    if (options.members) this.cache = options.members;
    if (options.guild) this.guild = options.guild;
  }

  forge(data = {}, options = {}) {
    if (options.guild) {
      if (options.guild.members.cache?.has(data.id)) {
        return options.guild.members.cache.get(data.id, { guild: options.guild });
      }
    }
    return new Member(this.client, data, { guild: options.guild });
  }

  forgeManager(data = {}, options = {}) {
    return new Members(this.client, data, { guild: options.guild, members: options.members });
  }

  async fetch(id) {
    if (typeof id === "string") id = BigInt(id);
    if (this.cache?.has(id)) return this.cache.get(id, { guild: this.guild });
    const member = await this.client.helpers.getMember(this.guild.id, id);
    return this.forge(member, { guild: this.guild });
  }
}
module.exports = Members;
