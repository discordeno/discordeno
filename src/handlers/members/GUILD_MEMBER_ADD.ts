import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import {
  DiscordGatewayPayload,
  DiscordGuildMemberAdd,
} from "../../types/gateway.ts";

export async function handleGuildMemberAdd(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildMemberAdd;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  guild.memberCount++;
  const memberStruct = await structures.createMemberStruct(
    payload,
    payload.guild_id,
  );
  await cacheHandlers.set("members", memberStruct.id, memberStruct);

  eventHandlers.guildMemberAdd?.(guild, memberStruct);
}
