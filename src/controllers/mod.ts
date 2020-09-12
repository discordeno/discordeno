import {
  handleInternalChannelCreate,
  handleInternalChannelDelete,
  handleInternalChannelUpdate,
} from "./channels.ts";
import {
  handleInternalGuildCreate,
  handleInternalGuildDelete,
  handleInternalGuildUpdate,
} from "./guilds.ts";
import { handleInternalReady } from "./misc.ts";

export let controllers = {
  READY: handleInternalReady,
  CHANNEL_CREATE: handleInternalChannelCreate,
  CHANNEL_DELETE: handleInternalChannelDelete,
  CHANNEL_UPDATE: handleInternalChannelUpdate,
  GUILD_CREATE: handleInternalGuildCreate,
  GUILD_DELETE: handleInternalGuildDelete,
  GUILD_UPDATE: handleInternalGuildUpdate,
};
