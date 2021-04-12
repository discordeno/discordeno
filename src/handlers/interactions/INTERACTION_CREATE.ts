// TODO: DM support idk need to discuss how we solve this
import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordInteraction } from "../../types/mod.ts";

export async function handleInteractionCreate(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordInteraction;
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
