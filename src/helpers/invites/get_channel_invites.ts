import type { InviteMetadata } from "../../types/invites/invite_metadata.ts";
import { Collection } from "../../util/collection.ts";
import { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/** Gets the invites for this channel. Requires MANAGE_CHANNEL */
export async function getChannelInvites(bot: Bot, channelId: bigint) {
  await bot.utils.requireBotChannelPermissions(channelId, ["MANAGE_CHANNELS"]);

  const result = await bot.rest.runMethod<SnakeCasedPropertiesDeep<InviteMetadata>[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.CHANNEL_INVITES(channelId)
  );

  return new Collection(result.map((invite) => [invite.code, invite]));
}
