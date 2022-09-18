import type { Bot } from "../../bot.ts";
import { Role } from "../../transformers/role.ts";
import { DiscordRole } from "../../types/discord.ts";
import { BigString, PermissionStrings } from "../../types/shared.ts";

/**
 * Edits a role in a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to edit the role in.
 * @param roleId - The ID of the role to edit.
 * @param options - The parameters for the edit of the role.
 * @returns An instance of the edited {@link Role}.
 *
 * @remarks
 * Requires the `MANAGE_ROLES` permission.
 *
 * Fires a _Guild Role Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-role}
 */
export async function editRole(bot: Bot, guildId: BigString, roleId: BigString, options: EditGuildRole): Promise<Role> {
  const result = await bot.rest.runMethod<DiscordRole>(
    bot.rest,
    "PATCH",
    bot.constants.routes.GUILD_ROLE(guildId, roleId),
    {
      name: options.name,
      color: options.color,
      hoist: options.hoist,
      mentionable: options.mentionable,
      permissions: bot.utils.calculateBits(options?.permissions || []),
      icon: options.icon,
      unicode_emoji: options.unicodeEmoji,
    },
  );

  return bot.transformers.role(bot, { role: result, guildId: bot.transformers.snowflake(guildId) });
}

export interface EditGuildRole {
  /** Name of the role, default: "new role" */
  name?: string;
  /** Bitwise value of the enabled/disabled permissions, default: everyone permissions in guild */
  permissions?: PermissionStrings[];
  /** RGB color value, default: 0 */
  color?: number;
  /** Whether the role should be displayed separately in the sidebar, default: false */
  hoist?: boolean;
  /** Whether the role should be mentionable, default: false */
  mentionable?: boolean;
  /** The role's unicode emoji (if the guild has the `ROLE_ICONS` feature) */
  unicodeEmoji?: string;
  /** the role's icon image (if the guild has the `ROLE_ICONS` feature) */
  icon?: string;
}
