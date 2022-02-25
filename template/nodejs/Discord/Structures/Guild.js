const DestructObject = require("./DestructObject");

class Guild extends DestructObject {
  constructor(client, guild = {}, options = {}) {
    super(guild);
    this.client = client;

    //Managers:
    this.roles = client.roles.forgeManager({}, { guild: this, roles: options.roles });
    this.channels = client.channels.forgeManager({}, { guild: this, channels: options.channels });
    this.members = client.members.forgeManager({}, { guild: this, members: options.members });
    this.emojis = client.emojis.forgeManager({}, { guild: this, emojis: options.emojis });

    this.me = client.members.forge({ id: client.user.id }, { guild: this });
  }

  async fetchAuditLogs(options ={}) {
    return this.client.helpers.getAuditLogs(this.id, options);
  }
}
module.exports = Guild;
