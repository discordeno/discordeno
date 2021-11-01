import { TOKEN } from "../configs.ts";
import {
  createBot,
  createEventHandlers,
  DiscordChannelTypes,
  DiscordOverwriteTypes,
  startBot,
  stopBot,
} from "../mod.ts";
import { assertEquals, assertExists } from "./deps.ts";
import { deleteMessageWithReasonTest, deleteMessageWithoutReasonTest } from "./helpers/messages/delete_message.ts";
import { getMessagesTest } from "./helpers/messages/get_messages.ts";
import { deleteMessagesWithoutReasonTest, deleteMessagesWithReasonTest } from "./helpers/messages/delete_messages.ts";
import { delayUntil } from "./utils.ts";
import {
  sendMessageWithComponents,
  sendMessageWithEmbedsTest,
  sendMessageWithTextTest,
} from "./helpers/messages/send_message.ts";

// CONDUCT LOCAL TESTS FIRST BEFORE RUNNING API TEST
import "./local.ts";
import { getMessageTest } from "./helpers/messages/get_message.ts";
import { addReactionTest } from "./helpers/messages/reactions.ts";
import { editMessageTest } from "./helpers/messages/edit_message.ts";
import { fetchSingleMemberTest } from "./helpers/members/fetch_members.ts";
import { pinMessageTests } from "./helpers/messages/pin.ts";
import { removeAllReactionTests, removeReactionEmojiTest, removeReactionTest } from "./helpers/messages/reactions.ts";
import { createChannelTests } from "./helpers/channels/create_channel.ts";
import { deleteChannelTests } from "./helpers/channels/delete_channel.ts";

