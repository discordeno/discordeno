const {Message} = require('../Structures/export');
class Messages{
    constructor(client, data ={}, options = {}){
        this.client = client;
        if(options.guild) this.guild  = options.guild;
        if(options.channel) this.guild  = options.channel;
    }

    forge(data = {}, options = {}){
        return new Message(this.client, data, {guild: options.guild, channel: options.channel})
    }
}
module.exports = Messages;