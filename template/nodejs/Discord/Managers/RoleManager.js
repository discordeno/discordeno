const Role = require("../Structures/Role");
const Collection = require("../Structures/Collection");
const {transformOptions} = require("../Util/transformOptions");
class RoleManager {
  /** 
  * @param {import('discordeno').Bot} client
  */
  constructor(client, data = {}, options = {}) {
    this.client = client;
    if (options.member) this.member = options.member;
    if (options.guild) this.guild = options.guild;

    this.cache = options.roles || new Collection();
  }

  async create(options = {}, reason) {
    options = transformOptions(options);
    return new Role(this.client, options, {guild: this.guild}).create(options, reason);
  }

  async fetch(options = {}) {
    options = transformOptions(options);

    const guildId = options.guildId || this.guild?.id;
    const roleId = options.id;

    if (this.cache?.has(roleId)) return this.cache.get(roleId, { guild: this.guild });


    const rawRoles = await this.client.helpers.getRoles(guildId);
    const roles = new Collection();
    for (const role of rawRoles) {
      roles.set(role.id, this.forge(role, { guild: this.guild }));
    }
    
    return roleId ? roles.get(roleId) : roles;
  }

  forge(data = {}, options = {}) {
    data = transformOptions(data);

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
    options = transformOptions(options);

    const guildId = (this.guild ? this.guild.id : options.guildId);
    const memberId = (this.member ? this.member.id : options.memberId);
    return this.client.helpers.addRole(guildId, memberId, options.roleId, reason);
  }

  async remove(options = {}, reason) {
    options = transformOptions(options);

    const guildId = (this.guild ? this.guild.id : options.guildId);
    const memberId = (this.member ? this.member.id : options.memberId);
    return this.client.helpers.removeRole(guildId, memberId, options.roleId, reason);
  }

  forgeManager(data = {}, options = {}) {
    return new RoleManager(this.client, data, { guild: options.guild, member: options.member, roles: options.roles });
  }

  get highest() {
    return this.cache?.map(r => r).sort((a, b) => b.position - a.position)?.[0];
  }
}
module.exports = RoleManager;
