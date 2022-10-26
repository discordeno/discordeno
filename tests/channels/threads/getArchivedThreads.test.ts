import { assertEquals, assertExists, assertNotEquals } from "../../deps.ts";
import { loadBot } from "../../mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../../utils.ts";

Deno.test({
  name: "[thread] Get archived threads",
  ignore: Deno.env.get("TEST_ENV") === "UNIT",
  async fn(t) {
    const bot = loadBot();
    const channel = await bot.helpers.createChannel(CACHED_COMMUNITY_GUILD_ID, { name: "threads" });
    const message = await bot.helpers.sendMessage(channel.id, { content: "thread message" });
    const thread = await bot.helpers.startThreadWithMessage(channel.id, message.id, {
      reason: "idk",
      rateLimitPerUser: 5,
      name: "tread carefully",
      autoArchiveDuration: 60,
    });

    const archived = await bot.helpers.getPublicArchivedThreads(channel.id);
    assertEquals(archived.threads.size, 0);
    assertEquals(archived.members.size, 0);

    const threadMessage = await bot.helpers.sendMessage(thread.id, { content: "message in a bottle" });
    assertExists(threadMessage.id);

    const edited = await bot.helpers.editChannel(thread.id, {
      archived: true,
    });
    assertNotEquals(thread.archived, edited.archived);

    const archivedNow = await bot.helpers.getPublicArchivedThreads(channel.id);
    assertEquals(Boolean(archivedNow.threads.size), true);
    assertEquals(Boolean(archivedNow.members.size), true);

    await bot.helpers.deleteChannel(channel.id);
  },
});
