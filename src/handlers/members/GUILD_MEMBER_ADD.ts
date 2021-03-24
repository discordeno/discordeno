import { eventHandlers } from "../../bot.ts";
import { structures } from "../../structures/mod.ts";
import { cacheHandlers } from "../../cache.ts";

export async function handleGuildMemberAdd(data: DiscordPayload) {
  const payload = data.d as GuildMemberAddPayload;
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
