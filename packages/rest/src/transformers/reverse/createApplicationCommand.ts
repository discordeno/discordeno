import { DiscordCreateApplicationCommand } from '@discordeno/types'
import { calculateBits } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import {
  CreateApplicationCommand,
  isContextApplicationCommand
} from '../../types.js'

export function transformCreateApplicationCommandToDiscordCreateApplicationCommand (
  rest: RestManager,
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
        ? calculateBits(payload.defaultMemberPermissions)
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
      rest.transformers.reverse.applicationCommandOption(rest, option)
    ),
    default_member_permissions: payload.defaultMemberPermissions
      ? calculateBits(payload.defaultMemberPermissions)
      : null,
    dm_permission: payload.dmPermission
  }
}
