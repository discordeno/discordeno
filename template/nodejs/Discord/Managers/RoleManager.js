const Role = require("../Structures/Role");
class RoleManager {
  constructor(client, data = {}, options = {}) {
    this.client = client;
    if (options.roles) this.cache = options.roles;
    if (options.member) this.member = options.member;
    if (options.guild) this.guild = options.guild;
  }

  async create(options = {}, reason) {
    return new Role(this.client, options).create(options, reason);
  }

  forge(data = {}, options = {}) {
    if (options.guild) {
      if (options.guild.roles.cache?.has(data.id)) {
        return options.guild.roles.cache.get(data.id, { guild: options.guild });
      }
    } else if (this.client.roles.cache?.has(data.id)) {
      return this.client.roles.cache.get(data.id, { guild: options.guild });
    }
    return new Role(this.client, data, { guild: options.guild });
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

  forgeManager(data = {}, options = {}) {
    return new RoleManager(this.client, data, { guild: options.guild, member: options.member, roles: options.roles });
  }
}
module.exports = RoleManager;
