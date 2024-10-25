import {
  ApplicationCommandTypes,
  type CreateApplicationCommand,
  type CreateContextApplicationCommand,
  type DiscordInviteCreate,
  type DiscordInviteMetadata,
  type GetMessagesAfter,
  type GetMessagesAround,
  type GetMessagesBefore,
  type GetMessagesLimit,
  type GetMessagesOptions,
} from '@discordeno/types'
import { hasProperty } from './utils.js'

export function isGetMessagesAfter(options: GetMessagesOptions): options is GetMessagesAfter {
  return hasProperty(options, 'after')
}

export function isGetMessagesBefore(options: GetMessagesOptions): options is GetMessagesBefore {
  return hasProperty(options, 'before')
}

export function isGetMessagesAround(options: GetMessagesOptions): options is GetMessagesAround {
  return hasProperty(options, 'around')
}

export function isGetMessagesLimit(options: GetMessagesOptions): options is GetMessagesLimit {
  return hasProperty(options, 'limit')
}

export function isInviteWithMetadata(options: DiscordInviteCreate | DiscordInviteMetadata): options is DiscordInviteMetadata {
  return !hasProperty(options, 'channel_id')
}

export function isContextApplicationCommand(command: CreateApplicationCommand): command is CreateContextApplicationCommand {
  return command.type === ApplicationCommandTypes.Message || command.type === ApplicationCommandTypes.User
}
