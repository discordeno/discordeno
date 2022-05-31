import enableCachePlugin from "../plugins/cache/mod.ts";
import { ChannelTypes, createBot, createEventHandlers, startBot } from "../mod.ts";
import { assertEquals, assertExists, dotenv } from "./deps.ts";
import { delayUntil } from "./utils.ts";
import { deleteChannelOverwriteTests } from "./helpers/channels/deleteChannelOverwrite.ts";
import { editChannelTests } from "./helpers/channels/editChannel.ts";
import { CACHED_COMMUNITY_GUILD_ID, sanitizeMode } from "./constants.ts";
import { Intents } from "../types/shared.ts";

console.log("[Tests] Starting test preparation");
dotenv({ export: true, path: `${Deno.cwd()}/.env` });

let TOKEN = Deno.env.get("DISCORD_TOKEN");
if (!TOKEN) throw new Error("Token was not provided.");

const botId = BigInt(atob(TOKEN.split(".")[0]));

let startedAt = 0;
const baseBot = createBot({
  token: TOKEN,
  botId,
  events: createEventHandlers({
    ready: () => {
      startedAt = Date.now();
    },
    // debug: console.log,
  }),
  intents: Intents.Guilds |
    Intents.GuildEmojis |
    Intents.GuildMessages |
    Intents.GuildMessageReactions |
    Intents.GuildBans |
    Intents.GuildMembers |
    Intents.GuildScheduledEvents |
    Intents.GuildVoiceStates |
    Intents.GuildPresences,
});

export const bot = enableCachePlugin(baseBot);
await startBot(bot);

// Delay the execution to allow READY events to be processed
await delayUntil(10000, () => Boolean(startedAt));
console.log("Bot online");

// DELETE GUILDS IF LESS THAN 10 SERVERS AS SAFETY MEASURE
if (bot.guilds.size <= 10) {
  bot.guilds.forEach(async (guild) => {
    // DO NOT DELETE OUR CACHED TEST SERVER FOR COMMUNITY FEATURES
    if (guild.id === CACHED_COMMUNITY_GUILD_ID) return;
    if (guild.ownerId === bot.id) await bot.helpers.deleteGuild(guild.id);
  });
}

// Delay the execution to allow delete guilds to be processed
await delayUntil(10000, () => Boolean(startedAt));
console.log("[SETUP] Preparing the guild where tests will be done.");

// CREATE ONE GUILD SO WE CAN REUSE LATER TO SAVE RATE LIMITS
export const guild = await bot.helpers.createGuild({ name: "Discordeno Test" });

// Assertions
assertExists(guild);
assertExists(guild.id);

// Delay the execution to allow GUILD_CREATE event to be processed
await delayUntil(10000, () => bot.guilds.has(guild.id));

// FINAL CHECK TO THROW IF MISSING STILL
if (!bot.guilds.has(guild.id)) {
  throw new Error(
    `The guild seemed to be created but it was not cached. ${guild.id.toString()}`,
  );
}

console.log("[SETUP] Preparing the channel where tests will be done.");
export const channel = await bot.helpers.createChannel(guild.id, {
  name: "Discordeno-test",
});

// Assertions
assertExists(channel);
assertEquals(channel.type, ChannelTypes.GuildText);

console.log("[SETUP] Preparing the message on which tests will be done.");
export const message = await bot.helpers.sendMessage(channel.id, {
  content: "Hello Skillz",
});

Deno.test({
  name: "[channel] delete a channel overwrite",
  async fn(t) {
    await deleteChannelOverwriteTests(guild.id);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] edit a channel w/o a reason",
  async fn(t) {
    await editChannelTests(guild.id, {});
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] edit a channel w/ a reason",
  async fn(t) {
    await editChannelTests(guild.id, { reason: "Blame wolf" });
  },
  ...sanitizeMode,
});

// channels
// import "./channels/connectToVoice.ts";

// messages
// import "./messages/reactions.ts";

// misc
import "./misc/getApplicationInfo.ts";
import "./misc/getDiscoveryCategories.ts";
import "./misc/getUser.ts";
// import "./misc/getVoiceRegions.ts";
import "./misc/snowflake.ts";
import "./misc/typing.ts";
import "./misc/validateDiscovery.ts";
// import "./misc/editBotStatus.ts";

// webhooks
import "./webhooks/deleteWebhook.ts";
import "./webhooks/deleteWebhookWithToken.ts";
// import "./webhooks/sendWebhook.ts";
// import "./webhooks/webhooks.ts";

// BENCHMARK TESTING
// import "./benchmark.ts";
