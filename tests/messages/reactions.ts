import { Bot } from "../../mod.ts";
import { reactionCounters } from "../constants.ts";
import { assertExists, assertEquals } from "../deps.ts";
// import {
//   addReactionTest,
//   removeReactionTest,
//   removeAllReactionTests,
//   removeReactionEmojiTest,
// } from "../helpers/messages/reactions.ts";
import { bot, guild, channel } from "../mod.ts";
import { delayUntil } from "../utils.ts";

export async function addReactionTest(
  guildId: bigint,
  channelId: bigint,
  options: { custom: boolean; single: boolean; ordered: boolean },
) {
  const message = await bot.helpers.sendMessage(channelId, { content: "Hello World!" });

  // Assertions
  assertExists(message);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.messages.has(message.id));

  if (!bot.messages.has(message.id)) {
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

export async function removeAllReactionTests(channelId: bigint) {
  const message = await bot.helpers.sendMessage(channelId, { content: "Hello World!" });

  // Assertions
  assertExists(message);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.messages.has(message.id));

  if (!bot.messages.has(message.id)) {
    throw new Error("The message seemed to be sent but it was not cached.");
  }

  reactionCounters.set(message.id, 0);

  bot.events.reactionRemoveAll = function (_, payload) {
    reactionCounters.set(payload.messageId, 0);
  };

  bot.events.reactionAdd = function (_, payload) {
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

export async function removeReactionTest(channelId: bigint) {
  const message = await bot.helpers.sendMessage(channelId, { content: "Hello World!" });

  // Assertions
  assertExists(message);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.messages.has(message.id));

  if (!bot.messages.has(message.id)) {
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

export async function removeReactionEmojiTest(channelId: bigint) {
  const message = await bot.helpers.sendMessage(channelId, { content: "Hello World!" });

  // Assertions
  assertExists(message);

  // Delay the execution to allow event to be processed
  await delayUntil(10000, () => bot.messages.has(message.id));

  if (!bot.messages.has(message.id)) {
    throw new Error("The message seemed to be sent but it was not cached.");
  }

  reactionCounters.set(message.id, 0);

  bot.events.reactionAdd;

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

Deno.test({
  name: "[message] add a reaction",
  fn: async (t) => {
    await addReactionTest(guild.id, channel.id, { custom: false, single: true, ordered: false });
  },
});
Deno.test({
  name: "[message] add a custom reaction",
  fn: async (t) => {
    await addReactionTest(guild.id, channel.id, { custom: true, single: true, ordered: false });
  },
});
Deno.test({
  name: "[message] add multiple reactions",
  fn: async (t) => {
    await addReactionTest(guild.id, channel.id, { custom: false, single: false, ordered: false });
  },
});
Deno.test({
  name: "[message] add multiple custom reactions",
  fn: async (t) => {
    await addReactionTest(guild.id, channel.id, { custom: true, single: false, ordered: false });
  },
});
Deno.test({
  name: "[message] add multiple reactions in order",
  fn: async (t) => {
    await addReactionTest(guild.id, channel.id, { custom: false, single: false, ordered: true });
  },
});
Deno.test({
  name: "[message] add multiple custom reactions in order",
  fn: async (t) => {
    await addReactionTest(guild.id, channel.id, { custom: true, single: false, ordered: true });
  },
});
Deno.test({
  name: "[message] remove a reaction.",
  fn: async (t) => {
    await removeReactionTest(channel.id);
  },
});
Deno.test({
  name: "[message] remove all reactions.",
  fn: async (t) => {
    await removeAllReactionTests(channel.id);
  },
});
Deno.test({
  name: "[message] remove emoji reactions.",
  fn: async (t) => {
    await removeReactionEmojiTest(channel.id);
  },
});
