const {Guild} =require('../Structures/export');
class Guilds{
    constructor(client, data ={}, options = {}){
        this.client = client;
    }
    forge(data = {}){
        if(!data.id) throw new Error("No Guild ID Provided");
        if(this.client.guilds.cache.has(data.id)){
            const v = this.client.guilds.cache._get(data.id);
            return new Guild(this.client, v, {roles: v.roles, channels: v.channels, members: v.members}) 
        }    
        return new Guild(this.client, data, {roles: data.roles, channels: data.channels, members: data.members})
    }
    
}
module.exports = Guilds;