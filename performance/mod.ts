import { loadBot as oldLoadBot } from "https://raw.githubusercontent.com/discordeno/discordeno/main/tests/mod.ts";
import { loadBot } from "../tests/mod.ts";

Deno.env.set("DISCORD_TOKEN", `${btoa("316179474163171338")}.gbaodiwabn`);
const bot = loadBot();
const oldBot = oldLoadBot();

// Fetch the cached guild
const discordGuild = JSON.parse(
  await (await fetch("https://raw.githubusercontent.com/discordeno/discordeno/benchies/cache/cachedObject/guild.json"))
    .text(),
);

const currentGuild = bot.transformers.guild(bot, { guild: discordGuild, shardId: 0 });
const previousGuild = oldBot.transformers.guild(oldBot, { guild: discordGuild, shardId: 0 });

Deno.bench("[Guild.toggles.features - Current] Get the features of a guild", () => {
  currentGuild.toggles.features;
});

Deno.bench("[Guild.toggles.features - Previous] Get the features of a guild", () => {
  previousGuild.toggles.features;
});

// Fetch the cached user
const discordUser = JSON.parse(
  await (await fetch("https://raw.githubusercontent.com/discordeno/discordeno/benchies/cache/cachedObject/user.json"))
    .text(),
);

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
