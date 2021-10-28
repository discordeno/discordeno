import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { GuildMembersChunk } from "../../types/members/guild_members_chunk.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildMembersChunk(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildMembersChunk>;

  const guildId = bot.transformers.snowflake(payload.guild_id);

  await bot.cache.execute("GUILD_MEMBER_CHUNK", {
    members: payload.members.map((m) => bot.transformers.member(bot, m, guildId, bot.transformers.snowflake(m.user.id))),
    users: payload.members.map((m) => bot.transformers.user(bot, m.user)),
  });

  if (!payload.nonce) return;
  
  // Check if its necessary to resolve the fetchmembers promise for this chunk or if more chunks will be coming
  const resolve = bot.cache.fetchAllMembersProcessingRequests.get(payload.nonce);
  if (!resolve) return;

  if (payload.chunk_index + 1 === payload.chunk_count) {
    bot.cache.fetchAllMembersProcessingRequests.delete(payload.nonce);
    return resolve("Finished chunking members");
  }
}

// TODO: add a helper function that runs await fetch
// await fetchMembers();
// const members = await bot.cache.members.findMany(guildId);