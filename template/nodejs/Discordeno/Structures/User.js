const DestructObject = require("./DestructObject");

class User extends DestructObject {
    constructor(client, user = {}) {
        super(user);
        this.client = client;
    }

    get tag() { 
        return `#${this.username}#${this.discriminator}`
    };

    async send(options = {}) {
        const channel = await this.client.helpers.getDmChannel(this.id);
        return this.client.helpers.sendMessage(channel.id, options);
    }
}
module.exports = User;