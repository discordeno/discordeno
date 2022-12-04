import { DiscordApplicationCommand, Optionalize } from '@discordeno/types'
import type { RestManager } from '../restManager.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformApplicationCommand (
  rest: RestManager,
  payload: DiscordApplicationCommand
) {
  const applicationCommand = {
    id: rest.transformers.snowflake(payload.id),
    applicationId: rest.transformers.snowflake(payload.application_id),
    guildId: payload.guild_id
      ? rest.transformers.snowflake(payload.guild_id)
      : undefined,
    name: payload.name,
    nameLocalizations: payload.name_localizations ?? undefined,
    description: payload.description,
    descriptionLocalizations: payload.description_localizations ?? undefined,
    defaultMemberPermissions: payload.default_member_permissions
      ? rest.transformers.snowflake(payload.default_member_permissions)
      : undefined,
    dmPermission: payload.dm_permission ?? false,
    type: payload.type,
    version: payload.version,

    options: payload.options?.map((option) =>
      rest.transformers.applicationCommandOption(rest, option)
    )
  }

  return applicationCommand as Optionalize<typeof applicationCommand>
}

export interface ApplicationCommand
  extends ReturnType<typeof transformApplicationCommand> {}
