import { eventHandlers } from "../../bot.ts";
import { DiscordPayload, InviteCreateEvent } from "../../types/mod.ts";

export function handleInviteCreate(payload: DiscordPayload) {
  if (payload.t !== "INVITE_CREATE") return;
  //TODO: replace with tocamelcase
  const {
    channel_id: channelID,
    created_at: createdAt,
    max_age: maxAge,
    guild_id: guildID,
    target_user: targetUser,
    target_user_type: targetUserType,
    max_uses: maxUses,
    ...rest
  } = payload.d as InviteCreateEvent;

  eventHandlers.inviteCreate?.({
    ...rest,
    channelID,
    guildID,
    maxAge,
    targetUser,
    targetUserType,
    maxUses,
    createdAt,
  });
}
