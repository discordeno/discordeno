import { ChannelTypes } from "../../mod.ts";
import { assertExists, assertNotEquals } from "../deps.ts";
import { loadBot } from "../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../utils.ts";

Deno.test({
  name: "[stage] Create a stage instance",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    const stage = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, {
      name: "createinstance",
      type: ChannelTypes.GuildStageVoice,
    });
    const instance = await bot.helpers.createStageInstance({ channelId: stage.id, topic: "test it" });
    assertExists(instance);

    await t.step("[stage] Edit a stage instance", async () => {
      const edited = await bot.helpers.editStageInstance(stage.id, {
        topic: "edited",
      });
      assertNotEquals(edited.topic, stage.topic);
    });

    await t.step("[stage] Delete a stage instance", async () => {
      await bot.helpers.deleteStageInstance(stage.id);
    });

    await bot.helpers.deleteChannel(stage.id);
  },
});
