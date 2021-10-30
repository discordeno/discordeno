import { TOKEN } from "../configs.ts";
import { createBot, createEventHandlers, DiscordChannelTypes, startBot, stopBot } from "../mod.ts";
import { assertEquals, assertExists } from "./deps.ts";
import { deleteMessageWithReasonTest, deleteMessageWithoutReasonTest } from "./helpers/messages/deleteMessage.ts";
import { editMessageTest } from "./helpers/messages/editMessage.ts";
import { delayUntil } from "./utils.ts";
import {
  sendMessageWithComponents,
  sendMessageWithEmbedsTest,
  sendMessageWithTextTest
} from "./helpers/messages/sendMessage.ts";

// CONDUCT LOCAL TESTS FIRST BEFORE RUNNING API TEST
import "./local.ts";

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
      // CONDUCT ALL TESTS RELATED TO A MESSAGE HERE
      await Promise.all([
        t.step({
          name: "[message] send message with text",
          fn: async (t) => {
            await sendMessageWithTextTest(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] send message with embeds",
          fn: async (t) => {
            await sendMessageWithEmbedsTest(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] send message with components",
          fn: async (t) => {
            await sendMessageWithComponents(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
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
          name: "[message] edit message",
          fn: async (t) => {
            await editMessageTest(bot, channel.id, t);
          },
          ...sanitizeMode,
        })
      ]);
    });
  });

  await stopBot(bot);
});
