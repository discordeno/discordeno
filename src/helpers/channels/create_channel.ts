import type { Channel } from "../../types/channels/channel.ts";
import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";
import type { CreateGuildChannel, DiscordCreateGuildChannel } from "../../types/guilds/create_guild_channel.ts";
import type { Bot } from "../../bot.ts";

/** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
export async function createChannel(bot: Bot, guildId: bigint, options?: CreateGuildChannel, reason?: string) {
    if (options?.permissionOverwrites) {
        await bot.utils.requireOverwritePermissions(bot, guildId, options.permissionOverwrites);
    }

    // BITRATES ARE IN THOUSANDS SO IF USER PROVIDES 32 WE CONVERT TO 32000
    if (options?.bitrate && options.bitrate < 1000) options.bitrate *= 1000;

    const result = await bot.rest.runMethod<Channel>(
        bot.rest,
        "post",
        bot.constants.endpoints.GUILD_CHANNELS(guildId),
        options ? {
            name: options.name,
            topic: options.topic,
            bitrate: options.bitrate,
            userLimit: options.userLimit,
            rateLimitPerUser: options.rateLimitPerUser,
            position: options.position,
            parentId: options.parentId,
            nsfw: options.nsfw,
            permission_overwrites: options?.permissionOverwrites?.map((perm) => ({
                ...perm,
                allow: bot.utils.calculateBits(perm.allow),
                deny: bot.utils.calculateBits(perm.deny),
            })),
            type: options?.type || DiscordChannelTypes.GuildText,
            reason,
        } : {}
    );

    const discordenoChannel = bot.transformers.channel(result);
    await bot.cache.channels.set(discordenoChannel.id, discordenoChannel);

    return discordenoChannel;
}
