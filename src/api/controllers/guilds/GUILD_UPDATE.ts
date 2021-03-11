import { eventHandlers } from "../../../bot.ts";
import {
  DiscordPayload,
  GuildUpdateChange,
  UpdateGuildPayload,
} from "../../../types/mod.ts";
import { cacheHandlers } from "../cache.ts";

export async function handleGuildUpdate(data: DiscordPayload) {
  const payload = data.d as UpdateGuildPayload;
  const cachedGuild = await cacheHandlers.get("guilds", payload.id);
  if (!cachedGuild) return;

  const keysToSkip = [
    "roles",
    "guild_hashes",
    "guild_id",
    "max_members",
    "emojis",
  ];

  const changes = Object.entries(payload)
    .map(([key, value]) => {
      if (keysToSkip.includes(key)) return;

      // @ts-ignore index signature
      const cachedValue = cachedGuild[key];
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
        cachedGuild[key] = value;
        return { key, oldValue: cachedValue, value };
      }
    }).filter((change) => change) as GuildUpdateChange[];

  await cacheHandlers.set("guilds", payload.id, cachedGuild);

  eventHandlers.guildUpdate?.(cachedGuild, changes);
}
