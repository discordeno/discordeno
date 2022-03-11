import type { Bot } from "../../bot.ts";
import { OverwriteReadable } from "../../types/discordeno.ts";

/** Edit the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
export async function editChannelOverwrite(
  bot: Bot,
  channelId: bigint,
  overwriteId: bigint,
  options: Omit<OverwriteReadable, "id">,
) {
  await bot.rest.runMethod<undefined>(
    bot.rest,
    "put",
    bot.constants.endpoints.CHANNEL_OVERWRITE(channelId, overwriteId),
    {
      allow: options.allow ? bot.utils.calculateBits(options.allow) : "0",
      deny: options.deny ? bot.utils.calculateBits(options.deny) : "0",
      type: options.type,
    },
  );
}
