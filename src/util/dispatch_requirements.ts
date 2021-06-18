import { botId, eventHandlers } from "../bot.ts";
import { cache } from "../cache.ts";
import { getChannels } from "../helpers/channels/get_channels.ts";
import { getActiveThreads } from "../helpers/channels/threads/get_active_threads.ts";
import { getGuild } from "../helpers/guilds/get_guild.ts";
import { getMember } from "../helpers/members/get_member.ts";
import { structures } from "../structures/mod.ts";
import type { DiscordGatewayPayload } from "../types/gateway/gateway_payload.ts";
import type { Guild } from "../types/guilds/guild.ts";
import { snowflakeToBigint } from "./bigint.ts";
import { delay } from "./utils.ts";

const processing = new Set<bigint>();

export async function dispatchRequirements(data: DiscordGatewayPayload, shardId: number) {
  if (!cache.isReady) return;

  // DELETE MEANS WE DONT NEED TO FETCH. CREATE SHOULD HAVE DATA TO CACHE
  if (data.t && ["GUILD_CREATE", "GUILD_DELETE"].includes(data.t)) return;

  const id = snowflakeToBigint(
    (data.t && ["GUILD_UPDATE"].includes(data.t)
      ? // deno-lint-ignore no-explicit-any
        (data.d as any)?.id
      : // deno-lint-ignore no-explicit-any
        (data.d as any)?.guild_id) ?? ""
  );

  if (!id || cache.activeGuildIds.has(id)) return;

  // If this guild is in cache, it has not been swept and we can cancel
  if (cache.guilds.has(id)) {
    cache.activeGuildIds.add(id);
    return;
  }

  if (processing.has(id)) {
    eventHandlers.debug?.(`[DISPATCH] New Guild ID already being processed: ${id} in ${data.t} event`);

    let runs = 0;
    do {
      await delay(500);
      runs++;
    } while (processing.has(id) && runs < 40);

    if (!processing.has(id)) return;

    return eventHandlers.debug?.(
      `[DISPATCH] Already processed guild was not successfully fetched:  ${id} in ${data.t} event`
    );
  }

  processing.add(id);

  // New guild id has appeared, fetch all relevant data
  eventHandlers.debug?.(`[DISPATCH] New Guild ID has appeared: ${id} in ${data.t} event`);

  const rawGuild = (await getGuild(id, {
    counts: true,
    addToCache: false,
  }).catch(console.log)) as Guild | undefined;

  if (!rawGuild) {
    processing.delete(id);
    return eventHandlers.debug?.(`[DISPATCH] Guild ID ${id} failed to fetch.`);
  }

  eventHandlers.debug?.(`[DISPATCH] Guild ID ${id} has been found. ${rawGuild.name}`);

  const [channels, botMember] = await Promise.all([
    getChannels(id, false),
    getMember(id, botId, { force: true }),
  ]).catch((error) => {
    eventHandlers.debug?.(error);
    return [];
  });

  if (!botMember || !channels) {
    processing.delete(id);
    return eventHandlers.debug?.(
      `[DISPATCH] Guild ID ${id} Name: ${rawGuild.name} failed. Unable to get botMember or channels`
    );
  }

  const guild = await structures.createDiscordenoGuild(
    { ...rawGuild, memberCount: rawGuild.approximateMemberCount },
    shardId
  );

  // Add to cache
  cache.guilds.set(id, guild);
  cache.dispatchedGuildIds.delete(id);
  channels.forEach((channel) => {
    cache.dispatchedChannelIds.delete(channel.id);
    cache.channels.set(channel.id, channel);
  });

  processing.delete(id);

  eventHandlers.debug?.(`[DISPATCH] Guild ID ${id} Name: ${guild.name} completely loaded.`);
}
