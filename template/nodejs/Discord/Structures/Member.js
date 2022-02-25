const DestructObject = require("./DestructObject");
const Permissions = require("./Permissions");
const Collection = require("./Collection")

class Member extends DestructObject {
  /** 
  * @param {import('discordeno').Bot} client
  */
  constructor(client, member = {}, options = {}) {
    super(member, { "permissions": true });
    this.client = client;

    if (options.guild) this.guild = options.guild;
    else this.guild = client.guilds.forge({ id: this.guildId });

    this.roles = client.roles.forgeManager({}, {
      guild: options.guild,
      member: this,
      roles: getRoles(client, member.roles, this.guild),
    });
  }

  get permissions() {
    if (this.id === this.guild.ownerId) return new Permissions(Permissions.ALL).freeze();
    if (!this.roles.cache) return new Permissions(0n).freeze();
    const permissions = [...this.roles.cache.values()].map((role) => role._permissions || 0n);
    return new Permissions(permissions).freeze();
  }

  async send(options = {}) {
    return this.client.users.forge({ id: this.id }).send(options);
  }

  async kick(options = {}){
    const id = options.id || this.id;
    const guildId = options.guildId || this.guildId || this.guild?.id;
    const reason = options.reason;

    return this.client.helpers.kickMember(guildId, id, reason);
  }

  async ban(options = {}){
    const id = options.id || this.id;
    const guildId = options.guildId || this.guildId || this.guild?.id;

    return this.client.helpers.banMember(guildId, id, options);
  }

  async unban(options = {}){
    const id = options.id || this.id;
    const guildId = options.guildId || this.guildId || this.guild?.id;
    return this.client.helpers.unbanMember(guildId, id);
  }

  async edit(options = {}){
    const id = options.id || this.id;
    const guildId = options.guildId || this.guildId || this.guild?.id;

    return this.client.helpers.editMember(guildId, id, options);
  }


}
module.exports = Member;

function getRoles(client, roles, guild) {
  if (!roles) return new Collection();
  const memberRoles = new Collection();
  roles.forEach((m) => {
    const role = client.roles.forge({ id: m }, { guild: guild });
    if (role) memberRoles.set(role.id, role);
  });
  return memberRoles;
}
