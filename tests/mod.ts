// import { TOKEN } from "../configs.ts";
import { Bot, createBot, createEventHandlers, DiscordChannelTypes, startBot, stopBot } from "../mod.ts";
import { assertEquals, assertExists } from "./deps.ts";
import { delayUntil } from "./utils.ts";

Deno.test("[Bot] - Starting Tests", async (t) => {
  const bot = createBot({
    // token: TOKEN || Deno.env.get("DISCORD_TOKEN"),
    token: Deno.env.get("DISCORD_TOKEN")!,
    botId: 675412054529540107n,
    events: createEventHandlers({
      // debug: console.log,
    }),
    intents: [],
  }) as Bot;

  await startBot(bot);
  // Delay the execution to allow READY events to be processed
  await delayUntil(3000, () => true);
  console.log("Bot online");

  // CREATE ONE GUILD SO WE CAN REUSE LATER TO SAVE RATE LIMITS
  const guild = await bot.helpers.createGuild(bot, { name: "Discordeno Test" });

  // Assertions
  assertExists(guild);
  assertExists(guild.id);

  // Delay the execution to allow GUILD_CREATE event to be processed
  await delayUntil(10000, async () => await bot.cache.guilds.has(guild.id));

  // FINAL CHECK TO THROW IF MISSING STILL
  if (!(await bot.cache.guilds.has(guild.id))) {
    throw new Error(`The guild seemed to be created but it was not cached. ${guild.id.toString()}`);
  }

  await t.step("Channel related tests", async (t) => {
    const channel = await bot.helpers.createChannel(bot, guild.id, { name: "Discordeno-test" });

    // Assertions
    assertExists(channel);
    assertEquals(channel.type, DiscordChannelTypes.GuildText);

    await t.step("Message related tests", async (t) => {
      const message = await bot.helpers.sendMessage(bot, channel.id, "Testing");

      // Assertions
      assertExists(message);

      // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
      await delayUntil(10000, async () => await bot.cache.messages.has(message.id));

      if (!(await bot.cache.messages.has(message.id))) {
        throw new Error("The message seemed to be sent but it was not cached.");
      }
    });
  });

  await stopBot(bot);
});
