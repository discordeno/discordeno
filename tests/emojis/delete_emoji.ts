import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { cache } from "../../src/cache.ts";
import { createEmoji } from "../../src/helpers/emojis/create_emoji.ts";
import { delayUntil } from "../util/delay_until.ts";
import { deleteEmoji } from "../../src/helpers/emojis/delete_emoji.ts";

async function ifItFailsBlameWolf(reason?: string) {
  const emoji = await createEmoji(
    tempData.guildId,
    "blamewolf",
    "https://cdn.discordapp.com/emojis/814955268123000832.png",
    {
      name: "blamewolf",
      image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
      roles: [],
    }
  );

  assertExists(emoji);

  await delayUntil(10000, () => cache.guilds.get(tempData.guildId)?.emojis?.has(emoji.id!));

  await deleteEmoji(tempData.guildId, emoji.id!, reason);

  await delayUntil(10000, () => !cache.guilds.get(tempData.guildId)?.emojis?.has(emoji.id!));

  assertEquals(cache.guilds.get(tempData.guildId)?.emojis?.has(emoji.id!), false);
}

Deno.test({
  name: "[emoji] delete an emoji without a reason",
  async fn() {
    await ifItFailsBlameWolf();
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[emoji] delete an emoji with a reason",
  async fn() {
    await ifItFailsBlameWolf("with a reason");
  },
  ...defaultTestOptions,
});
