import { TOKEN } from "../configs.ts";
import { createBot, createEventHandlers, DiscordChannelTypes, startBot, stopBot } from "../mod.ts";
import { assertEquals, assertExists } from "./deps.ts";
import { deleteMessageWithReasonTest, deleteMessageWithoutReasonTest } from "./helpers/messages/deleteMessage.ts";
import { delayUntil } from "./utils.ts";

// CONDUCT LOCAL TESTS FIRST BEFORE RUNNING API TEST
import "./local.ts";
import { getMessageTest } from "./helpers/messages/getMessage.ts";

Deno.test("[Bot] - Starting Tests", async (t) => {
  // CHANGE TO TRUE WHEN DEBUGGING SANITIZATION ERRORS
  const sanitizeMode = {
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false,
  };

  let startedAt = 0;
  const bot = createBot({
    token: TOKEN || Deno.env.get("DISCORD_TOKEN"),
    // token: Deno.env.get("DISCORD_TOKEN")!,
    // TEST BOT
    botId: 770381961553510451n,
    // DD bot
    // botId: 675412054529540107n,
    events: createEventHandlers({
      ready: () => {
        startedAt = Date.now();
      },
      // debug: console.log,
    }),
    intents: ["Guilds", "GuildMessages"],
    cache: {
      isAsync: false,
    },
  });

  await startBot(bot);

  // Delay the execution to allow READY events to be processed
  await delayUntil(10000, () => Boolean(startedAt));
  console.log("Bot online");

  // DELETE GUILDS IF LESS THAN 10 SERVERS AS SAFETY MEASURE
  if (bot.cache.guilds.size() <= 10) {
    bot.cache.guilds.forEach(async (guild) => {
      if (guild.ownerId === bot.id) await bot.helpers.deleteGuild(guild.id);
    });
  }

  // Delay the execution to allow delete guilds to be processed
  await delayUntil(10000, () => Boolean(startedAt));

  // CREATE ONE GUILD SO WE CAN REUSE LATER TO SAVE RATE LIMITS
  const guild = await bot.helpers.createGuild({ name: "Discordeno Test" });

  // Assertions
  assertExists(guild);
  assertExists(guild.id);

  // Delay the execution to allow GUILD_CREATE event to be processed
  await delayUntil(10000, () => bot.cache.guilds.has(guild.id));

  // FINAL CHECK TO THROW IF MISSING STILL
  if (!bot.cache.guilds.has(guild.id)) {
    throw new Error(`The guild seemed to be created but it was not cached. ${guild.id.toString()}`);
  }

  // CHANNEL TESTS GROUPED
  await t.step("Channel related tests", async (t) => {
    const channel = await bot.helpers.createChannel(guild.id, { name: "Discordeno-test" });

    // Assertions
    assertExists(channel);
    assertEquals(channel.type, DiscordChannelTypes.GuildText);

    // ALL MESSAGE RELATED TESTS THAT DEPEND ON AN EXISTING CHANNEL
    await t.step("Message related tests", async (t) => {
      const message = await bot.helpers.sendMessage(channel.id, "Testing");

      // Assertions
      assertExists(message);

      // Delay the execution to allow MESSAGE_CREATE event to be processed
      await delayUntil(10000, () => bot.cache.messages.has(message.id));

      if (!bot.cache.messages.has(message.id)) {
        throw new Error("The message seemed to be sent but it was not cached.");
      }

      // CONDUCT ALL TESTS RELATED TO A MESSAGE HERE
      await Promise.all([
        t.step({
          name: "[message] delete message without a reason",
          fn: async (t) => {
            await deleteMessageWithoutReasonTest(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] delete message with a reason",
          fn: async (t) => {
            await deleteMessageWithReasonTest(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] fetch a message",
          fn: async (t) => {
            await getMessageTest(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
      ]);
    });
  });

  await stopBot(bot);
});
