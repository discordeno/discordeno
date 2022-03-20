import { Bot } from "../bot.ts";
import { DiscordRole } from "../types/discord.ts";
import { RoleToggles } from "./toggles/role.ts";
import { Optionalize } from "../types/shared.ts";

export function transformRole(bot: Bot, payload: { role: DiscordRole } & { guildId: bigint }) {
  const role = {
    name: payload.role.name,
    guildId: payload.guildId,
    position: payload.role.position,
    color: payload.role.color,
    toggles: new RoleToggles(payload.role),

    id: bot.transformers.snowflake(payload.role.id),
    botId: payload.role.tags?.bot_id ? bot.transformers.snowflake(payload.role.tags.bot_id) : undefined,
    integrationId: payload.role.tags?.integration_id
      ? bot.transformers.snowflake(payload.role.tags.integration_id)
      : undefined,
    permissions: bot.transformers.snowflake(payload.role.permissions),
    icon: payload.role.icon ? bot.utils.iconHashToBigInt(payload.role.icon) : undefined,
    unicodeEmoji: payload.role.unicode_emoji,
  };

  return role as Optionalize<typeof role>;
}

export interface Role extends ReturnType<typeof transformRole> {}
