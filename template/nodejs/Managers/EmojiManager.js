const {Emoji} = require('../Structures/export');
class Emojis{
    constructor(client, data ={}, options = {}){
        this.client = client;
        if(options.guild) this.guild  = options.guild;
    }

    async create(options = {}, reason){
    }

    forge(data = {}, options = {}){   
        return new Emoji(this.client, data, {guild: options.guild});
    }
}
module.exports = Emojis;