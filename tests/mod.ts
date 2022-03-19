import enableCachePlugin from "../plugins/cache/mod.ts";
import { ChannelTypes, createBot, createEventHandlers, startBot } from "../mod.ts";
import { assertEquals, assertExists, dotenv } from "./deps.ts";
import { deleteMessageWithoutReasonTest, deleteMessageWithReasonTest } from "./helpers/messages/deleteMessage.ts";
import { getMessagesTest } from "./helpers/messages/getMessages.ts";
import { deleteMessagesWithoutReasonTest, deleteMessagesWithReasonTest } from "./helpers/messages/deleteMessages.ts";
import { delayUntil } from "./utils.ts";
import {
  sendMessageWithComponents,
  sendMessageWithEmbedsTest,
  sendMessageWithTextTest,
} from "./helpers/messages/sendMessage.ts";
import { getMessageTest } from "./helpers/messages/getMessage.ts";
import { editMessageTest } from "./helpers/messages/editMessage.ts";
import { pinMessageTests } from "./helpers/messages/pin.ts";
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
import { deleteChannelOverwriteTests } from "./helpers/channels/deleteChannelOverwrite.ts";
import { editChannelTests } from "./helpers/channels/editChannel.ts";
import { CACHED_COMMUNITY_GUILD_ID, sanitizeMode } from "./constants.ts";

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
  name: "[guild] create a guild",
  fn: async (t) => {
    await createGuildTests();
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] delete a guild",
  fn: async (t) => {
    await deleteGuildTests();
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] edit a guild",
  fn: async (t) => {
    await editGuildTests(guild.id);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] get audit logs",
  fn: async (t) => {
    await getAuditLogsTests(guild.id);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] get available voice regions",
  fn: async (t) => {
    await getAvailableVoiceRegionsTests();
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] get a ban",
  fn: async (t) => {
    await getBanTests(guild.id);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] get bans",
  fn: async (t) => {
    await getBansTests(guild.id);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] get guilds",
  fn: async (t) => {
    await getGuildTests(guild.id);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[guild] get vanity url",
  fn: async (t) => {
    await getVanityURLTests(guild.id);
  },
  ...sanitizeMode,
});

Deno.test({
  name: "[message] send message with text",
  fn: async (t) => {
    await sendMessageWithTextTest(channel.id);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] send message with embeds",
  fn: async (t) => {
    await sendMessageWithEmbedsTest(channel.id);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] send message with components",
  fn: async (t) => {
    await sendMessageWithComponents(channel.id);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] edit message",
  fn: async (t) => {
    await editMessageTest(channel.id);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] delete message without a reason",
  fn: async (t) => {
    await deleteMessageWithoutReasonTest(channel.id);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] delete message with a reason",
  fn: async (t) => {
    await deleteMessageWithReasonTest(channel.id);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] delete messages without a reason",
  fn: async (t) => {
    await deleteMessagesWithoutReasonTest(channel.id);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] delete messages with a reason",
  fn: async (t) => {
    await deleteMessagesWithReasonTest(channel.id);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] fetch a message",
  fn: async (t) => {
    await getMessageTest(channel.id);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[message] fetch messages",
  fn: async (t) => {
    await getMessagesTest(channel.id);
  },
  ...sanitizeMode,
});

Deno.test({
  name: "[message] pin a message",
  fn: async (t) => {
    await pinMessageTests(channel.id, message.id);
  },
  ...sanitizeMode,
});

Deno.test({
  name: "[channel] send message with text",
  fn: async (t) => {
    await sendMessageWithTextTest(channel.id);
  },
  ...sanitizeMode,
});

Deno.test({
  name: "[channel] filter all category channels",
  async fn(t) {
    await categoryChildrenTest(guild.id);
  },
  ...sanitizeMode,
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

// // channels
// import "./channels/connectToVoice.ts";
// import "./channels/createChannel.ts";
import "./channels/deleteChannel.ts";
// import "./channels/getChannel.ts";
// import "./channels/getChannels.ts";
// import "./channels/stageInstances.ts";
// // import "./channels/threads.ts";

// // emoji
// import "./emoji/createEmoji.ts";
// import "./emoji/deleteEmojiWithReason.ts";
// import "./emoji/deleteEmojiWithoutReason.ts";
// import "./emoji/editEmoji.ts";
// import "./emoji/emojiUrl.ts";
// import "./emoji/getEmoji.ts";
// import "./emoji/getMultipleEmojis.ts";

// // guilds
// import "./guilds/urls.ts";

// // invite
// import "./invite/createInvite.ts";
// // import "./invite/deleteInvite.ts";
// // import "./invite/getChannelInvites.ts";
// // import "./invite/getInvite.ts";
// // import "./invite/getInvites.ts";

// // members
// import "./members/avatarlUrl.ts";
// import "./members/ban.ts";
// import "./members/editBotNickname.ts";
// import "./members/getDmChannel.ts";
// import "./members/getMember.ts";

// // messages
// // import "./messages/reactions.ts";

// // misc
// import "./misc/getApplicationInfo.ts";
// import "./misc/getDiscoveryCategories.ts";
// import "./misc/getUser.ts";
// // import "./misc/getVoiceRegions.ts";
// import "./misc/snowflake.ts";
// import "./misc/typing.ts";
// import "./misc/validateDiscovery.ts";
// import "./misc/editBotStatus.ts";

// // role
// import "./role/addRole.ts";
// import "./role/createRoleWithoutReason.ts";
// import "./role/createRoleWithReason.ts";
// import "./role/deleteRoleWithoutReason.ts";
// import "./role/deleteRoleWithReason.ts";
// import "./role/editRole.ts";
// import "./role/getAllRoles.ts";
// import "./role/removeRole.ts";

// // scheduledEvents
// import "./scheduledEvents/createExternalEventWithEndtime.ts";
// import "./scheduledEvents/createExternalEventWithoutEndtime.ts";
// import "./scheduledEvents/createStageEventWithEndtime.ts";
// import "./scheduledEvents/createStageEventWithoutEndtime.ts";
// import "./scheduledEvents/createVoiceEventWithEndtime.ts";
// import "./scheduledEvents/createVoiceEventWithoutEndtime.ts";
// // import "./scheduledEvents/deleteEvent.ts";
// // import "./scheduledEvents/editEvent.ts";

// // webhooks
// import "./webhooks/deleteWebhook.ts";
// import "./webhooks/deleteWebhookWithToken.ts";
// // import "./webhooks/sendWebhook.ts";
// // import "./webhooks/webhooks.ts";

// // TESTS THAT DON'T REQUIRE API CONNECTION
// import "./local.ts";

// // BENCHMARK TESTING
// import "./benchmark.ts";

console.log("Test finished");
