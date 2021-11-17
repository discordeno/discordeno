import type { InviteMetadata } from "../../types/invites/inviteMetadata.ts";
import { Collection } from "../../util/collection.ts";
import type { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/** Gets the invites for this channel. Requires MANAGE_CHANNEL */
export async function getChannelInvites(bot: Bot, channelId: bigint) {
  const result = await bot.rest.runMethod<InviteMetadata[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.CHANNEL_INVITES(channelId)
  );

  return new Collection(result.map((invite) => [invite.code, invite]));
}
