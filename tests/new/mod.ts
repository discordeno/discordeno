import { ChannelTypes } from "../types/shared.ts";
import { createBot } from "../bot.ts";
import enableCachePlugin from "../plugins/cache/mod.ts";
import { assertEquals, assertExists, dotenv } from "./deps.ts";
import { delayUntil } from "./utils.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "./constants.ts";

console.log("[Tests] Starting test preparation");
dotenv({ export: true, path: `${Deno.cwd()}/.env` });

let token = Deno.env.get("DISCORD_TOKEN");
if (!token) throw new Error("Token was not provided.");

const botId = BigInt(atob(token.split(".")[0]));

let startedAt = 0;

export const bot = enableCachePlugin(createBot({
  token,
  botId,
  events: {},
  intents: [
    "Guilds",
    "GuildEmojis",
    "GuildMessages",
    "GuildMessageReactions",
    "GuildBans",
    "GuildMembers",
    "GuildScheduledEvents",
    "GuildVoiceStates",
    "GuildPresences",
  ],
}));

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
