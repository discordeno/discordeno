import { Channel, createBot, Guild, Member, Message, Role, User } from "https://deno.land/x/discordeno@17.1.0/mod.ts";
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

const cleanPayload = <T extends Object>(payload: T): T => loopObject(payload, (value, key) => {
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

const guild = cleanPayload(await bot.rest.runMethod<Guild>(bot.rest, "GET", bot.constants.routes.GUILD(guildId, true)))
await Deno.writeTextFile(`cache/cachedObject/guild.json`, JSON.stringify(guild, undefined, 2))
const channels = await bot.rest.runMethod<Channel[]>(bot.rest, "GET", bot.constants.routes.GUILD_CHANNELS(guildId));

const channelNames = ["rules", "announcement-channel", "moderator-channel", "text-channel", "stage-channel", "voice-channel"]

for (const channelName of channelNames) {
  const channel = cleanPayload(channels.find((channel) => channel.name === channelName)!)
  await Deno.writeTextFile(`cache/cachedObject/${channelName}.json`, JSON.stringify(channel, undefined, 2))
}

const user = cleanPayload(await bot.rest.runMethod<User>(bot.rest, "GET", bot.constants.routes.USER(bot.id)));
await Deno.writeTextFile(`cache/cachedObject/user.json`, JSON.stringify(user, undefined, 2))

const dirtyRole = (await bot.rest.runMethod<Role[]>(bot.rest, "GET", bot.constants.routes.GUILD_ROLES(guildId))).find((role) => role.name === "a role")
const role = { ...cleanPayload(dirtyRole!), permissions: dirtyRole!.permissions }
await Deno.writeTextFile(`cache/cachedObject/role.json`, JSON.stringify(role, undefined, 2))

const member = cleanPayload((await bot.rest.runMethod<Member[]>(bot.rest, "GET", bot.constants.routes.GUILD_MEMBERS(guildId)))[0])
await Deno.writeTextFile(`cache/cachedObject/member.json`, JSON.stringify(member, undefined, 2))

const message = cleanPayload((await bot.rest.runMethod<Message[]>(bot.rest, "GET", bot.constants.routes.CHANNEL_MESSAGES(channels.find((channel) => channel.name === "text-channel")!.id)))[0])
await Deno.writeTextFile(`cache/cachedObject/message.json`, JSON.stringify(message, undefined, 2))
