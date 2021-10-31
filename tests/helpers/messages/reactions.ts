import { Bot } from "../../../src/bot.ts";
import { assertEquals, assertExists } from "../../deps.ts";
import { delayUntil } from "../../utils.ts";

const reactionCounters = new Map<bigint, number>();

export async function addReactionTest(
  bot: Bot,
  guildId: bigint,
  channelId: bigint,
  options: { custom: boolean; single: boolean; ordered: boolean },
  t: Deno.TestContext
) {
  const message = await bot.helpers.sendMessage(channelId, "Hello World!");

  // Assertions
  assertExists(message);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.cache.messages.has(message.id));

  if (!bot.cache.messages.has(message.id)) {
    throw new Error("The message seemed to be sent but it was not cached.");
  }

  let emojiId = "❤";
  let emojiIds = ["❤", "😃"];

  if (options.custom) {
    if (options.single) {
      emojiId = `<:blamewolf:${
        (
          await bot.helpers.createEmoji(guildId, {
            name: "blamewolf",
            image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
            // roles: [],
          })
        ).id
      }>`;
    } else {
      emojiIds = [
        `<:blamewolf:${
          (
            await bot.helpers.createEmoji(guildId, {
              name: "blamewolf",
              image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
              // roles: [],
            })
          ).id
        }>`,
        `<:blamewolf2:${
          (
            await bot.helpers.createEmoji(guildId, {
              name: "blamewolf2",
              image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
              // roles: [],
            })
          ).id
        }>`,
      ];
    }
  }

  reactionCounters.set(message.id, 0);

  bot.events.reactionAdd = function (bot, payload) {
    const current = reactionCounters.get(payload.messageId) || 0;
    reactionCounters.set(payload.messageId, current + 1);
  };

  if (options.single) await bot.helpers.addReaction(message.channelId, message.id, emojiId);
  else await bot.helpers.addReactions(message.channelId, message.id, emojiIds, options.ordered);

  await delayUntil(10000, () => reactionCounters.get(message.id) === (options.single ? 1 : emojiIds.length));

  assertEquals(reactionCounters.get(message.id), options.single ? 1 : emojiIds.length);
}

export async function removeAllReactionTests(bot: Bot, channelId: bigint, t: Deno.TestContext) {
  const message = await bot.helpers.sendMessage(channelId, "Hello World!");

  // Assertions
  assertExists(message);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.cache.messages.has(message.id));

  if (!bot.cache.messages.has(message.id)) {
    throw new Error("The message seemed to be sent but it was not cached.");
  }

  reactionCounters.set(message.id, 0);

  bot.events.reactionRemoveAll = function (bot, payload) {
    reactionCounters.set(payload.messageId, 0);
  };

  bot.events.reactionAdd = function (bot, payload) {
    const current = reactionCounters.get(payload.messageId) || 0;
    reactionCounters.set(payload.messageId, current + 1);
  };

  // Add reactions to the message
  await bot.helpers.addReactions(message.channelId, message.id, ["❤", "😃", "🤫"]);
  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => reactionCounters.get(message.id) === 3);

  // Be sure that the message has the reactions
  assertEquals(reactionCounters.get(message.id), 3);

  await bot.helpers.removeAllReactions(message.channelId, message.id);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => reactionCounters.get(message.id) === 0);

  // Check if the reactions has been deleted
  assertEquals(reactionCounters.get(message.id), 0);
}

export async function removeReactionTest(bot: Bot, channelId: bigint, t: Deno.TestContext) {
  const message = await bot.helpers.sendMessage(channelId, "Hello World!");

  // Assertions
  assertExists(message);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.cache.messages.has(message.id));

  if (!bot.cache.messages.has(message.id)) {
    throw new Error("The message seemed to be sent but it was not cached.");
  }

  reactionCounters.set(message.id, 0);

  bot.events.reactionRemove = function (bot, payload) {
    const current = reactionCounters.get(message.id);
    reactionCounters.set(payload.messageId, (current || 0) - 1);
  };

  bot.events.reactionAdd = function (bot, payload) {
    const current = reactionCounters.get(payload.messageId) || 0;
    reactionCounters.set(payload.messageId, current + 1);
  };

  // Add reactions to the message
  await bot.helpers.addReactions(message.channelId, message.id, ["❤", "😃", "🤫"]);
  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => reactionCounters.get(message.id) === 3);

  // Be sure that the message has the reactions
  assertEquals(reactionCounters.get(message.id), 3);

  await bot.helpers.removeReaction(message.channelId, message.id, "😃");

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => reactionCounters.get(message.id) === 2);

  // Check if the reactions has been deleted
  assertEquals(reactionCounters.get(message.id), 2);
}

export async function removeReactionEmojiTest(bot: Bot, channelId: bigint, t: Deno.TestContext) {
  const message = await bot.helpers.sendMessage(channelId, "Hello World!");

  // Assertions
  assertExists(message);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.cache.messages.has(message.id));

  if (!bot.cache.messages.has(message.id)) {
    throw new Error("The message seemed to be sent but it was not cached.");
  }

  reactionCounters.set(message.id, 0);

  bot.events.reactionAdd

  bot.events.reactionRemoveEmoji = function (bot, payload) {
    reactionCounters.set(payload.messageId, 0);
  };

  bot.events.reactionAdd = function (bot, payload) {
    const current = reactionCounters.get(payload.messageId) || 0;
    reactionCounters.set(payload.messageId, current + 1);
  };

  // Add reactions to the message
  await bot.helpers.addReactions(message.channelId, message.id, ["❤", "😃"]);
  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => reactionCounters.get(message.id) === 2);

  // Be sure that the message has the reactions
  assertEquals(reactionCounters.get(message.id), 2);

  await bot.helpers.removeReactionEmoji(message.channelId, message.id, "😃");

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => reactionCounters.get(message.id) === 0);

  // Check if the reactions has been deleted
  assertEquals(reactionCounters.get(message.id), 0);
}
