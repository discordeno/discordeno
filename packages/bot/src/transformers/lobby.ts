import type { DiscordLobby, DiscordLobbyMember } from '@discordeno/types'
import type { InternalBot, Lobby, LobbyMember } from '../index.js'

export function transformLobby(bot: InternalBot, payload: DiscordLobby): Lobby {
  const props = bot.transformers.desiredProperties.lobby
  const lobby = {} as Lobby

  if (props.id && payload.id) lobby.id = bot.transformers.snowflake(payload.id)
  if (props.applicationId && payload.application_id) lobby.applicationId = bot.transformers.snowflake(payload.application_id)
  if (props.metadata && payload.metadata) lobby.metadata = payload.metadata
  if (props.members && payload.members) lobby.members = payload.members.map((member) => bot.transformers.lobbyMember(bot, member))
  if (props.linkedChannel && payload.linked_channel) lobby.linkedChannel = bot.transformers.channel(bot, { channel: payload.linked_channel })

  return bot.transformers.customizers.lobby(bot, payload, lobby)
}

export function transformLobbyMember(bot: InternalBot, payload: DiscordLobbyMember): LobbyMember {
  const props = bot.transformers.desiredProperties.lobbyMember
  const lobbyMember = {} as LobbyMember

  if (props.id && payload.id) lobbyMember.id = bot.transformers.snowflake(payload.id)
  if (props.metadata && payload.metadata) lobbyMember.metadata = payload.metadata
  if (props.flags && payload.flags) lobbyMember.flags = payload.flags

  return bot.transformers.customizers.lobbyMember(bot, payload, lobbyMember)
}
