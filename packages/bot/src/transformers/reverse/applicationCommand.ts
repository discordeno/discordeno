import type { ApplicationCommand, Bot, DiscordApplicationCommand } from '../../index.js'

export function transformApplicationCommandToDiscordApplicationCommand(bot: Bot, payload: ApplicationCommand): DiscordApplicationCommand {
  return {
    id: bot.transformers.reverse.snowflake(payload.id),
    type: payload.type,
    application_id: bot.transformers.reverse.snowflake(payload.applicationId),
    guild_id: payload.guildId ? bot.transformers.reverse.snowflake(payload.guildId) : undefined,
    name: payload.name,
    name_localizations: payload.nameLocalizations,
    description: payload.description,
    description_localizations: payload.descriptionLocalizations,
    options: payload.options?.map((option) => bot.transformers.applicationCommandOption(bot, option)),
    default_member_permissions: payload.defaultMemberPermissions ? bot.transformers.reverse.snowflake(payload.defaultMemberPermissions) : null,
    dm_permission: payload.dmPermission,
    version: payload.version,
  }
}
