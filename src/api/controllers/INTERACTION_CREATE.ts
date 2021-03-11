import { eventHandlers } from "../../bot.ts";
import { DiscordPayload, InteractionCommandPayload } from "../../types/mod.ts";
import { structures } from "../structures/mod.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleInteractionCreate(data: DiscordPayload) {
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
