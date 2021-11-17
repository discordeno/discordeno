import type { CreateChannelInvite } from "../../types/invites/createChannelInvite.ts";
import type { InviteMetadata } from "../../types/invites/inviteMetadata.ts";
import { Errors } from "../../types/discordeno/errors.ts";
import type { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

/** Creates a new invite for this channel. Requires CREATE_INSTANT_INVITE */
export async function createInvite(bot: Bot, channelId: bigint, options: CreateChannelInvite = {}) {
  if (options.maxAge && (options.maxAge < 0 || options.maxAge > 604800)) {
    throw new Error(Errors.INVITE_MAX_AGE_INVALID);
  }
  if (options.maxUses && (options.maxUses < 0 || options.maxUses > 100)) {
    throw new Error(Errors.INVITE_MAX_USES_INVALID);
  }

  return await bot.rest.runMethod<InviteMetadata>(
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
}
