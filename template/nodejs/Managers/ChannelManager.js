const {Channel} = require("../Structures/export");
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
           if(options.guild.channels.cache.has(data.id)) return options.guild.channels.cache.get(data.id);
        }else if(this.client.channels.cache.has(data.id)) return this.client.channels.cache.get(data.id);
        return new Channel(this.client, data, {guild: options.guild})
    } 

    forgeManager(data = {}, options = {}){
        return new ChannelManager(this.client, data, {guild: options.guild, channels: options.channels});
    }
}
module.exports = ChannelManager;