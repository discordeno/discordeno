import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { Interaction } from "../../types/interactions/interaction.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export async function handleInteractionCreate(data: DiscordGatewayPayload) {
  const payload = data.d as Interaction;
  const discordenoMember = payload.guildId
    ? await structures.createDiscordenoMember(payload.member!.user, {
        member: payload.member!,
        guildId: snowflakeToBigint(payload.guildId),
      })
    : await structures.createDiscordenoMember(payload.member!.user);

  if (payload.guildId) {
    await cacheHandlers.set("members", discordenoMember.id, discordenoMember);
    eventHandlers.interactionGuildCreate?.(payload, discordenoMember);
  } else {
    eventHandlers.interactionDMCreate?.(payload);
  }

  eventHandlers.interactionCreate?.(payload, discordenoMember);
}
