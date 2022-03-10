const Permissions = require('../Structures/Permissions');
const { permissionOverwritesTypes } = require('../Util/Constants');
const { Blob } = require('buffer');
module.exports = {

    transformOptions(options, defaults = {}) {
        if (defaults.content) {
            if (typeof options === "string") options = { content: options };
        }
        if (typeof options !== "object") options = { id: options };
        if (typeof options.id === "string") options.id = BigInt(options.id);

        if (options.guildId) options.guildId = BigInt(options.guildId);
        if (options.channelId) options.channelId = BigInt(options.channelId);
        if (options.threadId) options.channelId = BigInt(options.channelId);
        if (options.userId) options.userId = BigInt(options.userId);
        if (options.roleId) options.roleId = BigInt(options.roleId);
        if (options.emojiId) options.emojiId = BigInt(options.emojiId);
        if (options.webhookId) options.webhookId = BigInt(options.webhookId);

        if (options.parentId) options.parentId = BigInt(options.parentId);

        return options;
    },

    transformPermissionOverwrites(permissionOverwrites) {
        let isArray = true;
        if (!Array.isArray(permissionOverwrites)) {
            permissionOverwrites = [permissionOverwrites];
            isArray = false;
        }
        let result = permissionOverwrites.map(o => {
            if (typeof o.id === "string") o.id = BigInt(o.id);
            if (typeof o.type === "string") o.type = permissionOverwritesTypes[o.type];
            if (!o.type) o.type = permissionOverwritesTypes.role;

            const p = { allow: [], deny: [], neutral: [] };

            if (o.allow) {
                o.allow.map(allow => {
                    new Permissions(0n).transform(allow) !== 0n ? p.allow.push(allow) : null;
                    return allow;
                })

                o.allow = p.allow ?? [];
            } else o.allow = [];

            if (o.deny) {
                o.deny.map(deny => {
                    new Permissions(0n).transform(deny) !== 0n ? p.deny.push(deny) : null;
                    return deny;
                })

                o.deny = p.deny ?? [];
            } else o.deny = [];

            if (o.neutral) {
                o.neutral.map(neutral => {
                    new Permissions(0n).transform(neutral) !== 0n ? p.neutral.push(neutral) : null;
                    return neutral;
                })

                o.neutral = p.neutral ?? [];
            } else o.neutral = [];

            return o;
        });
        if (!isArray) result = result[0];
        return result;
    },

    transformAttachments(attachments) {
        return attachments.map(a => {
            const file = { blob: new Blob((a.blob ?? a.attachment)), name: a.name };
            console.log(file);
            return file;
        })
    }

}