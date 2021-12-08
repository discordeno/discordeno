import type { CreateChannelInvite } from "../../types/invites/createChannelInvite.ts";
import type { InviteMetadata } from "../../types/invites/inviteMetadata.ts";
import { Errors } from "../../types/discordeno/errors.ts";
import type { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/** Creates a new invite for this channel. Requires CREATE_INSTANT_INVITE */
export async function createInvite(bot: Bot, channelId: bigint, options: CreateChannelInvite = {}) {
  const result = await bot.rest.runMethod<InviteMetadata>(
    bot.rest,
    "post",
    bot.constants.endpoints.CHANNEL_INVITES(channelId),
    {
      max_age: options.maxAge,
      max_uses: options.maxUses,
      temporary: options.temporary,
      unique: options.unique,
      target_type: options.targetType,
      target_user_id: options.targetUserId,
      target_application_id: options.targetUserId,
    }
  );

  return {
    uses: result.uses,
    maxUses: result.max_uses,
    maxAge: result.max_age,
    temporary: result.temporary,
    createdAt: result.created_at,
  };
}
