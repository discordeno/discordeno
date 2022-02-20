const DestructObject = require("./DestructObject");
const Permissions = require("./Permissions");

class Member extends DestructObject{
    constructor(client, member = {}, options = {}) {
        super(member, {'permissions': true});
        this.client = client;

        if(options.guild) this.guild = options.guild;
        else this.guild = client.guilds.forge({id: this.guildId});

        this.roles = client.roles.forgeManager({}, { guild: options.guild , member: this,roles: getRoles(client, member.roles, this.guild)});

    }

    get permissions() {
        if (this.id === this.guild.ownerId) return new Permissions(Permissions.ALL).freeze();
        if(!this.roles.cache) return new Permissions(0n).freeze();
        const permissions = [...this.roles.cache.values()].map(role => role._permissions || 0n)
        return new Permissions(permissions).freeze();
    }


    async send(options = {}){
        return this.client.users.forge({id: this.id}).send(options);
    }
}
module.exports = Member;

function getRoles(client, roles, guild){
    if(!roles) return new Map();
    const memberRoles = new Map();
    roles.forEach((m)=>{
        const role = client.roles.forge({id: m}, {guild: guild});
        if(role) memberRoles.set(role.id, role);
       
    })
    return memberRoles;
}