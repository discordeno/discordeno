import type { AllowedMentions, Bot, DiscordAllowedMentions } from '../../index.js'

export function transformAllowedMentionsToDiscordAllowedMentions(_bot: Bot, mentions: AllowedMentions): DiscordAllowedMentions {
  return {
    parse: mentions.parse,
    replied_user: mentions.repliedUser,
    users: mentions.users?.map((id) => id.toString()),
    roles: mentions.roles?.map((id) => id.toString()),
  }
}
