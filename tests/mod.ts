// import { UNITTEST_TOKEN } from "../configs.ts";
import { createBot, createEventHandlers, ChannelTypes, OverwriteTypes, setupBot, startBot } from "../mod.ts";
import { assertEquals, assertExists, enableCachePlugin } from "./deps.ts";
import { deleteMessageWithReasonTest, deleteMessageWithoutReasonTest } from "./helpers/messages/deleteMessage.ts";
import { getMessagesTest } from "./helpers/messages/getMessages.ts";
import { deleteMessagesWithoutReasonTest, deleteMessagesWithReasonTest } from "./helpers/messages/deleteMessages.ts";
import { delayUntil } from "./utils.ts";
import {
  sendMessageWithComponents,
  sendMessageWithEmbedsTest,
  sendMessageWithTextTest,
} from "./helpers/messages/sendMessage.ts";

// CONDUCT LOCAL TESTS FIRST BEFORE RUNNING API TEST
import "./local.ts";
import { getMessageTest } from "./helpers/messages/getMessage.ts";
import { addReactionTest } from "./helpers/messages/reactions.ts";
import { editMessageTest } from "./helpers/messages/editMessage.ts";
import { pinMessageTests } from "./helpers/messages/pin.ts";
import { removeAllReactionTests, removeReactionEmojiTest, removeReactionTest } from "./helpers/messages/reactions.ts";
import { createInviteTest } from "./helpers/invites/createInvite.ts";
import { deleteInviteTest } from "./helpers/invites/deleteInvite.ts";
import { getChannelInvitesTest } from "./helpers/invites/getChannelInvites.ts";
import { getInviteTest } from "./helpers/invites/getInvite.ts";
import { getInvitesTest } from "./helpers/invites/getInvites.ts";
import { createChannelTests } from "./helpers/channels/createChannel.ts";
import { deleteChannelTests } from "./helpers/channels/deleteChannel.ts";
import { createGuildTests } from "./helpers/guilds/createGuild.ts";
import { deleteGuildTests } from "./helpers/guilds/deleteGuild.ts";
import { editGuildTests } from "./helpers/guilds/editGuild.ts";
import { getAuditLogsTests } from "./helpers/guilds/getAuditLogs.ts";
import { getAvailableVoiceRegionsTests } from "./helpers/guilds/getAvailableVoiceRegions.ts";
import { getBanTests } from "./helpers/guilds/getBan.ts";
import { getBansTests } from "./helpers/guilds/getBans.ts";
import { getGuildTests } from "./helpers/guilds/getGuild.ts";
import { getVanityURLTests } from "./helpers/guilds/getVanityUrl.ts";
import { categoryChildrenTest } from "./helpers/channels/categoryChannels.ts";
import { channelOverwriteHasPermissionTest } from "./helpers/channels/channelOverwriteHasPermission.ts";
import { cloneChannelTests } from "./helpers/channels/cloneChannel.ts";
import { deleteChannelOverwriteTests } from "./helpers/channels/deleteChannelOverwrite.ts";
import { editChannelTests } from "./helpers/channels/editChannel.ts";
import { CACHED_COMMUNITY_GUILD_ID, sanitizeMode } from "./constants.ts";

// const botId = BigInt(atob(UNITTEST_TOKEN.split(".")[0]));
const botId = BigInt(atob(Deno.env.get("DISCORD_TOKEN")!.split(".")[0]));

let startedAt = 0;
export const bot = createBot({
  // token: UNITTEST_TOKEN || Deno.env.get("DISCORD_TOKEN"),
  token: Deno.env.get("DISCORD_TOKEN")!,
  botId,
  events: createEventHandlers({
    ready: () => {
      startedAt = Date.now();
    },
    // debug: console.log,
  }),
  intents: [
    "Guilds",
    "GuildEmojis",
    "GuildMessages",
    "GuildMessageReactions",
    "GuildBans",
    "GuildMembers",
    "GuildScheduledEvents",
  ],
  cache: {
    isAsync: false,
  },
});
setupBot(bot);
// @ts-ignore
enableCachePlugin(bot);
await startBot(bot);

// Delay the execution to allow READY events to be processed
await delayUntil(10000, () => Boolean(startedAt));
console.log("Bot online");

// DELETE GUILDS IF LESS THAN 10 SERVERS AS SAFETY MEASURE
if (bot.cache.guilds.size() <= 10) {
  bot.cache.guilds.forEach(async (guild) => {
    // DO NOT DELETE OUR CACHED TEST SERVER FOR COMMUNITY FEATURES
    if (guild.id === CACHED_COMMUNITY_GUILD_ID) return;
    if (guild.ownerId === bot.id) await bot.helpers.deleteGuild(guild.id);
  });
}

// Delay the execution to allow delete guilds to be processed
await delayUntil(10000, () => Boolean(startedAt));

// CREATE ONE GUILD SO WE CAN REUSE LATER TO SAVE RATE LIMITS
export const guild = await bot.helpers.createGuild({ name: "Discordeno Test" });

// Assertions
assertExists(guild);
assertExists(guild.id);

