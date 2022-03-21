const DestructObject = require("./DestructObject");
const {transformOptions} = require("../Util/transformOptions");
const Collection = require("./Collection");
const {SnowFlake} = require("../Util/Util");

class Guild extends DestructObject {
  /** 
  * @param {import('discordeno').Bot} client
  */
  constructor(client, guild = {}, options = {}) {
    super(guild);
    this.client = client;

    //Managers:
    this.roles = client.roles.forgeManager({}, { guild: this, roles: options.roles });
    this.channels = client.channels.forgeManager({}, { guild: this, channels: options.channels });
    this.members = client.members.forgeManager({}, { guild: this, members: options.members });
    this.emojis = client.emojis.forgeManager({}, { guild: this, emojis: options.emojis });

    this.me = client.members.forge({ id: (client.user ? client.user.id : client.userId) }, { guild: this });
  }

  async fetchAuditLogs(options ={}) {
    options = transformOptions(options);
    const audit = await this.client.helpers.getAuditLogs(this.id, options);
    const entries = new Collection();
    audit.auditLogEntries.forEach(x => {
      x.executor = this.client.users.forge(x.userId);
      x.target = this.client.users.forge(x.targetId);
      entries.set(x.id, x)
    });
    return {...audit, entries};
  }

  iconURL({size, format} = {}) {
    return this.client.helpers.guildIconURL(this.id, this.icon, {size, format});
  }

  get createdTimestamp() {
    return SnowFlake(this.id).timestamp;
  }
}
module.exports = Guild;
