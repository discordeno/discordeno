import type { Bot } from "../../bot.ts";
import { DiscordRole } from "../../types/discord.ts";
import { PermissionStrings } from "../../types/shared.ts";

/** Create a new role for the guild. Requires the MANAGE_ROLES permission. */
export async function createRole(bot: Bot, guildId: bigint, options: CreateGuildRole, reason?: string) {
  const result = await bot.rest.runMethod<DiscordRole>(bot.rest, "post", bot.constants.endpoints.GUILD_ROLES(guildId), {
    name: options.name,
    permissions: bot.utils.calculateBits(options?.permissions || []),
    color: options.color,
    hoist: options.hoist,
    icon: options.icon,
    unicode_emoji: options.unicodeEmoji,
    mentionable: options.mentionable,
    reason,
  });

  return bot.transformers.role(bot, {
    role: result,
    guildId,
  });
}

export interface CreateGuildRole {
  /** Name of the role, default: "new role" */
  name?: string;
  /** Bitwise value of the enabled/disabled permissions, default: everyone permissions in guild */
  permissions?: PermissionStrings[];
  /** RGB color value, default: 0 */
  color?: number;
  /** Whether the role should be displayed separately in the sidebar, default: false */
  hoist?: boolean;
  /** the role's icon image (if the guild has the `ROLE_ICONS` feature) */
  icon?: string;
  /** The role's unicode emoji (if the guild has the `ROLE_ICONS` feature) */
  unicodeEmoji?: string;
  /** Whether the role should be mentionable, default: false */
  mentionable?: boolean;
}
