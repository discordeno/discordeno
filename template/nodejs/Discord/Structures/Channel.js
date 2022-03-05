const DestructObject = require("./DestructObject");
const PermissionOverwrites = require("./permissionOverwrites");
const {transformOptions, transformPermissionOverwrites} = require("../Util/transformOptions");

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
    if(options.permissionOverwrites){
      options.permissionOverwrites = transformPermissionOverwrites(options.permissionOverwrites);
    }
    const guildId = options.guildId || this.guildId;
    const channel = await this.client.helpers.createChannel(guildId, options, reason);
    return this.client.channels.forge(channel, {guild: this.guild});
  }

  async edit(options = {}, reason) {
    options = transformOptions(options);
    if(options.permissionOverwrites){
      options.permissionOverwrites = transformPermissionOverwrites(options.permissionOverwrites);
    }
    const channel = await this.client.helpers.editChannel(this.id, options, reason);
    return this.client.channels.forge(channel, {guild: this.guild});
  }

  async delete(reason) {
    return this.client.helpers.deleteChannel(this.id, reason);
  }

  async fetch(){
    return this.client.channels.fetch(this.id);
  }

  async send(options = {}) {    
    options = transformOptions(options, {content: true});
    const msg = await this.client.helpers.sendMessage(this.id, options);
    return this.client.messages.forge(msg, { channel: this , guild: this.guild });
  }
  
  get permissionOverwrites() {
    return new PermissionOverwrites(this.client, this._permissionOverwrites, {channel: this});
  }

  permissionsFor({id}){
    return new PermissionOverwrites(this.client, this._permissionOverwrites, {channel: this}).get(id);
  }
}
module.exports = Channel;
