import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { cache } from "../../src/cache.ts";
import { sendMessage } from "../../src/helpers/messages/send_message.ts";
import { addReaction } from "../../src/helpers/messages/add_reaction.ts";
import { createEmoji } from "../../src/helpers/emojis/create_emoji.ts";
import { delayUntil } from "../util/delay_until.ts";
import { Reaction } from "../../src/types/messages/reaction.ts";

async function ifItFailsBlameWolf(type: "getter" | "raw", custom = false) {
  const message = await sendMessage(tempData.channelId, "Hello World!");

  // Assertions
  assertExists(message);

  // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
  await delayUntil(10000, () => cache.messages.has(message.id));

  if (!cache.messages.has(message.id)) {
    throw new Error("The message seemed to be sent but it was not cached.");
  }

  let emojiId = "❤";

  if (custom) {
    emojiId = `<:blamewolf:${
      (
        await createEmoji(tempData.guildId, "blamewolf", "https://cdn.discordapp.com/emojis/814955268123000832.png", {
          name: "blamewolf",
          image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
          roles: [],
        })
      ).id
    }>`;
  }

  if (type === "raw") {
    await addReaction(message.channelId, message.id, emojiId);
  } else {
    await message.addReaction(emojiId);
  }

  await delayUntil(10000, () => cache.messages.get(message.id)?.reactions?.length === 1);

  assertEquals(
    await cache.messages
      .get(message.id)
      ?.reactions?.filter((reaction: Reaction) => reaction.emoji?.name === (custom ? "blamewolf" : "❤")).length,
    1
  );
}

Deno.test({
  name: "[message] add a reaction",
  async fn() {
    await ifItFailsBlameWolf("raw");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] message.addReaction()",
  async fn() {
    await ifItFailsBlameWolf("getter");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] add a custom reaction",
  async fn() {
    await ifItFailsBlameWolf("raw", true);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] message.addReaction() with a custom reaction",
  async fn() {
    await ifItFailsBlameWolf("getter", true);
  },
  ...defaultTestOptions,
});
