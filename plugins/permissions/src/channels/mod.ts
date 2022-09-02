import { BotWithCache } from "../../deps.ts";
import createChannel from "./createChannel.ts";
import deleteChannel from "./deleteChannel.ts";
import deleteChannelOverwrite from "./deleteChannelOverwrite.ts";
import editChannel from "./editChannel.ts";
import editChannelOverwrite from "./editChannelOverwrite.ts";
import followChannel from "./followChannel.ts";
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
  deleteChannelOverwrite(bot);
  editChannel(bot);
  editChannelOverwrite(bot);
  followChannel(bot);
  getChannelWebhooks(bot);
  swapChannels(bot);
}
