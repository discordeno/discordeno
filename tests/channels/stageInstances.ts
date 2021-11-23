import { ChannelTypes } from "../../src/types/channels/channelTypes.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../constants.ts";
import { assertNotEquals, assertExists } from "../deps.ts";
import { bot } from "../mod.ts";

Deno.test("[stage] Create a stage instance", async (t) => {
  const stage = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
    name: "instance",
    type: ChannelTypes.GuildStageVoice,
  });
  const instance = await bot.helpers.createStageInstance(stage.id, "test it");
  assertExists(instance);

  await t.step("[stage] Edit a stage instance", async () => {
      const edited = await bot.helpers.updateStageInstance(stage.id, {
          topic: "edited"
      })
      assertNotEquals(edited.topic, stage.topic);
  })

  await t.step("[stage] Delete a stage instance", async () => {
    await bot.helpers.deleteStageInstance(stage.id);
  });
});
