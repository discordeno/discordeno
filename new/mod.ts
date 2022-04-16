import { createBot } from "../bot.ts";
import enableCachePlugin from "../plugins/cache/mod.ts";
import { assertExists, dotenv } from "./deps.ts";

console.log("[Tests] Starting test preparation");
dotenv({ export: true, path: `${Deno.cwd()}/.env` });

const TOKEN = Deno.env.get("TOKEN");
const BOT_ID = Deno.env.get("BOT_ID");
const GUILD_ID = Deno.env.get("GUILD_ID");

assertExists(TOKEN, "TOKEN was not provided.");
assertExists(BOT_ID, "BOT_ID was not provided.");
assertExists(GUILD_ID, "GUILD_ID was not provided.");

export const bot = enableCachePlugin(createBot({
  token: TOKEN,
  botId: BigInt(BOT_ID),
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

export const guild = await bot.helpers.getGuild(BigInt(GUILD_ID));

import "./channels/mod.ts";
import "./emojis/mod.ts";
