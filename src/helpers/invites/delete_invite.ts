import type { InviteMetadata } from "../../types/invites/invite_metadata.ts";
import type { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/** Deletes an invite for the given code. Requires `MANAGE_CHANNELS` or `MANAGE_GUILD` permission */
export async function deleteInvite(bot: Bot, channelId: bigint, inviteCode: string) {
  const channel = await bot.cache.channels.get(channelId);
  if (channel) {
    const hasPerm = await bot.utils.botHasChannelPermissions(bot, channel, ["MANAGE_CHANNELS"]);

    if (!hasPerm) {
      await bot.utils.requireBotGuildPermissions(bot, channel.guildId, ["MANAGE_GUILD"]);
    }
  }

  return await bot.rest.runMethod<InviteMetadata>(
    bot.rest,
    "delete",
    bot.constants.endpoints.INVITE(inviteCode)
  );
}
