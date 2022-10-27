import { createBot } from "https://deno.land/x/discordeno@17.1.0/mod.ts";

const token = Deno.env.get("DISCORD_TOKEN");
if (!token) throw new Error("Token was not provided.");

const guildId = 1034163795146330163n

const bot = createBot({
  token,
  botId: BigInt(atob(token.split(".")[0])),
});

const sortValues = (object: any) => {
  for (const key of Object.keys(object)) {
    if (Array.isArray(object[key])) {
      if (object[key].length > 0 && typeof object[key][0] === "object") {
        object[key].forEach((element: any) => {
          sortValues(element)
        });
      } else {
        object[key].sort();
      }
    }
    if (typeof object[key] === "object" && object[key] !== null) {
      sortValues(object[key])
    }
  }
}

const guild = (await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD(guildId, true)))
sortValues(guild)
await Deno.writeTextFile(`cache/cachedObject/guild.json`, JSON.stringify(guild, undefined, 2))
const channels = (await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_CHANNELS(guildId))) as any[];

const channelNames = ["rules", "announcement-channel", "moderator-channel", "text-channel", "stage-channel", "voice-channel"]

for (const channelName of channelNames) {
  const channel = channels.find((channel) => channel.name === channelName)
  sortValues(channel)
  await Deno.writeTextFile(`cache/cachedObject/${channelName}.json`, JSON.stringify(channel, undefined, 2))
}

const user = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.USER(bot.id));
sortValues(user)
await Deno.writeTextFile(`cache/cachedObject/user.json`, JSON.stringify(user, undefined, 2))