Deno.test("[Bot] - Starting Tests", async (t) => {
  // CHANGE TO TRUE WHEN DEBUGGING SANITIZATION ERRORS
  const sanitizeMode = {
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false,
  };

  let startedAt = 0;
  const bot = createBot({
    token: TOKEN || Deno.env.get("DISCORD_TOKEN"),
    // token: Deno.env.get("DISCORD_TOKEN")!,
    // TEST BOT
    botId: 770381961553510451n,
    // DD bot
    // botId: 675412054529540107n,
    events: createEventHandlers({
      ready: () => {
        startedAt = Date.now();
      },
      // debug: console.log,
    }),
    intents: ["Guilds", "GuildMessages", "GuildMessageReactions"],
    cache: {
      isAsync: false,
    },
  });

  await startBot(bot);

  // Delay the execution to allow READY events to be processed
  await delayUntil(10000, () => Boolean(startedAt));
  console.log("Bot online");

  // DELETE GUILDS IF LESS THAN 10 SERVERS AS SAFETY MEASURE
  if (bot.cache.guilds.size() <= 10) {
    bot.cache.guilds.forEach(async (guild) => {
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

  await Promise.all([
    t.step({
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
    }),
    t.step({
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
    }),
    t.step({
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
    }),
  ]);

  // CHANNEL TESTS GROUPED
  await t.step("Channel related tests", async (t) => {
    const channel = await bot.helpers.createChannel(guild.id, { name: "Discordeno-test" });

    // Assertions
    assertExists(channel);
    assertEquals(channel.type, DiscordChannelTypes.GuildText);

    // ALL MESSAGE RELATED TESTS THAT DEPEND ON AN EXISTING CHANNEL
    await t.step("Message related tests", async (t) => {
      const message = await bot.helpers.sendMessage(channel.id, "Hello Skillz");

      // CONDUCT ALL TESTS RELATED TO A MESSAGE HERE
      await Promise.all([
        t.step({
          name: "[message] send message with text",
          fn: async (t) => {
            await sendMessageWithTextTest(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] send message with embeds",
          fn: async (t) => {
            await sendMessageWithEmbedsTest(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] send message with components",
          fn: async (t) => {
            await sendMessageWithComponents(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] edit message",
          fn: async (t) => {
            await editMessageTest(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] delete message without a reason",
          fn: async (t) => {
            await deleteMessageWithoutReasonTest(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] delete message with a reason",
          fn: async (t) => {
            await deleteMessageWithReasonTest(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] delete messages without a reason",
          fn: async (t) => {
            await deleteMessagesWithoutReasonTest(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] delete messages with a reason",
          fn: async (t) => {
            await deleteMessagesWithReasonTest(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] fetch a message",
          fn: async (t) => {
            await getMessageTest(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] fetch messages",
          fn: async (t) => {
            await getMessagesTest(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] add a reaction",
          fn: async (t) => {
            await addReactionTest(bot, guild.id, channel.id, { custom: false, single: true, ordered: false }, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] add a custom reaction",
          fn: async (t) => {
            await addReactionTest(bot, guild.id, channel.id, { custom: true, single: true, ordered: false }, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] add multiple reactions",
          fn: async (t) => {
            await addReactionTest(bot, guild.id, channel.id, { custom: false, single: false, ordered: false }, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] add multiple custom reactions",
          fn: async (t) => {
            await addReactionTest(bot, guild.id, channel.id, { custom: true, single: false, ordered: false }, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] add multiple reactions in order",
          fn: async (t) => {
            await addReactionTest(bot, guild.id, channel.id, { custom: false, single: false, ordered: true }, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] add multiple custom reactions in order",
          fn: async (t) => {
            await addReactionTest(bot, guild.id, channel.id, { custom: true, single: false, ordered: true }, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] remove a reaction.",
          fn: async (t) => {
            await removeReactionTest(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] remove all reactions.",
          fn: async (t) => {
            await removeAllReactionTests(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] remove emoji reactions.",
          fn: async (t) => {
            await removeReactionEmojiTest(bot, channel.id, t);
          },
          ...sanitizeMode,
        }),
        t.step({
          name: "[message] pin a message",
          fn: async (t) => {
            await pinMessageTests(bot, channel.id, message.id, t);
          },
          ...sanitizeMode,
        }),
      ]);
    });

    // ALL CHANNEL RELATED TESTS CAN GO HERE
    await Promise.all([
      t.step({
        name: "[channel] send message with text",
        fn: async (t) => {
          await sendMessageWithTextTest(bot, channel.id, t);
        },
        ...sanitizeMode,
      }),
      t.step({
        name: "[channel] create a new text channel",
        async fn() {
          await createChannelTests(bot, guild.id, { name: "Discordeno-test" }, t);
        },
        ...sanitizeMode,
      }),
      t.step({
        name: "[channel] create a new category channel",
        async fn() {
          await createChannelTests(
            bot,
            guild.id,
            {
              name: "Discordeno-test",
              type: DiscordChannelTypes.GuildCategory,
            },
            t
          );
        },
        ...sanitizeMode,
      }),
      // t.step({
      //   name: "[channel] create a new news channel",
      //   async fn() {
      //     await createChannelTests(bot, guild.id,{ name: "Discordeno-test", type: DiscordChannelTypes.GUILD_NEWS}, t);
      //   },
      //   ...sanitizeMode,
      // }),

      // t.step({
      //   name: "[channel] create a new store channel",
      //   async fn() {
      //     await createChannelTests(bot, guild.id,{ name: "Discordeno-test", type: DiscordChannelTypes.GUILD_STORE}, t);
      //   },
      //   ...sanitizeMode,
      // }),
      t.step({
        name: "[channel] create a new voice channel",
        async fn() {
          await createChannelTests(
            bot,
            guild.id,
            {
              name: "Discordeno-test",
              type: DiscordChannelTypes.GuildVoice,
            },
            t
          );
        },
        ...sanitizeMode,
      }),
      t.step({
        name: "[channel] create a new voice channel with a bitrate",
        async fn() {
          await createChannelTests(
            bot,
            guild.id,
            {
              name: "discordeno-test",
              type: DiscordChannelTypes.GuildVoice,
              bitrate: 32000,
            },
            t
          );
        },
        ...sanitizeMode,
      }),
      t.step({
        name: "[channel] create a new voice channel with a user limit",
        async fn() {
          await createChannelTests(
            bot,
            guild.id,
            {
              name: "Discordeno-test",
              type: DiscordChannelTypes.GuildVoice,
              userLimit: 32,
            },
            t
          );
        },
        ...sanitizeMode,
      }),
      t.step({
        name: "[channel] create a new text channel with a rate limit per user",
        async fn() {
          await createChannelTests(
            bot,
            guild.id,
            {
              name: "Discordeno-test",
              rateLimitPerUser: 2423,
            },
            t
          );
        },
        ...sanitizeMode,
      }),
      t.step({
        name: "[channel] create a new text channel with NSFW",
        async fn() {
          await createChannelTests(bot, guild.id, { name: "Discordeno-test", nsfw: true }, t);
        },
        ...sanitizeMode,
      }),
      t.step({
        name: "[channel] create a new text channel with permission overwrites",
        async fn() {
          await createChannelTests(
            bot,
            guild.id,
            {
              name: "Discordeno-test",
              permissionOverwrites: [
                {
                  id: bot.id,
                  type: DiscordOverwriteTypes.Member,
                  allow: ["VIEW_CHANNEL"],
                  deny: [],
                },
              ],
            },
            t
          );
        },
        ...sanitizeMode,
      }),
      t.step({
        name: "[channel] delete a channel with a reason",
        async fn() {
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
      }),
      t.step({
        name: "[channel] delete a channel without a reason",
        async fn() {
          await deleteChannelTests(bot, guild.id, {}, t);
        },
        ...sanitizeMode,
      }),
    ]);
  });

  // MEMBER TESTS GROUPED
  await t.step("Members related tests", async (t) => {
    await Promise.all([
      t.step({
        name: "[member] fetch a single member by id",
        fn: async (t) => {
          await fetchSingleMemberTest(bot, guild.id, t);
        },
        ...sanitizeMode,
      }),
      t.step({
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
      }),
    ]);
  });

  await stopBot(bot);
});
