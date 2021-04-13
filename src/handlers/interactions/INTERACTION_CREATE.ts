import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordGuildMemberWithUser } from "../../types/guilds/guild_member.ts";
import { DiscordInteraction } from "../../types/interactions/interaction.ts";

export async function handleInteractionCreate(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordInteraction;
  const discordenoMember = payload.guild_id
    ? await structures.createDiscordenoMember(
      payload.member as DiscordGuildMemberWithUser,
      payload.guild_id,
    )
    : undefined;
  if (discordenoMember) {
    await cacheHandlers.set("members", discordenoMember.id, discordenoMember);
    eventHandlers.interactionGuildCreate?.(payload, discordenoMember);
  } else {
    eventHandlers.interactionDMCreate?.(payload);
  }

  eventHandlers.interactionCreate?.(payload, discordenoMember);
}
