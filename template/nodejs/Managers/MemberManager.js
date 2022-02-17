const {Member} = require("../Structures/export");
class Members{
    constructor(client, data ={}, options = {}){
        this.client = client;
        
        if(options.members) this.cache  = options.members;
        if(options.guild) this.guild  = options.guild;

    }

    forge(data = {}, options = {}){
        return new Member(this.client, data, {guild: options.guild})
    }

    forgeManager(data = {}, options = {}){
        return new Members(this.client, data, {guild: options.guild, members: options.members});
    }
}
module.exports = Members;