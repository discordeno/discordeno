import { assertEquals, assertExists, assertNotEquals } from "../deps.ts";
import { bot, guild } from "../mod.ts";

Deno.test("[thread] Start a thread", async (t) => {
  const channel = await bot.helpers.createChannel(guild.id, { name: "threads" });
  const message = await bot.helpers.sendMessage(channel.id, { content: "thread message" });
  const thread = await bot.helpers.startThreadWithMessage(channel.id, message.id, {
    reason: "idk",
    rateLimitPerUser: 5,
    name: "tread carefully",
    autoArchiveDuration: 60,
  });

  const threadMessage = await bot.helpers.sendMessage(thread.id, { content: "message in a bottle" });
  assertExists(threadMessage);

  await t.step("[thread] leave a thread", async () => {
    await bot.helpers.leaveThread(thread.id);
  });

  await t.step("[thread] join a thread", async () => {
    await bot.helpers.joinThread(thread.id);
  });

  await t.step("[thread] Get active threads", async () => {
    const activeThreads = await bot.helpers.getActiveThreads(guild.id);
    assertEquals(Boolean(activeThreads.threads.size), true);
    assertEquals(Boolean(activeThreads.members.size), true);
  });

  await t.step("[thread] Get archived threads", async (t) => {
    const archived = await bot.helpers.getArchivedThreads(channel.id); 
    assertEquals(archived.threads.size, 0);
    assertEquals(archived.members.size, 0);

    await t.step("[thread] Edit and archive a thread", async () => {
      const edited = await bot.helpers.editChannel(thread.id, {
        archived: true,
        name: "new name",
        autoArchiveDuration: 1440,
        locked: !thread.locked,
        rateLimitPerUser: (thread.rateLimitPerUser || 0) + 1,
      });
      assertNotEquals(thread.archived, edited.archived);
      assertNotEquals(thread.name, edited.name);
      assertNotEquals(thread.rateLimitPerUser, edited.rateLimitPerUser);
      assertNotEquals(thread.autoArchiveDuration, edited.autoArchiveDuration);
      assertNotEquals(thread.locked, edited.locked);
    });

    const archivedNow = await bot.helpers.getArchivedThreads(channel.id);
    assertEquals(Boolean(archivedNow.threads.size), true);
    assertEquals(Boolean(archivedNow.members.size), true);
  });

  await t.step("[thread] Delete a thread", async () => {
    await bot.helpers.deleteChannel(thread.id);
  });
});
