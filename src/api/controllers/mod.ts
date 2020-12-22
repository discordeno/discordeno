import {
  handleInternalGuildBanAdd,
  handleInternalGuildBanRemove,
} from "./bans.ts";
import {
  handleInternalChannelCreate,
  handleInternalChannelDelete,
  handleInternalChannelUpdate,
} from "./channels.ts";
import {
  handleInternalGuildCreate,
  handleInternalGuildDelete,
  handleInternalGuildEmojisUpdate,
  handleInternalGuildUpdate,
} from "./guilds.ts";
import {
  handleInternalGuildMemberAdd,
  handleInternalGuildMemberRemove,
  handleInternalGuildMembersChunk,
  handleInternalGuildMemberUpdate,
} from "./members.ts";
import {
  handleInternalMessageCreate,
  handleInternalMessageDelete,
  handleInternalMessageDeleteBulk,
  handleInternalMessageUpdate,
} from "./messages.ts";
import {
  handleInternalPresenceUpdate,
  handleInternalReady,
  handleInternalTypingStart,
  handleInternalUserUpdate,
  handleInternalVoiceStateUpdate,
  handleInternalWebhooksUpdate,
} from "./misc.ts";
import {
  handleInternalMessageReactionAdd,
  handleInternalMessageReactionRemove,
  handleInternalMessageReactionRemoveAll,
  handleInternalMessageReactionRemoveEmoji,
} from "./reactions.ts";
import {
  handleInternalGuildRoleCreate,
  handleInternalGuildRoleDelete,
  handleInternalGuildRoleUpdate,
} from "./roles.ts";

export let controllers = {
  READY: handleInternalReady,
  CHANNEL_CREATE: handleInternalChannelCreate,
  CHANNEL_DELETE: handleInternalChannelDelete,
  CHANNEL_UPDATE: handleInternalChannelUpdate,
  GUILD_CREATE: handleInternalGuildCreate,
  GUILD_DELETE: handleInternalGuildDelete,
  GUILD_UPDATE: handleInternalGuildUpdate,
  GUILD_BAN_ADD: handleInternalGuildBanAdd,
  GUILD_BAN_REMOVE: handleInternalGuildBanRemove,
  GUILD_EMOJIS_UPDATE: handleInternalGuildEmojisUpdate,
  GUILD_MEMBER_ADD: handleInternalGuildMemberAdd,
  GUILD_MEMBER_REMOVE: handleInternalGuildMemberRemove,
  GUILD_MEMBER_UPDATE: handleInternalGuildMemberUpdate,
  GUILD_MEMBERS_CHUNK: handleInternalGuildMembersChunk,
  GUILD_ROLE_CREATE: handleInternalGuildRoleCreate,
  GUILD_ROLE_DELETE: handleInternalGuildRoleDelete,
  GUILD_ROLE_UPDATE: handleInternalGuildRoleUpdate,
  MESSAGE_CREATE: handleInternalMessageCreate,
  MESSAGE_DELETE: handleInternalMessageDelete,
  MESSAGE_DELETE_BULK: handleInternalMessageDeleteBulk,
  MESSAGE_UPDATE: handleInternalMessageUpdate,
  MESSAGE_REACTION_ADD: handleInternalMessageReactionAdd,
  MESSAGE_REACTION_REMOVE: handleInternalMessageReactionRemove,
  MESSAGE_REACTION_REMOVE_ALL: handleInternalMessageReactionRemoveAll,
  MESSAGE_REACTION_REMOVE_EMOJI: handleInternalMessageReactionRemoveEmoji,
  PRESENCE_UPDATE: handleInternalPresenceUpdate,
  TYPING_START: handleInternalTypingStart,
  USER_UPDATE: handleInternalUserUpdate,
  VOICE_STATE_UPDATE: handleInternalVoiceStateUpdate,
  WEBHOOKS_UPDATE: handleInternalWebhooksUpdate,
};

export type Controllers = typeof controllers;

export function updateControllers(newControllers: Controllers) {
  controllers = {
    ...controllers,
    ...newControllers,
  };
}
