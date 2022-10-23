import { loadBot as oldLoadBot } from "https://raw.githubusercontent.com/discordeno/discordeno/main/tests/mod.ts";
import { loadBot } from "../tests/mod.ts";

const bot = loadBot();
const oldBot = oldLoadBot();

// Fetch the discord api docs Guild page
const discordApiDocsGuildMd = await (await fetch("https://raw.githubusercontent.com/discord/discord-api-docs/main/docs/resources/Guild.md")).text()

// Get the first code block after the Get Guild section and remove ```json and ```
const discordGuild = JSON.parse((discordApiDocsGuildMd.split("Get Guild %")[1].match(/```json([\S\s]*?)```/) as string[])[0].slice(8, -4))
const currentGuild = bot.transformers.guild(bot, { guild: discordGuild, shardId: 0 });
const previousGuild = oldBot.transformers.guild(bot, { guild: discordGuild, shardId: 0 });

Deno.bench("[Guild.toggles.features - Current] Get the features of a guild", () => {
  currentGuild.toggles.features;
});

Deno.bench("[Guild.toggles.features - Previous] Get the features of a guild", () => {
  previousGuild.toggles.features;
});

// Fetch the discord api docs User page
const discordApiDocsUserMd = await (await fetch("https://raw.githubusercontent.com/discord/discord-api-docs/main/docs/resources/User.md")).text()

// Get the first code block and remove ```json and ```
const discordUser = JSON.parse((discordApiDocsUserMd.match(/```json([\S\s]*?)```/) as string[])[0].slice(8, -4))
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
