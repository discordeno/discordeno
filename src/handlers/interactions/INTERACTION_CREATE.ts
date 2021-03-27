import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordGatewayPayload } from "../../types/gateway.ts";

export async function handleInteractionCreate(data: DiscordGatewayPayload) {
  const payload = data.d as InteractionCommandPayload;
  const memberStruct = await structures.createMemberStruct(
    payload.member,
    payload.guild_id,
  );
  await cacheHandlers.set("members", memberStruct.id, memberStruct);

  eventHandlers.interactionCreate?.(
    {
      ...payload,
      member: memberStruct,
    },
  );
}
