import type { DiscordCreateApplicationCommand } from '@discordeno/types'
import type { Client } from '../../client.js'
import type { CreateApplicationCommand } from '../../types.js'
import { isContextApplicationCommand } from '../../types.js'

export function transformCreateApplicationCommandToDiscordCreateApplicationCommand (
  client: Client,
  payload: CreateApplicationCommand
): DiscordCreateApplicationCommand {
  if (isContextApplicationCommand(payload)) {
    return {
      name: payload.name,
      name_localizations: payload.nameLocalizations,
      description: '',
      description_localizations: {},
      type: payload.type,
      default_member_permissions: payload.defaultMemberPermissions
        ? client.utils.calculateBits(payload.defaultMemberPermissions)
        : null,
      dm_permission: payload.dmPermission
    }
  }

  return {
    name: payload.name,
    name_localizations: payload.nameLocalizations,
    description: payload.description,
    description_localizations: payload.descriptionLocalizations,
    type: payload.type,
    options: payload.options?.map((option) =>
      client.transformers.reverse.applicationCommandOption(client, option)
    ),
    default_member_permissions: payload.defaultMemberPermissions
      ? client.utils.calculateBits(payload.defaultMemberPermissions)
      : null,
    dm_permission: payload.dmPermission
  }
}
