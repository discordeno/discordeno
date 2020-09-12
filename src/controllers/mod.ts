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
import { handleInternalReady } from "./misc.ts";

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
};
