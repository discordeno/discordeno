import type { Overwrite } from "../../types/channels/overwrite.ts";
import type { Bot } from "../../bot.ts";

/** Edit the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
export async function editChannelOverwrite(
    bot: Bot,
  guildId: bigint,
  channelId: bigint,
  overwriteId: bigint,
  options: Omit<Overwrite, "id">
): Promise<undefined> {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["MANAGE_ROLES"]);

  return await bot.rest.runMethod<undefined>(bot.rest,"put", bot.constants.endpoints.CHANNEL_OVERWRITE(channelId, overwriteId), {
    allow: bot.utils.calculateBits(options.allow),
    deny: bot.utils.calculateBits(options.deny),
    type: options.type,
  });
}
