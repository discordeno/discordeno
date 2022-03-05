const Permissions = require('../Structures/Permissions');
const {permissionOverwritesTypes} = require('../Util/Constants');

module.exports = {

    transformOptions(options, defaults = {}) {
        if(defaults.content){
            if (typeof options === "string") options = { content: options };
        }
        if (typeof options !== "object") options = { id: options };
        if (typeof options.id === "string") options.id = BigInt(options.id);

        if(options.guildId) options.guildId = BigInt(options.guildId);
        if(options.channelId) options.channelId = BigInt(options.channelId);
        if(options.threadId) options.channelId = BigInt(options.channelId);
        if(options.userId) options.userId = BigInt(options.userId);
        if(options.roleId) options.roleId = BigInt(options.roleId);
        if(options.emojiId) options.emojiId = BigInt(options.emojiId);
        if(options.webhookId) options.webhookId = BigInt(options.webhookId);

        if(options.parentId) options.parentId = BigInt(options.parentId);

        return options;
    },

    transformPermissionOverwrites(permissionOverwrites) {
        return permissionOverwrites.map(o =>{
            if(typeof o.id === "string") o.id = BigInt(o.id);
            if(typeof o.type === "string") o.type = permissionOverwritesTypes[o.type];
            if(o.allow) o.allow.map(allow => {
                return new Permissions(0n).transform(allow);
            })
            if(o.deny) o.deny.map(deny => {
                return new Permissions(0n).transform(deny);
            })
            return o;
        });
    }

}