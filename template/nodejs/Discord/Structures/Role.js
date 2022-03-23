const DestructObject = require("./DestructObject");
const Permissions = require("./Permissions");
const { convertColor } = require("../Util/Util");

class Role extends DestructObject {
  /** 
 * @param {import('discordeno').Bot} client
 */
  constructor(client, role = {}, options = {}) {
    super(role, { "permissions": true });
    if (options.guild) this.guild = options.guild;
    else if (role.guildId) this.guild = client.guilds.forge({ id: this.guildId });
    this.client = client;
  }

  get permissions() {
    return new Permissions(this._permissions || 0n).freeze();
  }

  async delete(options) {
    const guildId = this.guildId || this.guilld?.id;
    const role = await this.client.helpers.deleteRole(guildId, this.id);
    return role;
  }

  async create(options = {}, reason) {
    const guildId = this.guildId || this.guild?.id;
    if (options.color) options.color = convertColor(options.color);
    const role = await this.client.helpers.createRole(guildId, options, reason);
    return this.client.roles.forge(role, { guild: this.guild });
  }

  async edit(options) {
    const guildId = this.guildId || this.guild?.id;
    if (options.color) options.color = convertColor(options.color);
    const role = await this.client.helpers.editRole(guildId, this.id, options);
    return this.client.roles.forge(role, { guild: this.guild });
  }

}
module.exports = Role;
