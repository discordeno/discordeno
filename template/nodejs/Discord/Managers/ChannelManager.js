const Channel = require("../Structures/Channel");
const Collection = require("../Structures/Collection");
const {transformOptions} = require("../Util/transformOptions");

class ChannelManager {
  /** 
  * @param {import('discordeno').Bot} client
  */
  constructor(client, data = {}, options = {}) {
    this.client = client;
    this.cache = options.channels || new Collection();

    if (options.guild) this.guild = options.guild;
  }

  async create(options = {}, reason) {
    if(!options.guildId) options.guildId = this.guild?.id;
    return new Channel(this.client, options).create(options, reason);
  }

  async edit(options = {}, reason) {
    if(!options.guildId) options.guildId = this.guild?.id;
    return this.forge(options, {guild: this.guild}).edit(options, reason);
  }

  async delete(options = {}) {
    options = transformOptions(options);
    return new Channel(this.client, {id: options.id}).delete(options.reason);
  }

  async fetch(options = {}){
    options = transformOptions(options);
  
    const guildId = options.guildId || this.guild?.id;
    const channelId = options.id;
  
    
    if(!channelId){
      const rawChannels = await this.client.helpers.getChannels(guildId);
      const channels = new Collection();
      for(const channel of rawChannels){
        channels.set(channel.id, this.forge(channel, {guild: this.guild}));
      }
      return channels;
    }

    if (this.cache?.has(channelId)) return this.cache.get(channelId, { guild: this.guild });
    const channel = await this.client.helpers.getChannel(channelId);

    return this.forge(channel, {guild: this})
  }

  forge(data = {}, options = {}) {
    data = transformOptions(data);

    if (options.guild) {
      if (options.guild.channels.cache?.has(data.id)) {
        return options.guild.channels.cache.get(data.id, { guild: options.guild });
      }
    } else if (this.client.channels.cache?.has(data.id)) {
      return this.client.channels.cache.get(data.id, { guild: options.guild });
    }
    return new Channel(this.client, data, { guild: options.guild });
  }

  forgeManager(data = {}, options = {}) {
    return new ChannelManager(this.client, data, { guild: options.guild, channels: options.channels });
  }
}
module.exports = ChannelManager;
