const DestructObject = require("./DestructObject");

class User extends DestructObject{
    ///constructor(client: import("discordeno").Bot, channel = {}) {
    constructor(client, user = {}) {
        super(user);
        this.client = client;
        if(!this.tag) this.tag = this.username + "#" + String(this.discriminator);
    }
}
module.exports = User;