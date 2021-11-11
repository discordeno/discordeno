import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { InviteDelete } from "../../types/invites/invite_delete.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export function handleInviteDelete(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<InviteDelete>;

  bot.events.inviteDelete(bot, {
    /** The channel of the invite */
    channelId: bot.transformers.snowflake(payload.channel_id),
    /** The guild of the invite */
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    /** The unique invite code */
    code: payload.code,
  });
}
