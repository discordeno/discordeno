//const {Member} = require("./export");
const DestructObject = require("./DestructObject");

//const {RoleManager, MemberManager, ChannelManager} = require("../Managers/export");

class Guild extends DestructObject {
    constructor(client, guild = {}, options = {}) {
        super(guild);
        this.client = client;

        
        this.me = client.members.forge({id: client.user.id}, {guild: this});
        
        //Managers:
        this.roles = client.roles.forgeManager({}, { guild: this , roles: options.roles});
        this.channels = client.channels.forgeManager({}, { guild: this, channels: options.channels }); 
        this.members = client.members.forgeManager({}, {guild: this, members: options.members});
    }
}
module.exports = Guild;