// Delay the execution to allow GUILD_CREATE event to be processed
await delayUntil(10000, () => bot.cache.guilds.has(guild.id));

// FINAL CHECK TO THROW IF MISSING STILL
if (!bot.cache.guilds.has(guild.id)) {
  throw new Error(`The guild seemed to be created but it was not cached. ${guild.id.toString()}`);
}

export const channel = await bot.helpers.createChannel(guild.id, { name: "Discordeno-test" });

// Assertions
assertExists(channel);
assertEquals(channel.type, ChannelTypes.GuildText);

export const message = await bot.helpers.sendMessage(channel.id, "Hello Skillz");

import "./benchmark.ts";

Deno.test({
  name: "[guild] format a guild's icon url",
  fn: async (t) => {
    assertEquals(bot.helpers.guildIconURL(guild.id, { icon: guild.icon }), undefined);
    assertEquals(
      bot.helpers.guildIconURL(785384884197392384n, {
        icon: 3837424427068676005442449262648382018748n,
      }),
      "https://cdn.discordapp.com/icons/785384884197392384/46f50fb412eab14ec455d5cf777154bc.jpg?size=128"
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] format a guild's banner url",
  fn: async (t) => {
    assertEquals(bot.helpers.guildBannerURL(guild.id, { banner: guild.banner }), undefined);
    assertEquals(
      bot.helpers.guildBannerURL(613425648685547541n, {
        banner: 3919584870146358272366452115178209474142n,
      }),
      "https://cdn.discordapp.com/banners/613425648685547541/84c4964c115c128fb9100952c3b4f65e.jpg?size=128"
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] format a guild's splash url",
  fn: async (t) => {
    assertEquals(bot.helpers.guildSplashURL(guild.id, { splash: guild.splash }), undefined);
    assertEquals(
      bot.helpers.guildSplashURL(785384884197392384n, {
        splash: 3837424427068676005442449262648382018748n,
      }),
      "https://cdn.discordapp.com/splashes/785384884197392384/46f50fb412eab14ec455d5cf777154bc.jpg?size=128"
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] create a guild",
  fn: async (t) => {
    await createGuildTests(bot, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] delete a guild",
  fn: async (t) => {
    await deleteGuildTests(bot, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] edit a guild",
  fn: async (t) => {
    await editGuildTests(bot, guild.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] get audit logs",
  fn: async (t) => {
    await getAuditLogsTests(bot, guild.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] get available voice regions",
  fn: async (t) => {
    await getAvailableVoiceRegionsTests(bot, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] get a ban",
  fn: async (t) => {
    await getBanTests(bot, guild.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] get bans",
  fn: async (t) => {
    await getBansTests(bot, guild.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] get guilds",
  fn: async (t) => {
    await getGuildTests(bot, guild.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] get vanity url",
  fn: async (t) => {
    await getVanityURLTests(bot, guild.id, t);
  },
  ...sanitizeMode,
});

Deno.test({
  name: "[message] send message with text",
  fn: async (t) => {
    await sendMessageWithTextTest(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] send message with embeds",
  fn: async (t) => {
    await sendMessageWithEmbedsTest(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] send message with components",
  fn: async (t) => {
    await sendMessageWithComponents(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] edit message",
  fn: async (t) => {
    await editMessageTest(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] delete message without a reason",
  fn: async (t) => {
    await deleteMessageWithoutReasonTest(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] delete message with a reason",
  fn: async (t) => {
    await deleteMessageWithReasonTest(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] delete messages without a reason",
  fn: async (t) => {
    await deleteMessagesWithoutReasonTest(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] delete messages with a reason",
  fn: async (t) => {
    await deleteMessagesWithReasonTest(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] fetch a message",
  fn: async (t) => {
    await getMessageTest(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] fetch messages",
  fn: async (t) => {
    await getMessagesTest(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] add a reaction",
  fn: async (t) => {
    await addReactionTest(bot, guild.id, channel.id, { custom: false, single: true, ordered: false }, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] add a custom reaction",
  fn: async (t) => {
    await addReactionTest(bot, guild.id, channel.id, { custom: true, single: true, ordered: false }, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] add multiple reactions",
  fn: async (t) => {
    await addReactionTest(bot, guild.id, channel.id, { custom: false, single: false, ordered: false }, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] add multiple custom reactions",
  fn: async (t) => {
    await addReactionTest(bot, guild.id, channel.id, { custom: true, single: false, ordered: false }, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] add multiple reactions in order",
  fn: async (t) => {
    await addReactionTest(bot, guild.id, channel.id, { custom: false, single: false, ordered: true }, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] add multiple custom reactions in order",
  fn: async (t) => {
    await addReactionTest(bot, guild.id, channel.id, { custom: true, single: false, ordered: true }, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] remove a reaction.",
  fn: async (t) => {
    await removeReactionTest(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] remove all reactions.",
  fn: async (t) => {
    await removeAllReactionTests(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] remove emoji reactions.",
  fn: async (t) => {
    await removeReactionEmojiTest(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] pin a message",
  fn: async (t) => {
    await pinMessageTests(bot, channel.id, message.id, t);
  },
  ...sanitizeMode,
});

Deno.test({
  name: "[channel] send message with text",
  fn: async (t) => {
    await sendMessageWithTextTest(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] create a new text channel",
  async fn(t) {
    await createChannelTests(bot, guild.id, { name: "Discordeno-test" }, false, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] create a new category channel",
  async fn(t) {
    await createChannelTests(
      bot,
      guild.id,
      {
        name: "Discordeno-test",
        type: ChannelTypes.GuildCategory,
      },
      false,
      t
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] create a new news channel",
  async fn(t) {
    await createChannelTests(
      bot,
      CACHED_COMMUNITY_GUILD_ID,
      { name: "Discordeno-test", type: ChannelTypes.GuildNews },
      true,
      t
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] create a new voice channel",
  async fn(t) {
    await createChannelTests(
      bot,
      guild.id,
      {
        name: "Discordeno-test",
        type: ChannelTypes.GuildVoice,
      },
      false,
      t
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] create a new voice channel with a bitrate",
  async fn(t) {
    await createChannelTests(
      bot,
      guild.id,
      {
        name: "discordeno-test",
        type: ChannelTypes.GuildVoice,
        bitrate: 32000,
      },
      false,
      t
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] create a new voice channel with a user limit",
  async fn(t) {
    await createChannelTests(
      bot,
      guild.id,
      {
        name: "Discordeno-test",
        type: ChannelTypes.GuildVoice,
        userLimit: 32,
      },
      false,
      t
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] create a new text channel with a rate limit per user",
  async fn(t) {
    await createChannelTests(
      bot,
      guild.id,
      {
        name: "Discordeno-test",
        rateLimitPerUser: 2423,
      },
      false,
      t
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] create a new text channel with NSFW",
  async fn(t) {
    await createChannelTests(bot, guild.id, { name: "Discordeno-test", nsfw: true }, false, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] create a new text channel with permission overwrites",
  async fn(t) {
    await createChannelTests(
      bot,
      guild.id,
      {
        name: "Discordeno-test",
        permissionOverwrites: [
          {
            id: bot.id,
            type: OverwriteTypes.Member,
            allow: ["VIEW_CHANNEL"],
            deny: [],
          },
        ],
      },
      false,
      t
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] delete a channel with a reason",
  async fn(t) {
    await deleteChannelTests(
      bot,
      guild.id,
      {
        reason: "with a reason",
      },
      t
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] delete a channel without a reason",
  async fn(t) {
    await deleteChannelTests(bot, guild.id, {}, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] filter all category channels",
  async fn(t) {
    await categoryChildrenTest(bot, guild.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] edit a channel permission overwrite",
  async fn(t) {
    await channelOverwriteHasPermissionTest(bot, guild.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] clone a channel w/o a reason",
  async fn(t) {
    await cloneChannelTests(bot, guild.id, channel, {}, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] clone a channel w/ a reason",
  async fn(t) {
    await cloneChannelTests(bot, guild.id, channel, { reason: "Blame wolf" }, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] delete a channel overwrite",
  async fn(t) {
    await deleteChannelOverwriteTests(bot, guild.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] edit a channel w/o a reason",
  async fn(t) {
    await editChannelTests(bot, guild.id, {}, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[channel] edit a channel w/ a reason",
  async fn(t) {
    await editChannelTests(bot, guild.id, { reason: "Blame wolf" }, t);
  },
  ...sanitizeMode,
});

import "./emoji/createEmoji.ts";
import "./emoji/deleteEmojiWithReason.ts";
import "./emoji/deleteEmojiWithoutReason.ts";
import "./emoji/editEmoji.ts";
import "./emoji/getEmoji.ts";
import "./emoji/getMultipleEmojis.ts";
import "./invite/createInvite.ts";
import "./invite/deleteInvite.ts";
import "./invite/getChannelInvites.ts";
import "./invite/getInvite.ts";
import "./invite/getInvites.ts";
import "./members/avatarlUrl.ts";
import "./members/ban.ts";
import "./misc/getDiscoveryCategories.ts";
import "./misc/getUser.ts";
import "./misc/snowflake.ts";
import "./misc/validateDiscovery.ts";
import "./role/addRole.ts";
import "./role/createRoleWithoutReason.ts";
import "./role/createRoleWithReason.ts";
import "./role/deleteRoleWithoutReason.ts";
import "./role/deleteRoleWithReason.ts";
import "./role/editRole.ts";
import "./role/getAllRoles.ts";
import "./role/removeRole.ts";
import "./scheduledEvents/createExternalEventWithEndtime.ts";
import "./scheduledEvents/createExternalEventWithoutEndtime.ts";
import "./scheduledEvents/createStageEventWithEndtime.ts";
import "./scheduledEvents/createStageEventWithoutEndtime.ts";
import "./scheduledEvents/createVoiceEventWithEndtime.ts";
import "./scheduledEvents/createVoiceEventWithoutEndtime.ts";
import "./scheduledEvents/deleteEvent.ts";
import "./scheduledEvents/editEvent.ts";
// await bot.helpers.deleteGuild(guild.id);

// await stopBot(bot);
