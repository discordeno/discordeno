import { AllowedMentions, DiscordAllowedMentions } from '@discordeno/types'
import type { RestManager } from '../../restManager'

export function transformAllowedMentionsToDiscordAllowedMentions (
  rest: RestManager,
  mentions: AllowedMentions
): DiscordAllowedMentions {
  return {
    parse: mentions.parse,
    replied_user: mentions.repliedUser,
    users: mentions.users?.map((id) => id.toString()),
    roles: mentions.roles?.map((id) => id.toString())
  }
}
