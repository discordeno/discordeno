import type { DiscordLobby, DiscordLobbyInvite, DiscordLobbyMember, DiscordLobbyMessage } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { ToggleBitfield } from './toggles/ToggleBitfield.js';
import type { Lobby, LobbyInvite, LobbyMember, LobbyMessage } from './types.js';

export function transformLobby(bot: Bot, payload: DiscordLobby): Lobby {
  const props = bot.transformers.desiredProperties.lobby;
  const lobby = {} as SetupDesiredProps<Lobby, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.id && payload.id) lobby.id = bot.transformers.snowflake(payload.id);
  if (props.applicationId && payload.application_id) lobby.applicationId = bot.transformers.snowflake(payload.application_id);
  if (props.metadata && payload.metadata) lobby.metadata = payload.metadata;
  if (props.members && payload.members) lobby.members = payload.members.map((member) => bot.transformers.lobbyMember(bot, member));
  if (props.linkedChannel && payload.linked_channel) lobby.linkedChannel = bot.transformers.channel(bot, payload.linked_channel);

  return bot.transformers.customizers.lobby(bot, payload, lobby);
}

export function transformLobbyMember(bot: Bot, payload: DiscordLobbyMember): LobbyMember {
  const props = bot.transformers.desiredProperties.lobbyMember;
  const lobbyMember = {} as SetupDesiredProps<LobbyMember, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.id && payload.id) lobbyMember.id = bot.transformers.snowflake(payload.id);
  if (props.metadata && payload.metadata) lobbyMember.metadata = payload.metadata;
  if (props.flags && payload.flags) lobbyMember.flags = new ToggleBitfield(payload.flags);

  return bot.transformers.customizers.lobbyMember(bot, payload, lobbyMember);
}

export function transformLobbyMessage(bot: Bot, payload: DiscordLobbyMessage): LobbyMessage {
  const props = bot.transformers.desiredProperties.lobbyMessage;
  const lobbyMessage = {} as SetupDesiredProps<LobbyMessage, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.id && payload.id) lobbyMessage.id = bot.transformers.snowflake(payload.id);
  if (props.type && payload.type) lobbyMessage.type = payload.type;
  if (props.content && payload.content) lobbyMessage.content = payload.content;
  if (props.lobbyId && payload.lobby_id) lobbyMessage.lobbyId = bot.transformers.snowflake(payload.lobby_id);
  if (props.channelId && payload.channel_id) lobbyMessage.channelId = bot.transformers.snowflake(payload.channel_id);
  if (props.author && payload.author) lobbyMessage.author = bot.transformers.user(bot, payload.author);
  if (props.metadata && payload.metadata) lobbyMessage.metadata = payload.metadata;
  if (props.moderationMetadata && payload.moderation_metadata) lobbyMessage.moderationMetadata = payload.moderation_metadata;
  if (props.flags && payload.flags) lobbyMessage.flags = new ToggleBitfield(payload.flags);
  if (props.applicationId && payload.application_id) lobbyMessage.applicationId = bot.transformers.snowflake(payload.application_id);

  return bot.transformers.customizers.lobbyMessage(bot, payload, lobbyMessage);
}

export function transformLobbyInvite(bot: Bot, payload: DiscordLobbyInvite): LobbyInvite {
  const props = bot.transformers.desiredProperties.lobbyInvite;
  const lobbyInvite = {} as SetupDesiredProps<LobbyInvite, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.code && payload.code) lobbyInvite.code = payload.code;

  return bot.transformers.customizers.lobbyInvite(bot, payload, lobbyInvite);
}
