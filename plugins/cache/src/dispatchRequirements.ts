import type { Guild } from "../deps.ts";
import { Bot, DiscordGatewayPayload } from "../deps.ts";
import { BotWithCache } from "./addCacheCollections.ts";

const processing = new Set<bigint>();

export async function dispatchRequirements<B extends Bot>(
  bot: BotWithCache<B>,
  data: DiscordGatewayPayload,
) {
  // DELETE MEANS WE DONT NEED TO FETCH. CREATE SHOULD HAVE DATA TO CACHE
  if (data.t && ["GUILD_CREATE", "GUILD_DELETE"].includes(data.t)) return;

  const id = bot.utils.snowflakeToBigint(
    (data.t && ["GUILD_UPDATE"].includes(data.t)
      ? // deno-lint-ignore no-explicit-any
        (data.d as any)?.id
      : // deno-lint-ignore no-explicit-any
        (data.d as any)?.guild_id) ?? "",
  );

  if (!id || bot.activeGuildIds.has(id)) return;

  // If this guild is in cache, it has not been swept and we can cancel
  if (bot.guilds.has(id)) {
    bot.activeGuildIds.add(id);
    return;
  }

  if (processing.has(id)) {
    bot.events.debug(
      `[DISPATCH] New Guild ID already being processed: ${id} in ${data.t} event`,
    );

    let runs = 0;
    do {
      await bot.utils.delay(500);
      runs++;
    } while (processing.has(id) && runs < 40);

    if (!processing.has(id)) return;

    return bot.events.debug(
      `[DISPATCH] Already processed guild was not successfully fetched:  ${id} in ${data.t} event`,
    );
  }

  processing.add(id);

  // New guild id has appeared, fetch all relevant data
  bot.events.debug(
    `[DISPATCH] New Guild ID has appeared: ${id} in ${data.t} event`,
  );

  const guild = (await bot.helpers
    .getGuild(id, {
      counts: true,
    })
    .catch(console.log)) as Guild;

  if (!guild) {
    processing.delete(id);
    return bot.events.debug(`[DISPATCH] Guild ID ${id} failed to fetch.`);
  }

  bot.events.debug(`[DISPATCH] Guild ID ${id} has been found. ${guild.name}`);

  const [channels, botMember] = await Promise.all([
    bot.helpers.getChannels(id),
    bot.helpers.getMember(id, bot.id),
  ]).catch((error) => {
    bot.events.debug(error);
    return [];
  });

  if (!botMember || !channels) {
    processing.delete(id);
    return bot.events.debug(
      `[DISPATCH] Guild ID ${id} Name: ${guild.name} failed. Unable to get botMember or channels`,
    );
  }

  // Add to cache
  bot.guilds.set(id, guild);
  bot.dispatchedGuildIds.delete(id);
  channels.forEach((channel) => {
    bot.dispatchedChannelIds.delete(channel.id);
    bot.channels.set(channel.id, channel);
  });
  bot.members.set(
    bot.transformers.snowflake(`${botMember.id}${guild.id}`),
    botMember,
  );

  processing.delete(id);

  bot.events.debug(
    `[DISPATCH] Guild ID ${id} Name: ${guild.name} completely loaded.`,
  );
}
