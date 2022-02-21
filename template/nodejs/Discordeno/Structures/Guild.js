const DestructObject = require("./DestructObject");

class Guild extends DestructObject {
    constructor(client, guild = {}, options = {}) {
        super(guild);
        this.client = client;

        
        
        //Managers:
        this.roles = client.roles.forgeManager({}, { guild: this , roles: options.roles});
        this.channels = client.channels.forgeManager({}, { guild: this, channels: options.channels }); 
        this.members = client.members.forgeManager({}, {guild: this, members: options.members});
        
        this.me = client.members.forge({id: client.user.id}, {guild: this});
    }
}
module.exports = Guild;