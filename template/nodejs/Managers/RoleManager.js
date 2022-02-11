const Role = require("../Structures/Role");
class Roles {
  constructor(client, data = {}, options = {}) {
    this.client = client;
    if (options.member) this.member = options.member;
    if (options.guild) this.guild = options.guild;
  }

  async create(options = {}, reason) {
    return new Role(this.client, options).create(options, reason);
  }

  forge(data = {}) {
    return new Roles(this.client, data);
  }

  async add(options = {}, reason) {
    const guildId = (this.guild ? this.guild.id : options.guildId);
    const memberId = (this.member ? this.member.id : options.memberId);
    return this.client.helpers.addRole(guildId, memberId, options.roleId, reason);
  }

  async remove(options = {}, reason) {
    const guildId = (this.guild ? this.guild.id : options.guildId);
    const memberId = (this.member ? this.member.id : options.memberId);
    return this.client.helpers.removeRole(guildId, memberId, options.roleId, reason);
  }
}
module.exports = Roles;
