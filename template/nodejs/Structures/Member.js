const DestructObject = require("./DestructObject");
const Permissions = require("./Permissions");
//const {RoleManager} = require("../Managers/export");

class Member extends DestructObject{
    constructor(client, member = {}, options = {}) {
        super(member, {'permissions': true});
        this.client = client;

        if(options.guild) this.guild = options.guild;
        else this.guild = client.guilds.forge({id: this.guildId});

        this.roles = client.roles.forgeManager({}, { guild: options.guild , member: this,roles: getRoles(client, member.roles)});

    }

    get permissions() {
        if (this.id === this.guild.ownerId) return new Permissions(Permissions.ALL).freeze();
        return new Permissions(this.roles.cache.map(role => role._permissions)).freeze();
    }
}
module.exports = Member;

function getRoles(client, roles){
    if(!roles) return new Map();
    const memberRoles = new Map();
    roles.forEach((m)=>{
        const role = client.roles.forge({id: m}, {guild: this.guild});
        if(role) memberRoles.set(role.id, role);
    })
    return memberRoles;
}