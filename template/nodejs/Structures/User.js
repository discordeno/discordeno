const DestructObject = require("./DestructObject");

class User extends DestructObject{
    ///constructor(client: import("discordeno").Bot, channel = {}) {
    constructor(client, user = {}) {
        super(user);
        this.client = client;
    }
}
module.exports = User;