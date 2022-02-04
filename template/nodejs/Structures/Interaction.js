const DestructObject = require("./DestructObject");

class Interaction extends DestructObject{
    constructor(client, interaction = {}) {
        super(interaction);
        this.raw = interaction;
        this.client = client;

        this.guild = new Guild(client, {id: this.guild_id || this.guildId});
        this.channel = new Channel(client, {id: this.channel_id || this.channelId});
    }
    async deferReply(options = {}){
        options.type = 5;
        if(options.ephemeral) options.data = {flags: 64};
        return this.client.helpers.sendInteractionResponse(this.id, this.token, options);
    }
}
module.exports = Interaction;