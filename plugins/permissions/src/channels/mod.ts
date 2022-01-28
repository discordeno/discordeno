import { BotWithCache } from "../../deps.ts";
import setupThreadPermChecks from "./threads/mod.ts";
import setupStagePermChecks from "./stage.ts";
import deleteChannel from "./deleteChannel.ts";
import deleteChannelOverwrite from "./deleteChannelOverwrite.ts";
import editChannel from "./editChannel.ts";
import editChannelOverwrite from "./editChannelOverwrite.ts";
import followChannel from "./followChannel.ts";
import getChannelWebhooks from "./getChannelWebhooks.ts";
import swapChannels from "./swapChannels.ts";

export default function setupChannelPermChecks(bot: BotWithCache) {
    setupThreadPermChecks(bot);
    setupStagePermChecks(bot);
    deleteChannel(bot);
    deleteChannelOverwrite(bot);
    editChannel(bot);
    editChannelOverwrite(bot);
    followChannel(bot);
    getChannelWebhooks(bot);
    swapChannels(bot);
}