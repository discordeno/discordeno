// import { UNITTEST_TOKEN } from "../configs.ts";
import { memoryBenchmarks } from "../benchmarks/index.ts";
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
import { fetchSingleMemberTest } from "./helpers/members/fetchMembers.ts";
import { pinMessageTests } from "./helpers/messages/pin.ts";
import { removeAllReactionTests, removeReactionEmojiTest, removeReactionTest } from "./helpers/messages/reactions.ts";
import { createInviteTest } from "./helpers/invites/createInvite.ts";
import { deleteInviteTest } from "./helpers/invites/deleteInvite.ts";
import { getChannelInvitesTest } from "./helpers/invites/getChannelInvites.ts";
import { getInviteTest } from "./helpers/invites/getInvite.ts";
import { getInvitesTest } from "./helpers/invites/getInvites.ts";
import { createChannelTests } from "./helpers/channels/createChannel.ts";
import { deleteChannelTests } from "./helpers/channels/deleteChannel.ts";
import { createEmojiTest } from "./helpers/emojis/createEmoji.ts";
import { deleteEmojiWithoutReasonTest, deleteEmojiWithReasonTest } from "./helpers/emojis/deleteEmoji.ts";
import { editEmojiTest } from "./helpers/emojis/editEmoji.ts";
import { getEmojiTest } from "./helpers/emojis/getEmoji.ts";
import { getEmojisTest } from "./helpers/emojis/getEmojis.ts";
import { getBansTest, unbanTest, banTest } from "./helpers/members/ban.ts";
import { createRoleTests } from "./helpers/roles/createRole.ts";
import { deleteRoleTests } from "./helpers/roles/deleteRole.ts";
import { getRolesTest } from "./helpers/roles/getRoles.ts";
import { editRoleTests } from "./helpers/roles/editRole.ts";
import { addRoleTest, removeRoleTest } from "./helpers/roles/roleChanges.ts";
import { getUserTests } from "./helpers/misc/user.ts";
import { createGuildTests } from "./helpers/guilds/createGuild.ts";
import { deleteGuildTests } from "./helpers/guilds/deleteGuild.ts";
import { editGuildTests } from "./helpers/guilds/editGuild.ts";
import { getAuditLogsTests } from "./helpers/guilds/getAuditLogs.ts";
import { getAvailableVoiceRegionsTests } from "./helpers/guilds/getAvailableVoiceRegions.ts";
import { getBanTests } from "./helpers/guilds/getBan.ts";
import { getBansTests } from "./helpers/guilds/getBans.ts";
import { getGuildTests } from "./helpers/guilds/getGuild.ts";
import { getVanityURLTests } from "./helpers/guilds/getVanityUrl.ts";
import { getDiscoveryCategoriesTest, validDiscoveryTermTest } from "./helpers/misc/discoveries.ts";
import { categoryChildrenTest } from "./helpers/channels/categoryChannels.ts";
import { channelOverwriteHasPermissionTest } from "./helpers/channels/channelOverwriteHasPermission.ts";
import { cloneChannelTests } from "./helpers/channels/cloneChannel.ts";
import { deleteChannelOverwriteTests } from "./helpers/channels/deleteChannelOverwrite.ts";
import { editChannelTests } from "./helpers/channels/editChannel.ts";
import { createScheduledEventTests } from "./helpers/guilds/scheduledEvents/createScheduledEvent.ts";
import { ScheduledEventEntityType, ScheduledEventPrivacyLevel } from "../src/types/guilds/scheduledEvents.ts";
import { GuildFeatures } from "../src/types/guilds/guildFeatures.ts";
import { editScheduledEventTests } from "./helpers/guilds/scheduledEvents/editScheduledEvent.ts";
import { deleteScheduledEventTests } from "./helpers/guilds/scheduledEvents/deleteScheduledEvent.ts";
import { CACHED_COMMUNITY_GUILD_ID } from "./constants.ts";

// CHANGE TO TRUE WHEN DEBUGGING SANITIZATION ERRORS
const sanitizeMode = {
  sanitizeResources: false,
  sanitizeOps: false,
  sanitizeExit: false,
};

// const botId = BigInt(atob(UNITTEST_TOKEN.split(".")[0]));
const botId = BigInt(atob(Deno.env.get("DISCORD_TOKEN")!.split(".")[0]));

