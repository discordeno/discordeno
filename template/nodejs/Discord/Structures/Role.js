const DestructObject = require("./DestructObject");
const Permissions = require("./Permissions");

class Role extends DestructObject {
  constructor(client, role = {}, options = {}) {
    super(role, { "permissions": true });
    if (options.guild) this.guild = options.guild;
    else if (role.guildId) this.guild = client.guilds.forge({ id: this.guildId });
    this.client = client;
  }

  get permissions() {
    return new Permissions(this._permissions || 0n).freeze();
  }
}
module.exports = Role;
