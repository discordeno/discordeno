import { DiscordApplicationCommand } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import { ApplicationCommand } from '../applicationCommand.js'

export function transformApplicationCommandToDiscordApplicationCommand (
  rest: RestManager,
  payload: ApplicationCommand
): DiscordApplicationCommand {
  return {
    id: rest.transformers.reverse.snowflake(payload.id),
    type: payload.type,
    application_id: rest.transformers.reverse.snowflake(payload.applicationId),
    guild_id: payload.guildId
      ? rest.transformers.reverse.snowflake(payload.guildId)
      : undefined,
    name: payload.name,
    name_localizations: payload.nameLocalizations,
    description: payload.description,
    description_localizations: payload.descriptionLocalizations,
    options: payload.options?.map((option) =>
      rest.transformers.applicationCommandOption(rest, option)
    ),
    default_member_permissions: payload.defaultMemberPermissions
      ? rest.transformers.reverse.snowflake(payload.defaultMemberPermissions)
      : null,
    dm_permission: payload.dmPermission,
    version: payload.version
  }
}
