import { handleChannelCreate } from "./channels/CHANNEL_CREATE.ts";
import { handleChannelDelete } from "./channels/CHANNEL_DELETE.ts";
import { handleChannelPinsUpdate } from "./channels/CHANNEL_PINS_UPDATE.ts";
import { handleChannelUpdate } from "./channels/CHANNEL_UPDATE.ts";
import { handleStageInstanceCreate } from "./channels/STAGE_INSTANCE_CREATE.ts";
import { handleStageInstanceUpdate } from "./channels/STAGE_INSTANCE_UPDATE.ts";
import { handleStageInstanceDelete } from "./channels/STAGE_INSTANCE_DELETE.ts";
import { handleThreadCreate } from "./channels/THREAD_CREATE.ts";
import { handleThreadDelete } from "./channels/THREAD_DELETE.ts";
import { handleThreadListSync } from "./channels/THREAD_LIST_SYNC.ts";
import { handleThreadMembersUpdate } from "./channels/THREAD_MEMBERS_UPDATE.ts";
import { handleThreadMemberUpdate } from "./channels/THREAD_MEMBER_UPDATE.ts";
import { handleThreadUpdate } from "./channels/THREAD_UPDATE.ts";
import { handleGuildEmojisUpdate } from "./emojis/GUILD_EMOJIS_UPDATE.ts";
import { handleGuildBanAdd } from "./guilds/GUILD_BAN_ADD.ts";
import { handleGuildBanRemove } from "./guilds/GUILD_BAN_REMOVE.ts";
import { handleGuildCreate } from "./guilds/GUILD_CREATE.ts";
import { handleGuildDelete } from "./guilds/GUILD_DELETE.ts";
import { handleGuildIntegrationsUpdate } from "./guilds/GUILD_INTEGRATIONS_UPDATE.ts";
import { handleGuildUpdate } from "./guilds/GUILD_UPDATE.ts";
import { handleIntegrationCreate } from "./integrations/INTEGRATION_CREATE.ts";
import { handleIntegrationDelete } from "./integrations/INTEGRATION_DELETE.ts";
import { handleIntegrationUpdate } from "./integrations/INTEGRATION_UPDATE.ts";
import { handleInteractionCreate } from "./interactions/INTERACTION_CREATE.ts";
import { handleInviteCreate } from "./invites/INVITE_CREATE.ts";
import { handleGuildMembersChunk } from "./members/GUILD_MEMBERS_CHUNK.ts";
import { handleGuildMemberAdd } from "./members/GUILD_MEMBER_ADD.ts";
import { handleGuildMemberRemove } from "./members/GUILD_MEMBER_REMOVE.ts";
import { handleGuildMemberUpdate } from "./members/GUILD_MEMBER_UPDATE.ts";
import { handleMessageCreate } from "./messages/MESSAGE_CREATE.ts";
import { handleMessageDelete } from "./messages/MESSAGE_DELETE.ts";
import { handleMessageDeleteBulk } from "./messages/MESSAGE_DELETE_BULK.ts";
import { handleMessageReactionAdd } from "./messages/MESSAGE_REACTION_ADD.ts";
import { handleMessageReactionRemove } from "./messages/MESSAGE_REACTION_REMOVE.ts";
import { handleMessageReactionRemoveAll } from "./messages/MESSAGE_REACTION_REMOVE_ALL.ts";
import { handleMessageReactionRemoveEmoji } from "./messages/MESSAGE_REACTION_REMOVE_EMOJI.ts";
import { handleMessageUpdate } from "./messages/MESSAGE_UPDATE.ts";
import { handlePresenceUpdate } from "./misc/PRESENCE_UPDATE.ts";
import { handleReady } from "./misc/READY.ts";
import { handleTypingStart } from "./misc/TYPING_START.ts";
import { handleUserUpdate } from "./misc/USER_UPDATE.ts";
import { handleGuildRoleCreate } from "./roles/GUILD_ROLE_CREATE.ts";
import { handleGuildRoleDelete } from "./roles/GUILD_ROLE_DELETE.ts";
import { handleGuildRoleUpdate } from "./roles/GUILD_ROLE_UPDATE.ts";
import { handleVoiceServerUpdate } from "./voice/VOICE_SERVER_UPDATE.ts";
import { handleVoiceStateUpdate } from "./voice/VOICE_STATE_UPDATE.ts";
import { handleWebhooksUpdate } from "./webhooks/WEBHOOKS_UPDATE.ts";
import { handleGuildLoaded } from "./guilds/GUILD_LOADED_DD.ts";

export {
  handleChannelCreate,
  handleChannelDelete,
  handleChannelPinsUpdate,
  handleChannelUpdate,
  handleGuildBanAdd,
  handleGuildBanRemove,
  handleGuildCreate,
  handleGuildDelete,
  handleGuildEmojisUpdate,
  handleGuildIntegrationsUpdate,
  handleGuildMemberAdd,
  handleGuildMemberRemove,
  handleGuildMembersChunk,
  handleGuildMemberUpdate,
  handleGuildRoleCreate,
  handleGuildRoleDelete,
  handleGuildRoleUpdate,
  handleGuildUpdate,
  handleIntegrationCreate,
  handleIntegrationDelete,
  handleIntegrationUpdate,
  handleInteractionCreate,
  handleInviteCreate,
  handleMessageCreate,
  handleMessageDelete,
  handleMessageDeleteBulk,
  handleMessageReactionAdd,
  handleMessageReactionRemove,
  handleMessageReactionRemoveAll,
  handleMessageReactionRemoveEmoji,
  handleMessageUpdate,
  handlePresenceUpdate,
  handleReady,
  handleStageInstanceCreate,
  handleStageInstanceDelete,
  handleStageInstanceUpdate,
  handleThreadCreate,
  handleThreadDelete,
  handleThreadListSync,
  handleThreadMembersUpdate,
  handleThreadMemberUpdate,
  handleThreadUpdate,
  handleTypingStart,
  handleUserUpdate,
  handleVoiceServerUpdate,
  handleVoiceStateUpdate,
  handleWebhooksUpdate,
};

export const handlers = {
  
};
