import { snakeKeysToCamelCase } from "../../../mod.ts";
import { eventHandlers } from "../../bot.ts";
import { GatewayPayload, GuildBanAddEventPayload } from "../../types/mod.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleInternalGuildBanAdd(data: GatewayPayload) {
  if (data.t !== "GUILD_BAN_ADD") return;

  const payload = data.d as GuildBanAddEventPayload;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const member = await cacheHandlers.get("members", payload.user.id);
  eventHandlers.guildBanAdd?.(
    guild,
    snakeKeysToCamelCase(payload.user),
    member,
  );
}

export async function handleInternalGuildBanRemove(data: GatewayPayload) {
  if (data.t !== "GUILD_BAN_REMOVE") return;

  const payload = data.d as GuildBanAddEventPayload;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const member = await cacheHandlers.get("members", payload.user.id);
  eventHandlers.guildBanRemove?.(
    guild,
    snakeKeysToCamelCase(payload.user),
    member,
  );
}
