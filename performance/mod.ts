import { loadBot as oldLoadBot } from "https://raw.githubusercontent.com/discordeno/discordeno/main/tests/mod.ts";
import { loadBot } from "../tests/mod.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "../tests/utils.ts";
import { DiscordGuild, DiscordUser } from "../types/discord.ts";

const bot = loadBot();
const oldBot = oldLoadBot();
const discordGuild = await bot.rest.runMethod<DiscordGuild>(
  bot.rest,
  "GET",
  bot.constants.routes.GUILD(CACHED_COMMUNITY_GUILD_ID, true),
);
const currentGuild = bot.transformers.guild(bot, { guild: discordGuild, shardId: 0 });
const previousGuild = oldBot.transformers.guild(bot, { guild: discordGuild, shardId: 0 });

Deno.bench("[Guild.toggles.features - Current] Get the features of a guild", () => {
  currentGuild.toggles.features;
});

Deno.bench("[Guild.toggles.features - Previous] Get the features of a guild", () => {
  previousGuild.toggles.features;
});

const discordUser = await bot.rest.runMethod<DiscordUser>(bot.rest, "GET", bot.constants.routes.USER(bot.id));
const newUser = bot.transformers.user(bot, discordUser);
const oldUser = oldBot.transformers.user(oldBot, discordUser);

Deno.bench("[Transformer - Current] Discord User to a User", () => {
  bot.transformers.user(bot, discordUser);
});

Deno.bench("[Transformer - Previous] Discord User to a User", () => {
  oldBot.transformers.user(oldBot, discordUser);
});

Deno.bench("[Transformer - Current] User to a Discord User", () => {
  bot.transformers.reverse.user(bot, newUser);
});

Deno.bench("[Transformer - Previous] User to a Discord User", () => {
  oldBot.transformers.reverse.user(oldBot, oldUser);
});
