import { Bot } from "../../bot.ts";
import { DiscordGuildApplicationCommandPermissions } from "../../types/discord.ts";
import { ApplicationCommandPermission } from "../applicationCommandPermission.ts";

export function transformApplicationCommandPermissionToDiscordApplicationCommandPermission(
  bot: Bot,
  payload: ApplicationCommandPermission,
): DiscordGuildApplicationCommandPermissions {
  return {
    id: bot.transformers.reverse.snowflake(payload.id),
    application_id: bot.transformers.reverse.snowflake(payload.applicationId),
    guild_id: bot.transformers.reverse.snowflake(payload.guildId),
    permissions: payload.permissions.map((perm) => ({
      id: bot.transformers.reverse.snowflake(perm.id),
      type: perm.type,
      permission: perm.permission,
    })),
  };
}
