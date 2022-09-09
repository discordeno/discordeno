import { BotWithCache } from "../../deps.ts";
import createChannel from "./createChannel.ts";
import deleteChannel from "./deleteChannel.ts";
import deleteChannelPermissionOverride from "./deleteChannelPermissionOverride.ts";
import editChannel from "./editChannel.ts";
import editChannelPermissionOverrides from "./editChannelPermissionOverrides.ts";
import followAnnouncementChannel from "./followAnnouncementChannel.ts";
import setupForumPermChecks from "./forums/mod.ts";
import getChannelWebhooks from "./getChannelWebhooks.ts";
import setupStagePermChecks from "./stage.ts";
import swapChannels from "./swapChannels.ts";
import setupThreadPermChecks from "./threads/mod.ts";

export default function setupChannelPermChecks(bot: BotWithCache) {
  createChannel(bot);
  setupThreadPermChecks(bot);
  setupForumPermChecks(bot);
  setupStagePermChecks(bot);
  deleteChannel(bot);
  deleteChannelPermissionOverride(bot);
  editChannel(bot);
  editChannelPermissionOverrides(bot);
  followAnnouncementChannel(bot);
  getChannelWebhooks(bot);
  swapChannels(bot);
}
