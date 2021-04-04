import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordInviteCreate } from "../../types/invites/invite_create.ts";

export function handleInviteCreate(payload: DiscordGatewayPayload) {
  // TODO: replace with tocamelcase
  const {
    channel_id: channelId,
    created_at: createdAt,
    max_age: maxAge,
    guild_id: guildId,
    target_user: targetUser,
    target_user_type: targetUserType,
    max_uses: maxUses,
    ...rest
  } = payload.d as DiscordInviteCreate;

  eventHandlers.inviteCreate?.({
    ...rest,
    channelId,
    guildId,
    maxAge,
    targetUser,
    targetUserType,
    maxUses,
    createdAt,
  });
}
