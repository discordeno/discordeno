import { Bot } from "../bot.ts";
import { DiscordApplicationCommand } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformApplicationCommand(bot: Bot, payload: DiscordApplicationCommand) {
  const applicationCommand = {
    id: bot.transformers.snowflake(payload.id),
    applicationId: bot.transformers.snowflake(payload.application_id),
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    name: payload.name,
    nameLocalizations: payload.name_localizations ?? undefined,
    description: payload.description,
    descriptionLocalizations: payload.description_localizations ?? undefined,
    defaultMemberPermissions: payload.default_member_permissions
      ? bot.transformers.snowflake(payload.default_member_permissions)
      : undefined,
    dmPermission: payload.dm_permission ?? false,
    type: payload.type,
    version: payload.version,

    options: payload.options?.map((option) => bot.transformers.applicationCommandOption(bot, option)),
  };

  return applicationCommand as Optionalize<typeof applicationCommand>;
}

export interface ApplicationCommand extends ReturnType<typeof transformApplicationCommand> {}
