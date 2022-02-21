const DestructObject = require("./DestructObject");
const Guild = require("./Guild");

class Role extends DestructObject {
  constructor(client, role = {}, options = {}) {
    super(role);
    if (options.guild) this.guild = options.guild;
    else if (role.guildId) this.guild = new Guild(client, { id: role.guildId });
    this.client = client;
  }
}
module.exports = Role;
