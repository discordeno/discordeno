const {User} = require("../Structures/export");
class Users{
    constructor(client, data ={}, options = {}){
        this.client = client;
        if(options.guild) this.guild  = options.guild;
    }

    forge(data = {}){
        return new User(this.client, data, {guild: this.guild})
    }
}
module.exports = Users;