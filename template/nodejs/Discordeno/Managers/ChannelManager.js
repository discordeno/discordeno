const Channel = require("../Structures/Channel");
class ChannelManager{
    constructor(client, data ={}, options = {}){
        this.client = client;
        if(options.channels) this.cache = options.channels ;//|| {cache: new Map()};
        else this.cache = new Map();
        if(options.guild) this.guild  = options.guild;
    }

    async create(options = {}, reason){
        return new Channel(this.client, options).create(options, reason);
    }

    forge(data = {}, options = {}){
        if(options.guild){
           if(options.guild.channels.cache?.has(data.id)) return options.guild.channels.cache.get(data.id, {guild: options.guild});  
        }else if(this.client.channels.cache?.has(data.id)) return this.client.channels.cache.get(data.id, {guild: options.guild});
        return new Channel(this.client, data, {guild: options.guild})
    } 

    forgeManager(data = {}, options = {}){
        return new ChannelManager(this.client, data, {guild: options.guild, channels: options.channels});
    }
}
module.exports = ChannelManager;