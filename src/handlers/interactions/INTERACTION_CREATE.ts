import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

export async function handleInteractionCreate(data: DiscordGatewayPayload) {
  const payload = data.d as InteractionCommandPayload;
  const discordenoMember = await structures.createDiscordenoMember(
    payload.member,
    payload.guild_id,
  );
  await cacheHandlers.set("members", discordenoMember.id, discordenoMember);

  eventHandlers.interactionCreate?.(
    {
      ...payload,
      member: discordenoMember,
    },
  );
}
