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

  // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
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
