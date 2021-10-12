import { Bot } from "../bot.ts";
import type { DiscordGatewayPayload } from "../types/gateway/gateway_payload.ts";
import type { Guild } from "../types/guilds/guild.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";

const processing = new Set<bigint>();

export async function dispatchRequirements(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  if (!bot.isReady) return;

  // DELETE MEANS WE DONT NEED TO FETCH. CREATE SHOULD HAVE DATA TO CACHE
  if (data.t && ["GUILD_CREATE", "GUILD_DELETE"].includes(data.t)) return;

  const id = bot.utils.snowflakeToBigint(
    (data.t && ["GUILD_UPDATE"].includes(data.t)
      ? // deno-lint-ignore no-explicit-any
        (data.d as any)?.id
      : // deno-lint-ignore no-explicit-any
        (data.d as any)?.guild_id) ?? ""
  );

  if (!id || bot.activeGuildIds.has(id)) return;

  // If this guild is in cache, it has not been swept and we can cancel
  if (await bot.cache.guilds.has(id)) {
    bot.activeGuildIds.add(id);
    return;
  }

  if (processing.has(id)) {
    bot.events.debug(`[DISPATCH] New Guild ID already being processed: ${id} in ${data.t} event`);

    let runs = 0;
    do {
      await bot.utils.delay(500);
      runs++;
    } while (processing.has(id) && runs < 40);

    if (!processing.has(id)) return;

    return bot.events.debug(
      `[DISPATCH] Already processed guild was not successfully fetched:  ${id} in ${data.t} event`
    );
  }

  processing.add(id);

  // New guild id has appeared, fetch all relevant data
  bot.events.debug(`[DISPATCH] New Guild ID has appeared: ${id} in ${data.t} event`);

  const rawGuild = (await bot.helpers
    .getGuild(id, {
      counts: true,
      addToCache: false,
    })
    .catch(console.log)) as SnakeCasedPropertiesDeep<Guild> | undefined;

  if (!rawGuild) {
    processing.delete(id);
    return bot.events.debug(`[DISPATCH] Guild ID ${id} failed to fetch.`);
  }

  bot.events.debug(`[DISPATCH] Guild ID ${id} has been found. ${rawGuild.name}`);

  const [channels, botMember] = await Promise.all([
    bot.helpers.getChannels(id, false),
    bot.helpers.getMember(id, bot.id, { force: true }),
  ]).catch((error) => {
    bot.events.debug(error);
    return [];
  });

  if (!botMember || !channels) {
    processing.delete(id);
    return bot.events.debug(
      `[DISPATCH] Guild ID ${id} Name: ${rawGuild.name} failed. Unable to get botMember or channels`
    );
  }

  const guild = bot.transformers.guild(bot, {
    ...rawGuild,
    member_count: rawGuild.approximateMemberCount,
    shardId,
  });

  // Add to cache
  await bot.cache.guilds.set(id, guild);
  bot.cache.dispatchedGuildIds.delete(id);
  channels.forEach((channel) => {
    bot.cache.dispatchedChannelIds.delete(channel.id);
    bot.cache.channels.set(channel.id, channel);
  });

  processing.delete(id);

  bot.events.debug(`[DISPATCH] Guild ID ${id} Name: ${guild.name} completely loaded.`);
}
