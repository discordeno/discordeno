import { BotWithCache } from "../../deps.ts";
import { createChannel } from "./createChannel.ts";
import { deleteChannel } from "./deleteChannel.ts";
import { deleteChannelPermissionOverride } from "./deleteChannelPermissionOverride.ts";
import { editChannel } from "./editChannel.ts";
import { editChannelPermissionOverrides } from "./editChannelPermissionOverrides.ts";
import { followAnnouncementChannel } from "./followAnnouncementChannel.ts";
import { forums } from "./forums/mod.ts";
import { getChannelWebhooks } from "./getChannelWebhooks.ts";
import { stages } from "./stages/mod.ts";
import { swapChannels } from "./swapChannels.ts";
import { threads } from "./threads/mod.ts";

export function channels(bot: BotWithCache) {
  forums(bot);
  stages(bot);
  threads(bot);

  createChannel(bot);
  deleteChannel(bot);
  deleteChannelPermissionOverride(bot);
  editChannel(bot);
  editChannelPermissionOverrides(bot);
  followAnnouncementChannel(bot);
  getChannelWebhooks(bot);
  swapChannels(bot);
}
