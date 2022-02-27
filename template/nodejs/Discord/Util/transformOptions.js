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

        return options;
    }




}