let startedAt = 0;
const bot = createBot({
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
const guild = await bot.helpers.createGuild({ name: "Discordeno Test" });

// Assertions
assertExists(guild);
assertExists(guild.id);

// Delay the execution to allow GUILD_CREATE event to be processed
await delayUntil(10000, () => bot.cache.guilds.has(guild.id));

// FINAL CHECK TO THROW IF MISSING STILL
if (!bot.cache.guilds.has(guild.id)) {
  throw new Error(`The guild seemed to be created but it was not cached. ${guild.id.toString()}`);
}

const channel = await bot.helpers.createChannel(guild.id, { name: "Discordeno-test" });

// Assertions
assertExists(channel);
assertEquals(channel.type, ChannelTypes.GuildText);

const message = await bot.helpers.sendMessage(channel.id, "Hello Skillz");

Deno.test({
  name: "[scheduled event] create a guild scheduled event with stage entity",
  fn: async (t) => {
    await createScheduledEventTests(
      bot,
      CACHED_COMMUNITY_GUILD_ID,
      {
        name: "lfg",
        description: "itoh is an imposter",
        scheduledStartTime: Date.now() + 600000,
        privacyLevel: ScheduledEventPrivacyLevel.GuildOnly,
        entityType: ScheduledEventEntityType.StageInstance,
      },
      t
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[scheduled event] create a guild scheduled event with stage entity with an end time.",
  fn: async (t) => {
    await createScheduledEventTests(
      bot,
      CACHED_COMMUNITY_GUILD_ID,
      {
        name: "lfg",
        description: "itoh is an imposter",
        scheduledStartTime: Date.now() + 600000,
        scheduledEndTime: Date.now() + (600000 + 1),
        privacyLevel: ScheduledEventPrivacyLevel.GuildOnly,
        entityType: ScheduledEventEntityType.StageInstance,
      },
      t
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[scheduled event] create a guild scheduled event with voice entity",
  fn: async (t) => {
    await createScheduledEventTests(
      bot,
      guild.id,
      {
        name: "lfg",
        description: "itoh is an imposter",
        scheduledStartTime: Date.now() + 600000,
        privacyLevel: ScheduledEventPrivacyLevel.GuildOnly,
        entityType: ScheduledEventEntityType.Voice,
      },
      t
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[scheduled event] create a guild scheduled event with voice entity with an end time.",
  fn: async (t) => {
    await createScheduledEventTests(
      bot,
      guild.id,
      {
        name: "lfg",
        description: "itoh is an imposter",
        scheduledStartTime: Date.now() + 600000,
        scheduledEndTime: Date.now() + (600000 + 1),
        privacyLevel: ScheduledEventPrivacyLevel.GuildOnly,
        entityType: ScheduledEventEntityType.Voice,
      },
      t
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[scheduled event] create a guild scheduled event with external entity",
  fn: async (t) => {
    await createScheduledEventTests(
      bot,
      guild.id,
      {
        name: "lfg",
        description: "itoh is an imposter",
        scheduledStartTime: Date.now() + 600000,
        scheduledEndTime: Date.now() + 1200000,
        privacyLevel: ScheduledEventPrivacyLevel.GuildOnly,
        entityType: ScheduledEventEntityType.External,
        location: "heaven",
      },
      t
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[scheduled event] create a guild scheduled event with external entity with an end time.",
  fn: async (t) => {
    await createScheduledEventTests(
      bot,
      guild.id,
      {
        name: "lfg",
        description: "itoh is an imposter",
        scheduledStartTime: Date.now() + 600000,
        scheduledEndTime: Date.now() + (600000 + 1),
        privacyLevel: ScheduledEventPrivacyLevel.GuildOnly,
        entityType: ScheduledEventEntityType.External,
        location: "heaven",
      },
      t
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[scheduled event] edit a scheduled event",
  fn: async (t) => {
    await editScheduledEventTests(bot, CACHED_COMMUNITY_GUILD_ID, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[scheduled event] delete a scheduled event",
  fn: async (t) => {
    await deleteScheduledEventTests(bot, guild.id, t);
  },
  ...sanitizeMode,
});

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

Deno.test({
  name: "[invite] create an invite",
  async fn(t) {
    await createInviteTest(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[invite] delete an invite",
  async fn(t) {
    await deleteInviteTest(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[invite] get channels invites",
  async fn(t) {
    await getChannelInvitesTest(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[invite] get invite",
  async fn(t) {
    await getInviteTest(bot, channel.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[invite] get invites",
  async fn(t) {
    await getInvitesTest(bot, channel.id, guild.id, t);
  },
  ...sanitizeMode,
});

// THESE BAN TESTS SHOULD BE DONE ONE BY ONE
Deno.test({
  name: "[member] ban user from guild without reason",
  fn: async (t) => {
    // THIS IS WOLF, IF ANYTHING BREAKS BLAME HIM!
    await banTest(bot, t, guild.id, 270273690074087427n, { reason: "Blame Wolf" });
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[member] get a single user's ban",
  fn: async (t) => {
    assertExists(await bot.helpers.getBan(guild.id, 270273690074087427n));
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[member] ban member from guild without reason",
  fn: async (t) => {
    // THIS IS IAN, HE PLAY'S GOLDEN SUN. BAN BEFORE HE MAKES US ADDICTED TO IT!!!
    await banTest(bot, t, guild.id, 90339695967350784n);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[member] get bans on a server",
  fn: async (t) => {
    await getBansTest(bot, t, guild.id);
  },
  ...sanitizeMode,
});

Deno.test({
  name: "[member] fetch a single member by id",
  fn: async (t) => {
    await fetchSingleMemberTest(bot, guild.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[member] format a members avatar url",
  fn: async (t) => {
    assertEquals(
      bot.helpers.avatarURL(130136895395987456n, 8840, {
        avatar: 4055337350987360625717955448021200177333n,
      }),
      "https://cdn.discordapp.com/avatars/130136895395987456/eae5905ad2d18d7c8deca20478b088b5.jpg?size=128"
    );
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[member] unban member from guild",
  fn: async (t) => {
    await Promise.all([
      unbanTest(bot, t, guild.id, 270273690074087427n),
      unbanTest(bot, t, guild.id, 90339695967350784n),
    ]);
  },
  ...sanitizeMode,
});

Deno.test({
  name: "[emoji] create an emoji",
  fn: async (t) => {
    await createEmojiTest(bot, guild.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[emoji] delete an emoji without a reason",
  fn: async (t) => {
    await deleteEmojiWithoutReasonTest(bot, guild.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[emoji] delete an emoji with a reason",
  fn: async (t) => {
    await deleteEmojiWithReasonTest(bot, guild.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[emoji] edit an emoji",
  fn: async (t) => {
    await editEmojiTest(bot, guild.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[emoji] get an emoji",
  fn: async (t) => {
    await getEmojiTest(bot, guild.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[emoji] get multiple emojis",
  fn: async (t) => {
    await getEmojisTest(bot, guild.id, t);
  },
  ...sanitizeMode,
});

Deno.test({
  name: "[Role] get all roles on a server",
  fn: async (t) => {
    await getRolesTest(bot, guild.id, t);
  },
  ...sanitizeMode,
});

Deno.test({
  name: "[Role] create a role without a reason",
  fn: async (t) => {
    await createRoleTests(bot, guild.id, {}, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[Role] create a role with a reason",
  fn: async (t) => {
    await createRoleTests(bot, guild.id, { reason: "Blame wolfy" }, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[Role] delete a role without a reason",
  fn: async (t) => {
    await deleteRoleTests(bot, guild.id, {}, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[Role] delete a role with a reason",
  fn: async (t) => {
    await deleteRoleTests(bot, guild.id, { reason: "Blame wolfy" }, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[Role] edit a role",
  fn: async (t) => {
    await editRoleTests(bot, guild.id, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[Role] add a role to a member",
  fn: async (t) => {
    await addRoleTest(bot, guild.id, { reason: "Blame wolf" }, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[Role] remove a role to a member",
  fn: async (t) => {
    await removeRoleTest(bot, guild.id, { reason: "Blame wolf" }, t);
  },
  ...sanitizeMode,
});

Deno.test({
  name: "[User] get a user and transform",
  fn: async (t) => {
    await getUserTests(bot, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[tranform] snowflake to bigint",
  fn: async (t) => {
    assertEquals(130136895395987456n, bot.transformers.snowflake("130136895395987456"));
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[discovery] Validate a discovery search term",
  fn: async (t) => {
    await validDiscoveryTermTest(bot, t);
  },
  ...sanitizeMode,
});
Deno.test({
  name: "[discovery] get categories from discovery",
  fn: async (t) => {
    await getDiscoveryCategoriesTest(bot, t);
  },
  ...sanitizeMode,
});

Deno.test({
  name: "[Memory] Benchmark memory tests",
  fn: async (t) => {
    await memoryBenchmarks(bot, true);
  },
  ...sanitizeMode,
});

// await bot.helpers.deleteGuild(guild.id);

// await stopBot(bot);
