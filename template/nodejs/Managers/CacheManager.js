// Managers
const { ChannelManager, RoleManager, GuildManager, UserManager, EmojiManager, MessageManager, MemberManager } = require("./export");

// Structures
const { Collection, Guild, User, Emoji, Message, Channel, Role , Member} = require("../Structures/export");

/// Packet Handlers
const Actions = require("./Actions");

class CacheManager {
    // : import('discordeno').Bot
    static overwriteHandlers(bot) {
        const { guild, user, member, channel, message, role } = bot.transformers;
        const {handleDiscordPayload} = bot.gateway;

        bot.gateway.handleDiscordPayload = function (_bot, packet, shardId) {
            console.log(packet.t);
            if(Actions[packet.t]) Actions[packet.t](bot, packet, shardId);
            handleDiscordPayload(bot, packet, shardId);
        }

        bot.transformers.guild = function (_, payload, ) {
            // Run the unmodified transformer

            const result = guild(bot, payload);
            if(!payload._cache) return result;
            if(payload.guild) {
                result.channels = payload.guild.channels.map(x => channel(bot, {channel: x}, {guildId: result.id}));
                result.members = payload.guild.members.map(x => member(bot, x, result.id, BigInt(x.user.id)));
            }
            // Cache the result
            if (result) {
                bot.guilds.cache.patch(result.id, result);
            }

            // Return the result
            return result;
        };
        return bot;
    }

    static enableCachePlugin(client, options = {}) {
        const channelOptions = createOptions(client, options.channels, Channel)
        client.channels = new ChannelManager(client);
        client.channels.cache = new Collection(channelOptions);

        const guildOptions = createOptions(client, options.guilds, Guild)
        client.guilds = new GuildManager(client);
        client.guilds.cache = new Collection(guildOptions);

        const roleOptions = createOptions(client, options.roles, Role)
        client.roles = new RoleManager(client);
        client.roles.cache = new Collection(roleOptions);

        const userOptions = createOptions(client, options.users, User)
        client.users = new UserManager(client);
        client.users.cache = new Collection(userOptions);

        const emojiOptions = createOptions(client, options.emojis, Emoji)
        client.emojis = new EmojiManager(client);
        client.emojis.cache = new Collection(emojiOptions);

        const messageOptions = createOptions(client, options.messages, Message)
        client.messages = new MessageManager(client);
        client.messages.cache = new Collection(messageOptions);

        const memberOptions = createOptions(client, options.members, Member)
        client.members = new MemberManager(client);
        client.members.cache = new Collection(memberOptions);
        return CacheManager.overwriteHandlers(client);
    }


}
module.exports = CacheManager;

function createOptions(client, options = {}, transformerClass) {
    return {
        client,
        properties: options.properties ?? [],
        transformerClass: transformerClass ?? options.transformerClass,
    }
}