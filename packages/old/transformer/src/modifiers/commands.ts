import type { CreateApplicationCommand, DiscordCreateApplicationCommand, MakeRequired } from '@discordeno/types'
import { calculateBits } from '@discordeno/utils'
import TRANSFORMERS from '../index.js'

export function makeCreateCommandBody (payload: CreateApplicationCommand): MakeRequired<DiscordCreateApplicationCommand, keyof Omit<DiscordCreateApplicationCommand, 'version'>> {
  return {
    name: payload.name,
    type: payload.type,
    nsfw: payload.nsfw,
    description: payload.description,

    dm_permission: payload.dmPermission,
    name_localizations: payload.nameLocalizations,
    description_localizations: payload.descriptionLocalizations,

    options: payload.options?.map(option => TRANSFORMERS.commandPermission.option(option)),
    default_member_permissions: payload.defaultMemberPermissions
      ? calculateBits(payload.defaultMemberPermissions)
      // TODO: why is this null and not undefined
      : null
  }
}
