import { Bot } from "../bot.ts";
import { DiscordGuildApplicationCommandPermissions } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformApplicationCommandPermission(
  bot: Bot,
  payload: DiscordGuildApplicationCommandPermissions,
) {
  return {
    id: bot.transformers.snowflake(payload.id),
    applicationId: bot.transformers.snowflake(payload.application_id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    permissions: payload.permissions.map((perm) => ({
      id: bot.transformers.snowflake(perm.id),
      type: perm.type,
      permission: perm.permission,
    })),
  };
}

export interface ApplicationCommandPermission
  extends Optionalize<ReturnType<typeof transformApplicationCommandPermission>> {}
