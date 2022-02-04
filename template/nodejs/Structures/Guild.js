const DestructObject = require("./DestructObject");

class Guild extends DestructObject{
    ///constructor(client: import("discordeno").Bot, channel = {}) {
    constructor(client, guild = {}) {
        super(guild);
        this.client = client;
    }
}
module.exports = Guild;