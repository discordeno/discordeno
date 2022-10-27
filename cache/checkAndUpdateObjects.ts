import { createBot } from "https://deno.land/x/discordeno@17.1.0/mod.ts";
import {
  hideDate,
  hideEUDText,
  hideHash,
  hideSnowflake,
  loopObject
} from "https://raw.githubusercontent.com/discordeno/benchmarks/main/utils.ts";

const token = Deno.env.get("DISCORD_TOKEN");
if (!token) throw new Error("Token was not provided.");

const guildId = 907350958810480671n

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

const cleanPayload = (payload: any) => loopObject(payload, (value, key) => {
  if (typeof value !== "string") return value;

  // IF ITS A NUMBER MASK NUMBER
  if (/^\d+$/.test(value)) return hideSnowflake(value);
  if (["icon", "banner", "splash", "avatar"].includes(key)) {
    return hideHash(value);
  }
  // IF ITS DATE REGEX
  if (Date.parse(value)) return hideDate();

  return hideEUDText(value);
});

const guild = cleanPayload(await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD(guildId, true)))
await Deno.writeTextFile(`cache/cachedObject/guild.json`, JSON.stringify(guild, undefined, 2))
const channels = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_CHANNELS(guildId)) as any[];

const channelNames = ["rules", "announcement-channel", "moderator-channel", "text-channel", "stage-channel", "voice-channel"]

for (const channelName of channelNames) {
  const channel = cleanPayload(channels.find((channel) => channel.name === channelName))
  await Deno.writeTextFile(`cache/cachedObject/${channelName}.json`, JSON.stringify(channel, undefined, 2))
}

const user = cleanPayload(await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.USER(bot.id)));
await Deno.writeTextFile(`cache/cachedObject/user.json`, JSON.stringify(user, undefined, 2))
