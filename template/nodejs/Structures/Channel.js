const DestructObject = require("./DestructObject");

class Channel extends DestructObject{
    ///constructor(client: import("discordeno").Bot, channel = {}) {
    constructor(client, channel = {}) {
        super(channel);
        this.client = client;
    }

    async edit(options = {}, reason){
        return this.client.helpers.editChannel(this.id, options, reason);
    }

    async delete(reason){
        return this.client.helpers.deleteChannel(this.id, reason);
    }

    async create(options = {}, reason){
        return this.client.helpers.createChannel(this.guildId, options, reason);
    }

    async send(options = {}){
        return this.client.helpers.sendMessage(this.id, options);
    }
}
module.exports = Channel;