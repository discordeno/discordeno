import type { DiscordApplicationCommand } from '@discordeno/types'
import type { Client } from '../../client.js'
import type { ApplicationCommand } from '../applicationCommand.js'

export function transformApplicationCommandToDiscordApplicationCommand (
  client: Client,
  payload: ApplicationCommand
): DiscordApplicationCommand {
  return {
    id: client.transformers.reverse.snowflake(payload.id),
    type: payload.type,
    application_id: client.transformers.reverse.snowflake(
      payload.applicationId
    ),
    guild_id: payload.guildId
      ? client.transformers.reverse.snowflake(payload.guildId)
      : undefined,
    name: payload.name,
    name_localizations: payload.nameLocalizations,
    description: payload.description,
    description_localizations: payload.descriptionLocalizations,
    options: payload.options?.map((option) =>
      client.transformers.applicationCommandOption(client, option)
    ),
    default_member_permissions: payload.defaultMemberPermissions
      ? client.transformers.reverse.snowflake(payload.defaultMemberPermissions)
      : null,
    dm_permission: payload.dmPermission,
    version: payload.version
  }
}
