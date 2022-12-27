import type { DiscordApplicationCommand, Optionalize } from '@discordeno/types'
import type { Client } from '../client.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformApplicationCommand (
  client: Client,
  payload: DiscordApplicationCommand
) {
  const applicationCommand = {
    id: client.transformers.snowflake(payload.id),
    applicationId: client.transformers.snowflake(payload.application_id),
    guildId: payload.guild_id
      ? client.transformers.snowflake(payload.guild_id)
      : undefined,
    name: payload.name,
    nameLocalizations: payload.name_localizations ?? undefined,
    description: payload.description,
    descriptionLocalizations: payload.description_localizations ?? undefined,
    defaultMemberPermissions: payload.default_member_permissions
      ? client.transformers.snowflake(payload.default_member_permissions)
      : undefined,
    dmPermission: payload.dm_permission ?? false,
    type: payload.type,
    version: payload.version,

    options: payload.options?.map((option) =>
      client.transformers.applicationCommandOption(client, option)
    )
  }

  return applicationCommand as Optionalize<typeof applicationCommand>
}

export interface ApplicationCommand
  extends ReturnType<typeof transformApplicationCommand> {}
