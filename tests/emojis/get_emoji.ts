import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals, assertExists } from "../deps.ts";
import { cache } from "../../src/cache.ts";
import { createEmoji } from "../../src/helpers/emojis/create_emoji.ts";
import { delayUntil } from "../util/delay_until.ts";
import { getEmoji } from "../../src/helpers/emojis/get_emoji.ts";

Deno.test({
  name: "[emoji] get an emoji",
  async fn() {
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

    cache.guilds.get(tempData.guildId)?.emojis?.delete(emoji.id!);

    await getEmoji(tempData.guildId, emoji.id!);

    await delayUntil(10000, () => cache.guilds.get(tempData.guildId)?.emojis?.has(emoji.id!));

    assertEquals(cache.guilds.get(tempData.guildId)?.emojis?.has(emoji.id!), true);
  },
  ...defaultTestOptions,
});
