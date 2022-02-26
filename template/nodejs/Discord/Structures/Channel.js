const DestructObject = require("./DestructObject");
const PermissionOverwrites = require("./permissionOverwrites");
const {transformOptions} = require("../Util/transformOptions");

class Channel extends DestructObject {
  constructor(client, channel = {}, options = {}) {
    super(channel, {"permissionOverwrites": true});
    this.client = client;

    if (options.guild) this.guild = options.guild;
    else if (channel.guildId) this.guild = client.guilds.forge({ id: this.guildId });
  
    this.messages = client.messages.forgeManager({}, { messages: options.messages, channel: this, guild: this.guild });
  }

  async create(options = {}, reason) {
    options = transformOptions(options);
    return this.client.helpers.createChannel(this.guildId, options, reason);
  }

  async edit(options = {}, reason) {
    options = transformOptions(options);
    return this.client.helpers.editChannel(this.id, options, reason);
  }

  async delete(reason) {
    return this.client.helpers.deleteChannel(this.id, reason);
  }

  async send(options = {}) {    
    options = transformOptions(options, {content: true});
    return this.client.helpers.sendMessage(this.id, options);
  }
  
  get permissionOverwrites() {
    return new PermissionOverwrites(this.client, this._permissionOverwrites, {channel: this});
  }

  permissionsFor({id}){
    return new PermissionOverwrites(this.client, this._permissionOverwrites, {channel: this}).get(id);
  }
}
module.exports = Channel;
