import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { GuildUpdateChange } from "../../types/discordeno/guild_update_change.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { Guild } from "../../types/guilds/guild.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export async function handleGuildUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as Guild;
  const newGuild = await cacheHandlers.get(
    "guilds",
    snowflakeToBigint(payload.id),
  );
  if (!newGuild) return;

  const keysToSkip = [
    "roles",
    "guildHashes",
    "guildId",
    "maxMembers",
    "emojis",
  ];

  const changes = Object.entries(payload)
    .map(([key, value]) => {
      if (keysToSkip.includes(key)) return;

      // @ts-ignore index signature
      const cachedValue = newGuild[key];
      if (cachedValue !== value) {
        // Guild create sends undefined and update sends false.
        if (!cachedValue && !value) return;

        if (Array.isArray(cachedValue) && Array.isArray(value)) {
          const different = (cachedValue.length !== value.length) ||
            cachedValue.find((val) => !value.includes(val)) ||
            value.find((val) => !cachedValue.includes(val));
          if (!different) return;
        }

        // @ts-ignore index signature
        newGuild[key] = value;
        return { key, oldValue: cachedValue, value };
      }
    }).filter((change) => change) as GuildUpdateChange[];

  await cacheHandlers.set("guilds", newGuild.id, newGuild);

  eventHandlers.guildUpdate?.(newGuild, changes);
}
