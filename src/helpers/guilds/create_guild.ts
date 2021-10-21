import type { CreateGuild } from "../../types/guilds/create_guild.ts";
import type { Guild } from "../../types/guilds/guild.ts";
import type { Bot } from "../../bot.ts";

/** Create a new guild. Returns a guild object on success. Fires a Guild Create Gateway event. This endpoint can be used only by bots in less than 10 guilds. */
export async function createGuild(bot: Bot, options: CreateGuild) {
  const result = await bot.rest.runMethod<Guild>(bot.rest,"post", bot.constants.endpoints.GUILDS, {
    name: options.name,
    afk_channel_id: options.afkChannelId,
    afk_timeout: options.afkTimeout,
    channels: options.channels,
    default_message_notifications: options.defaultMessageNotifications,
    explicit_content_filter: options.explicitContentFilter,
    icon: options.icon,
    roles: options.roles,
    system_channel_flags: options.systemChannelFlags,
    system_channel_id: options.systemChannelId,
    verification_level: options.verificationLevel
  });

  const guild = bot.transformers.guild(bot, {guild: result, shardId: 0});
  // MANUALLY CACHE THE GUILD
  await bot.cache.guilds.set(guild.id, guild);
  // MANUALLY CACHE THE BOT
  await bot.helpers.getMember(bot, guild.id, bot.id);

  return guild;
}
