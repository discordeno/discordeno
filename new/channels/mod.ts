// import connectToVoiceChannel from "./connectToVoiceChannel.ts";
// import getChannels from "./getChannels.ts";
import { Channel } from "../../transformers/channel.ts";
import { sanitizeMode } from "../constants.ts";
import createChannel from "./createChannel.ts";
import createStageInstance from "./createStageInstance.ts";
import updateStageInstance from "./updateStageInstance.ts";
import deleteStageInstance from "./deleteStageInstance.ts";
import getChannel from "./getChannel.ts";
import deleteChannel from "./deleteChannel.ts";

Deno.test({
  name: "channels",
  async fn(t) {
    let channels: {
      text: Channel;
      voice: Channel;
      category: Channel;
      news: Channel;
      voiceBitRate: Channel;
      voiceUserLimit: Channel;
      textRateLimitPerUser: Channel;
      stage: Channel;
    };
    await t.step({
      name: "createChannel: Create a channel",
      async fn(t) {
        channels = await createChannel(t);
      },
    });
    // lts20050703: This test fails because the bot is not started.
    // await t.step({
    //   name: "connectToVoiceChannel",
    //   async fn() {
    //     await connectToVoiceChannel(channels.voice);
    //   },
    // });
    await t.step({
      name: "createStageInstance: Create a stage instance",
      async fn() {
        await createStageInstance(channels.stage);
      },
    });
    await t.step({
      name: "updateStageInstance: Update a stage instance",
      async fn() {
        await updateStageInstance(channels.stage);
      },
    });
    await t.step({
      name: "deleteStageInstance: Delete a stage instance",
      async fn() {
        await deleteStageInstance(channels.stage);
      },
    });
    await t.step({
      name: "getChannel: Get a channel",
      fn() {
        Object.values(channels).forEach(async (channel) => {
          await getChannel(channel);
        });
      },
    });
    // lts20050703: This test fails because the bot is not started.
    // await t.step({
    //   name: "getChannels",
    //   async fn() {
    //     await getChannels(Object.values(channels).length);
    //   },
    // });
    await t.step({
      name: "deleteChannel: Delete a channel",
      fn() {
        Object.values(channels).forEach(async (channel) => {
          await deleteChannel(channel);
        });
      },
    });
  },
  sanitizeOps: sanitizeMode.sanitizeOps,
  sanitizeExit: sanitizeMode.sanitizeExit,
  sanitizeResources: sanitizeMode.sanitizeResources,
});
