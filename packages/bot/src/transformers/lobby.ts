import type { DiscordLobby, DiscordLobbyMember } from '@discordeno/types';
import type { Bot } from '../bot.js';
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js';
import { callCustomizer } from '../transformers.js';
import { ToggleBitfield } from './toggles/ToggleBitfield.js';
import type { Lobby, LobbyMember } from './types.js';

export function transformLobby(bot: Bot, payload: Partial<DiscordLobby>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.lobby;
  const lobby = {} as SetupDesiredProps<Lobby, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.id && payload.id) lobby.id = bot.transformers.snowflake(payload.id);
  if (props.applicationId && payload.application_id) lobby.applicationId = bot.transformers.snowflake(payload.application_id);
  if (props.metadata && payload.metadata) lobby.metadata = payload.metadata;
  if (props.members && payload.members) lobby.members = payload.members.map((member) => bot.transformers.lobbyMember(bot, member));
  if (props.linkedChannel && payload.linked_channel) lobby.linkedChannel = bot.transformers.channel(bot, payload.linked_channel);

  return callCustomizer('lobby', bot, payload, lobby, {
    partial: extra?.partial ?? false,
  });
}

export function transformLobbyMember(bot: Bot, payload: Partial<DiscordLobbyMember>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.lobbyMember;
  const lobbyMember = {} as SetupDesiredProps<LobbyMember, TransformersDesiredProperties, DesiredPropertiesBehavior>;

  if (props.id && payload.id) lobbyMember.id = bot.transformers.snowflake(payload.id);
  if (props.metadata && payload.metadata) lobbyMember.metadata = payload.metadata;
  if (props.flags && payload.flags) lobbyMember.flags = new ToggleBitfield(payload.flags);

  return callCustomizer('lobbyMember', bot, payload, lobbyMember, {
    partial: extra?.partial ?? false,
  });
}
